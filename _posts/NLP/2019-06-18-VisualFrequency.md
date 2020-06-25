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
<div align="middle">
<img src = "/pics/NLP/wordfreqs.png" width = 500 />
</div>
很明显的是 :) 和 :( 与情绪有非常大的相关性。

# 2. 逻辑回归(Logistic regression)
## 2.1. 基本概念
使用之前提取的特征来判断是积极还是消极的情绪。

逻辑回归使用Sigmoid 函数（输出范围 0到1 ）
其表达式为

$$\sigma(z) = \frac{1}{1+e^{-z}}$$

函数图像为
<div align="middle">
<img src = "/pics/NLP/SigmoidFunction.png" width = 500 />
</div>

在前节中已经提到过有监督学习的基本模型
<div align="middle">
<img src = "/pics/NLP/SML.png" width = 500 />
</div>
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
4. 
<div align="middle">
<img src = "/pics/NLP/CostIteration.png" width = 500 />
</div>

4. 计算Cost的值J，判断是否完成迭代

<div align="middle">
<img src = "/pics/NLP/TrainingLR.png" width = 500 />
</div>

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
<div align="middle">
<img src = "/pics/NLP/data10.png" width = 500 />
</div>

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

<div align="middle">
<img src = "/pics/NLP/dataplot1.png" width = 500 />
</div>

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

<div align="middle">
<img src = "/pics/NLP/dataplot2.png" width = 500 />
</div>


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


