---
layout: post
title: "频率可视化及逻辑回归"
tag: "NLP"
date: 2019-06-18
categories: 自然语言处理
---

<!-- TOC -->

- [1. 词频的提取和可视化](#1-词频的提取和可视化)
  - [1.1. 基本内容](#11-基本内容)
  - [1.2. 代码实现](#12-代码实现)
- [2. 逻辑回归(Logistic regression)](#2-逻辑回归logistic-regression)
  - [2.1. 基本概念](#21-基本概念)
  - [2.2. 如何获得θ](#22-如何获得θ)
  - [2.3. 代码实现](#23-代码实现)
    - [2.3.1. 数据绘制](#231-数据绘制)
- [3. 模型的验证与精确度](#3-模型的验证与精确度)
- [4. 逻辑回归背后的intuition](#4-逻辑回归背后的intuition)
  - [4.1. Cost Function](#41-cost-function)
- [5. 完整assignment代码](#5-完整assignment代码)

<!-- /TOC -->
# 1. 词频的提取和可视化
## 1.1. 基本内容

```
I am Happy Because I am learning NLP @deeplearning
```

经过预处理后得到

```
[happy,learn,nlp]
```

然后进行特征提取有

```
[1,4,2]
```

将一个语料集中的所有m个语料都进行特征提取，最终可以获得一个矩阵
{%raw%}
$$
\begin{matrix}
    1&X^{(1)}_1&X_2^{(1)}\\
    1&X^{(2)}_1&X_2^{(2)}\\
    ...&...&...\\
    1&X^{(m)}_1&X_2^{(m)}
\end{matrix}
$$
{%endraw%}
1. 首先，建立frequency dictionary

```python
freqs = build_freqs(tweets,labels)#Build frequencies dictionary
```

2. 初始化相同大小的矩阵X

```python
X = np.zeros((m,3))#Initialize matrix (预先import numpy as np)
```

3. 遍历删除stop words、stemming、URLs、handles并进行lower casing

```python
for i in range(m):# For every tweet
    p_tweet = process_tweet(tweets[i])#Process tweet
```

4. 通过对positive和negative的频率求和来提取特征

```python
    X[i,:] = extract_features(p_tweet,freqs)# Extract Features
```

## 1.2. 代码实现
首先依然是 **引入必要的库**

```python
import nltk                                  # Python library for NLP
from nltk.corpus import twitter_samples      # sample Twitter dataset from NLTK
import matplotlib.pyplot as plt              # visualization library
import numpy as np                           # library for scientific computing and matrix operations
```

其中
process_tweet()函数实现清除文本，将其分割为单独的单词，删除stopwords，并将单词转换为Stem。
build_freqs()函数计算整个Corpus中单词在positive的频率和在negative的频率，构建freqs字典，key是元组(word,label)

**下载所需的内容**

```python
# download the stopwords for the process_tweet function
nltk.download('stopwords')

# import our convenience functions
from utils import process_tweet, build_freqs
```

**加载数据集**
仍然与上一节相同

```python
# select the lists of positive and negative tweets
all_positive_tweets = twitter_samples.strings('positive_tweets.json')
all_negative_tweets = twitter_samples.strings('negative_tweets.json')

# concatenate the lists, 1st part is the positive tweets followed by the negative
tweets = all_positive_tweets + all_negative_tweets

# let's see how many tweets we have
print("Number of tweets: ", len(tweets))
```

**建立一个Labels array**其中前5000个元素的label是1，后5000个元素的label是0.

```python
# make a numpy array representing labels of the tweets
labels = np.append(np.ones((len(all_positive_tweets))), np.zeros((len(all_negative_tweets))))
```

(python字典知识可参考[菜鸟教程](https://www.runoob.com/python/python-dictionary.html))

**构建Word frequency dictionary**

```python
def build_freqs(tweets, ys):
    """Build frequencies.
    Input:
        tweets: a list of tweets
        ys: an m x 1 array with the sentiment label of each tweet
            (either 0 or 1)
    Output:
        freqs: a dictionary mapping each (word, sentiment) pair to its
        frequency
    """
    # Convert np array to list since zip needs an iterable.
    #将np数组转换为列表，因为zip需要一个可迭代对象
    # The squeeze is necessary or the list ends up with one element.
    #Squeeze是必要的，否则list将以单个元素解为
    # Also note that this is just a NOP if ys is already a list.
    yslist = np.squeeze(ys).tolist()

    # Start with an empty dictionary and populate it by looping over all tweets
    # and over all processed words in each tweet.
    freqs = {}
    for y, tweet in zip(yslist, tweets):
        for word in process_tweet(tweet):
            pair = (word, y) # 键为(word,label)元组
            if pair in freqs:
                freqs[pair] += 1 # 计数+1
            else:
                freqs[pair] = 1  # 如果没有计数过则初始化为1
    return freqs
```

现在将这个函数投入使用

```python
# create frequency dictionary
freqs = build_freqs(tweets, labels)

# check data type
print(f'type(freqs) = {type(freqs)}')

# check length of the dictionary
print(f'len(freqs) = {len(freqs)}')
```

但是字典信息太繁杂了，难以观察。

**选择想要可视化的一部分单词**
可以用元组来储存这个临时信息。

```python
# select some words to appear in the report. we will assume that each word is unique (i.e. no duplicates)
keys = ['happi', 'merri', 'nice', 'good', 'bad', 'sad', 'mad', 'best', 'pretti',
        '❤', ':)', ':(', '😒', '😬', '😄', '😍', '♛',
        'song', 'idea', 'power', 'play', 'magnific']

# list representing our table of word counts.
# each element consist of a sublist with this pattern: [<word>, <positive_count>, <negative_count>]
data = []

# loop through our selected words
for word in keys:
    
    # initialize positive and negative counts
    pos = 0
    neg = 0
    
    # retrieve number of positive counts
    if (word, 1) in freqs:
        pos = freqs[(word, 1)]
        
    # retrieve number of negative counts
    if (word, 0) in freqs:
        neg = freqs[(word, 0)]
        
    # append the word counts to the table
    data.append([word, pos, neg])
    
data
```

可以用对数坐标的散点图来将其绘出，横纵坐标分别是positive和negative的频率

```python
fig, ax = plt.subplots(figsize = (8, 8))

# convert positive raw counts to logarithmic scale. we add 1 to avoid log(0)
x = np.log([x[1] + 1 for x in data])  

# do the same for the negative counts
y = np.log([x[2] + 1 for x in data]) 

# Plot a dot for each pair of words
ax.scatter(x, y)  

# assign axis labels
plt.xlabel("Log Positive count")
plt.ylabel("Log Negative count")

# Add the word as the label at the same position as you added the points just before
for i in range(0, len(data)):
    ax.annotate(data[i][0], (x[i], y[i]), fontsize=12)

ax.plot([0, 9], [0, 9], color = 'red') # Plot the red line that divides the 2 areas.
plt.show()
```

有

<img src = "/pics/NLP/wordfreqs.png" width = 500 />

很明显的是 :) 和 :( 与情绪有非常大的相关性。

# 2. 逻辑回归(Logistic regression)
## 2.1. 基本概念
使用之前提取的特征来判断是积极还是消极的情绪。

逻辑回归使用Sigmoid 函数（输出范围 0到1 ）
其表达式为

$$\sigma(z) = \frac{1}{1+e^{-z}}$$

函数图像为

<img src = "/pics/NLP/SigmoidFunction.png" width = 500 />


在前节中已经提到过有监督学习的基本模型

<img src = "/pics/NLP/SML.png" width = 500 />

而在逻辑回归中，Prediction Function就是Sigmoid函数。
在逻辑回归中的函数H表达式为

$$h(x^{(i)},\theta)=\frac{1}{1+e^{-\theta^T x^{(i)}}}$$

它取决于
$\theta,x,i$

为了分类，我们需要一个阈值，通常将其设定为0.5，与之对应的
$\theta^T$
与
$x$
的点乘结果为0。

如果点乘结果小于0，预测是negative，如果大于0则是positive。

**例：**
Text为

```
@YMourri and @ AndrewYNg are tuning a GREAT AI model
```

经过预处理后为

```
[tun,ai,great,model]
```

获得的向量x为
{%raw%}
$$x^{i} = \begin{bmatrix}
    1\\3476\\245
\end{bmatrix}$$
{%endraw%}
而
$\theta$
是我们希望得到的，有了它就可以做预测了。
现在我们先假设我们已经得到了一个
$\theta$
其值为

{%raw%}
$$\theta = \begin{bmatrix}
    0.00003\\0.00150\\-0.00120
\end{bmatrix}$$
{%endraw%}

则可求得其点乘结果为4.92，可以预测是positive

## 2.2. 如何获得θ

1. 初始化参数θ
2. 使用Logistic函数获得观测值
3. 在cost函数的梯度方向上更新θ
   

<img src = "/pics/NLP/CostIteration.png" width = 500 />

4. 计算Cost的值J，判断是否完成迭代


<img src = "/pics/NLP/TrainingLR.png" width = 500 />


这个过程称之为梯度下降法

## 2.3. 代码实现
（前面的import啥略过了）

- 加载数据集

```python
# select the set of positive and negative tweets
all_positive_tweets = twitter_samples.strings('positive_tweets.json')
all_negative_tweets = twitter_samples.strings('negative_tweets.json')

tweets = all_positive_tweets + all_negative_tweets ## Concatenate the lists. 
labels = np.append(np.ones((len(all_positive_tweets),1)), np.zeros((len(all_negative_tweets),1)), axis = 0)

# split the data into two pieces, one for training and one for testing (validation set) 
train_pos  = all_positive_tweets[:4000]
train_neg  = all_negative_tweets[:4000]

train_x = train_pos + train_neg 

print("Number of tweets: ", len(train_x))
```

- 加载特征
  
```python
data = pd.read_csv('logistic_features.csv'); # Load a 3 columns csv file using pandas function
data.head(10) # Print the first 10 data entries
```

前十个数据列表

<img src = "/pics/NLP/data10.png" width = 500 />


```python
# Each feature is labeled as bias, positive and negative
X = data[['bias', 'positive', 'negative']].values # Get only the numerical values of the dataframe
Y = data['sentiment'].values; # Put in Y the corresponding labels or sentiments

print(X.shape) # Print the shape of the X part
print(X) # Print some rows of X
```

- 加载一个预先训练好的逻辑回归模型
先来一个初始的θ

```python
theta = [7e-08, 0.0005239, -0.00055517]
```

画一下数据的散点图

```python
# Plot the samples using columns 1 and 2 of the matrix
fig, ax = plt.subplots(figsize = (8, 8))

colors = ['red', 'green']

# Color based on the sentiment Y
ax.scatter(X[:,1], X[:,2], c=[colors[int(k)] for k in Y], s = 0.1)  # Plot a dot for each pair of words
plt.xlabel("Positive")
plt.ylabel("Negative")
```


<img src = "/pics/NLP/dataplot1.png" width = 500 />

可以看出y=x这条线可以很好的将内容分开，可以预计模型精度不错。

### 2.3.1. 数据绘制
画一条灰线来表示正区域和负区域之间的截止，即为

$$z = \theta \cdot x = 0$$


红色和绿色的线点在相应的情绪的方向是计算使用垂直线的分离线计算在前面的方程(neg函数)。它必须指向与Logit函数的导数相同的方向，但大小可能不同。它只是为了模型的可视化表示。


```python
# Equation for the separation plane
# It give a value in the negative axe as a function of a positive value
# f(pos, neg, W) = w0 + w1 * pos + w2 * neg = 0
# s(pos, W) = (w0 - w1 * pos) / w2
def neg(theta, pos):
    return (-theta[0] - pos * theta[1]) / theta[2]

# Equation for the direction of the sentiments change
# We don't care about the magnitude of the change. We are only interested 
# in the direction. So this direction is just a perpendicular function to the 
# separation plane
# df(pos, W) = pos * w2 / w1
def direction(theta, pos):
    return    pos * theta[2] / theta[1]
```

```python
# Plot the samples using columns 1 and 2 of the matrix
fig, ax = plt.subplots(figsize = (8, 8))

colors = ['red', 'green']

# Color base on the sentiment Y
ax.scatter(X[:,1], X[:,2], c=[colors[int(k)] for k in Y], s = 0.1)  # Plot a dot for each pair of words
plt.xlabel("Positive")
plt.ylabel("Negative")

# Now lets represent the logistic regression model in this chart. 
maxpos = np.max(X[:,1])

offset = 5000 # The pos value for the direction vectors origin

# Plot a gray line that divides the 2 areas.
ax.plot([0,  maxpos], [neg(theta, 0),   neg(theta, maxpos)], color = 'gray') 

# Plot a green line pointing to the positive direction
ax.arrow(offset, neg(theta, offset), offset, direction(theta, offset), head_width=500, head_length=500, fc='g', ec='g')
# Plot a red line pointing to the negative direction
ax.arrow(offset, neg(theta, offset), -offset, -direction(theta, offset), head_width=500, head_length=500, fc='r', ec='r')

plt.show()
```

可以获得图像


<img src = "/pics/NLP/dataplot2.png" width = 500 />



# 3. 模型的验证与精确度
我们有数据集X，标签集Y以及获得的θ，使用预测函数进行预测，观测其是否超过阈值

$$
pred = h(X_{val},\theta)\ge 0.5
$$

通过和阈值的比较可以获得对应X的标签，将预测的标签与Y作比较

将正确次数求和除以总数即得准确率

$$
\Sigma_{i=1}^m\frac{(pred^{(i)}==y_{val}^{(i)})}{m}
$$

# 4. 逻辑回归背后的intuition

## 4.1. Cost Function

$$
J(\theta)=-\frac{1}{m}\Sigma_{i=1}^m[y^{(i)}\log h(x^{(i)},\theta)+(1-y^{(i)})\log(1-h(x^{(i)},\theta)]
$$

写成向量形式有

$$J = \frac{-1}{m}\times (\bold y^T \cdot \log(h)+(1-\bold{y})^T\cdot\log(1-\bold{h}))$$

θ的梯度更新有

$$\theta=\theta - \frac{\alpha}{m}\times(\bold x^T\cdot(\bold{h}-\bold{y}))$$

损失函数是一个很复杂的表达式，现在来拆分一下它的概念。

最左侧的求和意味着是将每个训练样本的损失加和再取平均,负号的作用则是让最后的数值为正数。（因为log一个小于1的正数肯定是负的嘛）

括号里的第一项

$$y^{(i)}\log h(x^{(i)},\theta)$$

|y|h|ylog(h)|
|:-:|:-:|:-:|
|0|any|0|
|1|0.99|~ 0|
|1|~0|-inf|

也就是说预测越接近标签，值越小（y=0，h=1的时候是特例）

接下来看第二项

$$(1-y^{(i)})\log(1-h(x^{(i)},\theta)$$

|y|h|finally|
|:-:|:-:|:-:|
|1|any|0|
|0|0.01|~ 0|
|0|~1|-inf|

与之前类似，区别是(y=1 h=0的时候是特例)

将两项叠加有

|y|h|finally|
|:-:|:-:|:-:|
|1|~0|-inf|
|1|~1|~0|
|0|~0|~ 0|
|0|~1|-inf|



# 5. 完整assignment代码

```python
import nltk                                # Python library for NLP
from nltk.corpus import twitter_samples    # sample Twitter dataset from NL        # library for visualization
import random                              # pseudo-random number generator
from os import getcwd
import numpy as np
# downloads sample twitter dataset. uncomment the line below if running on a local machine.

class SentimentPredict():
    ## 去除不必要的字符
    def process_tweet(self,tweet):
        from nltk.stem import PorterStemmer
        from nltk.corpus import stopwords
        import re
        import string
        from nltk.tokenize import TweetTokenizer
        stemmer = PorterStemmer()#利用Porter stemming algorithm来进行stemming
        stopwords_english = stopwords.words('english')#加载英文的stop words词库
        ## 抄一波代码，原课程提供的utils.py中的
        # remove stock market tickers like $GE
        tweet = re.sub(r'\$\w*', '', tweet)
        # remove old style retweet text "RT"
        tweet = re.sub(r'^RT[\s]+', '', tweet)
        # remove hyperlinks
        tweet = re.sub(r'https?:\/\/.*[\r\n]*', '', tweet)
        # remove hashtags
        # only removing the hash # sign from the word
        tweet = re.sub(r'#', '', tweet)
        # tokenize tweets
        tokenizer = TweetTokenizer(preserve_case=False, strip_handles=True,
                                reduce_len=True)
        tweet_tokens = tokenizer.tokenize(tweet)

        tweets_clean = []
        for word in tweet_tokens:
            if (word not in stopwords_english and  # remove stopwords
                    word not in string.punctuation):  # remove punctuation
                # tweets_clean.append(word)
                stem_word = stemmer.stem(word)  # stemming word
                tweets_clean.append(stem_word)

        return tweets_clean

    ## frequency dictionary
    def build_freqs(self,tweets,ys):
        yslist = np.squeeze(ys).tolist()
        freqs = {}
        for y,tweet in zip(yslist,tweets):
            for word in self.process_tweet(tweet):
                pair = (word,y)
                if pair in freqs:
                    freqs[pair] += 1
                else:
                    freqs[pair] = 1
        return freqs

    # 顾名思义
    def sigmoid(self,z):
        h = 1/(1+np.exp(-z))#按照表达式
        return h
    
    ## 梯度下降法更新theta
    def gradientDescent(self,x,y,theta,alpha,num_iters):# alpha为学习率，越小每次改变的就越小
        m = len(x) ## 输入数据行数

        for i in range(0,num_iters):
            z = x.dot(theta)
            h = self.sigmoid(z)##计算h函数结果
            ## 计算损失函数
            J = (-1)/m * (y.transpose().dot(np.log(h))+(1-y).transpose().dot(np.log(1-h)))
            ## 更新 theta
            theta -= alpha/m*(x.transpose().dot(h-y))
        
        J = float(J)
        return J,theta

    ## 特征提取
    def extract_features(self,tweet,freqs):
        word_1 = self.process_tweet(tweet)
        # x = [1,sum pos, sum neg]
        x = np.zeros((1,3))
        x[0,0]=1

        for word in word_1:
            if(word,1) in freqs.keys():
                x[0,1] += freqs[(word,1)]#在pos里出现的频率
            if(word,0) in freqs.keys():
                x[0,2] += freqs[(word,0)]#在neg里出现的频率
        
        assert(x.shape == (1,3))# 判断是否异常
        return x

    ## 进行预测
    def predict_tweet(self,tweet):
        ## 抽取特征
        x = self.extract_features(tweet,self.freqs)

        ## 进行预测
        y_pred = self.sigmoid(x.dot(self.theta))

        return y_pred

    def test_logistic_regression(self,test_x,test_y):
        y_hat=[]
        for tweet in test_x:
            y_pred = self.predict_tweet(tweet)
            if y_pred>0.5:
                y_hat.append(1)
            else:
                y_hat.append(0)
        accuracy = sum(sum(np.array(y_hat) == np.array(test_y.transpose())))/len(y_hat)
        return accuracy
    
    ## 进行训练
    def train_logistic_regression(self,train_x,train_y):
        self.freqs = self.build_freqs(train_x,train_y)#建立起frequency dictionary
        X = np.zeros((len(train_x),3))
        for i in range(len(train_x)):
            X[i,:] = self.extract_features(train_x[i],self.freqs) # 第i个语料的向量x放入X的第i行
        Y = train_y

        self.J,self.theta = S_Pre.gradientDescent(X,Y,np.zeros((3,1)),1e-9,1500)## 进行1500次迭代


## 加载数据集
all_positive_tweets = twitter_samples.strings('positive_tweets.json')
all_negative_tweets = twitter_samples.strings('negative_tweets.json')

# print("positive tweets数量:",len(all_positive_tweets))

# print("negative tweets数量:",len(all_negative_tweets))

# print(all_positive_tweets[0])#来随便看一个text内容大概是啥样子

# 80%做训练集，20%做测试集
test_pos = all_positive_tweets[4000:]#最后1000做测试集
test_neg = all_negative_tweets[4000:]
train_pos = all_positive_tweets[:4000]#前4000做训练集
train_neg = all_negative_tweets[:4000]

train_x = train_pos + train_neg # 8000,前4000为1，后4000为0
test_x = test_pos + test_neg # 2000，前1000为1，后1000为0

# 创建训练集对应的标签array
train_y = np.append(np.ones((len(train_pos),1)),np.zeros((len(train_neg),1)),axis = 0)

# 创建测试集对应的标签array
test_y = np.append(np.ones((len(test_pos),1)),np.zeros((len(test_neg),1)),axis = 0)



S_Pre = SentimentPredict()
## 训练模型
S_Pre.train_logistic_regression(train_x,train_y)


## 使用模型来判断text的情感
for tweet in ['I am happy', 'I am bad', 'this movie should have been great.', 'great', 'great great', 'great great great', 'great great great great']:
    print( '%s -> %f' % (tweet, S_Pre.predict_tweet(tweet)))

tmp_accuracy = S_Pre.test_logistic_regression(test_x,test_y)
print(tmp_accuracy)


## 自定义tweet并进行判断

my_tweet = 'That"s fucking Great!'
y_hat = S_Pre.predict_tweet(my_tweet)
print(y_hat)
if y_hat > 0.5:
    print('Positive sentiment')
else: 
    print('Negative sentiment')
```