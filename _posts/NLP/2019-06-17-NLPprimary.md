---
layout: post
title: "初识NLP-文本的预处理"
tag: "NLP"
date: 2019-06-17
categories: 自然语言处理
---

<!-- TOC -->

- [1. 有监督学习(Supervised Machine Learning)](#1-有监督学习supervised-machine-learning)
  - [1.1. 情感分析(Sentiment Analysis)](#11-情感分析sentiment-analysis)
  - [1.2. 初步处理](#12-初步处理)
    - [1.2.1. 建立Vocabulary](#121-建立vocabulary)
    - [1.2.2. 提取特征](#122-提取特征)
  - [1.3. 分类与频率统计](#13-分类与频率统计)
  - [1.4. 频率特征](#14-频率特征)
  - [1.5. 预处理](#15-预处理)
- [2. 初步实验](#2-初步实验)
  - [2.1. 导入工具包](#21-导入工具包)
  - [2.2. 关于数据集](#22-关于数据集)
  - [2.3. 数据处理](#23-数据处理)
    - [2.3.1. 对原始文本进行预处理](#231-对原始文本进行预处理)
      - [2.3.1.1. 删除超链接、Twitter标记和样式](#2311-删除超链接twitter标记和样式)
    - [2.3.2. 标记字符串 Tokenize the string](#232-标记字符串-tokenize-the-string)
    - [2.3.3. 去除停顿词和标点](#233-去除停顿词和标点)
    - [2.3.4. 词干分析 Stemming](#234-词干分析-stemming)
- [3. 作业](#3-作业)

<!-- /TOC -->
# 1. 有监督学习(Supervised Machine Learning)

<img src="/pics/NLP/SML.png" width = 500>

在有监督学习中，有输入特征X和标签集合Y，目标是最小化错误率或cost。
为了达成这个目标，需要运行预测函数（用参数数据将你的特征X映射到标签Y上），损失函数会比较得到的outputY与标签Y的距离，然后更新你的参数，重复整个过程，直到cost最小。

## 1.1. 情感分析(Sentiment Analysis)
**目标：** 预测一个tweeta是积极还是消极的情感
**训练集：** 积极情感的label为1，消极情感的label为0
**方式：** 逻辑回归分类器(logistic regression model)

## 1.2. 初步处理

### 1.2.1. 建立Vocabulary
将text转变为vector
**例：**
```python
text = "I am happy because I am learning NLP"
Vocabulary = [I,am,happy,because,learning,NLP]
#不重复添加 I、am
```

### 1.2.2. 提取特征
对喜欢语句中出现的词语赋予1
如
```python
[I,am,happy,because,learning,NLP,...,hated,the,movie]
[1,1,1,1,1,1,...,0,0,0]
```
这种仅有少数值为非零值的表示称之为稀疏表示。
使用逻辑回归模型将要学习n+1个参数，其中n为Vocabulary的大小，这是十分浪费的。 ~~为什么多一个？~~

## 1.3. 分类与频率统计
**语料集Corpus**
```
I am happy because I am learning NLP
I am happy
I am sad, I am not learning NLP
I am sad
```
从语料集中可以建立Vocabulary
**Vocabulary**
```
I
am
happy
because
learning
NLP
sad
not
```
**分类**
语料集的tweets可以分为两类
**Positive tweets**
```
I am happy because I am learning NLP
I am happy
```
**Negative tweets**
```
I am sad, I am not learning NLP
I am sad
```
统计Vocabulary中的词语在Positive tweets中出现的频率

|Vocabulary|PosFreq(1)|
|:-:|:-:|
|I|3|
|am|3|
|happy|2|
|because|1|
|learning|1|
|NLP|1|
|sad|0|
|not|0|

同理课统计在Negative tweets中出现的频率
有

|Vocabulary|PosFreq(1)|NegFreq(0)|
|:-:|:-:|:-:|
|I|3|3|
|am|3|3|
|happy|2|0|
|because|1|0|
|learning|1|1|
|NLP|1|1|
|sad|0|2|
|not|0|1|

在实际代码中，这个表可以通过字典映射来实现。

现在只需要学习三个特征（？？？）
## 1.4. 频率特征
**arbitrary tweet m**

$$X_m=[1,\Sigma_\omega freqs(\omega,1),\Sigma_\omega freqs(\omega,0)]$$

- 第一项为偏差单位，为1
- 第二项为每个单词的积极频率和
- 第三项为每个单词的消极频率和

**例：**

**I am sad, I am not learning NLP**

Vocabulary中未出现的单词为**happy**和**because**
所以可以求出

$$X_m=[1,8,11]$$

## 1.5. 预处理
**要点**
- 词干提取(stemming)
- 停顿词(stop words)
  
**例：**
```
@YM and @Andrew are tuning a GREAT AI model at https://deeplearning.ai!!!
```

**1. 去除不重要的单词，停顿词和标点符号。比如可以去掉存在于下表中的字符。**
   
|Stop words|Punctuation|
|:-:|:-:|
|and|,|
|is|.|
|are|:|
|at|!|
|has|"|
|for|'|
|a||

则原句变为
```
@YM @Andrew tuning GREAT AI model https://deeplearning.ai!!!
```

（PS：在某些内容中你不需要去除标点符号，他们可能对句意有重要意义）

**2. 去除URL和Handles**
```
tuning GREAT AI model
```
**3. 词干提取**
tun<font color=red >e/ed/ing</font>~~ing~~ GREAT AI model
通过这种操作可以大幅减小Vocabulary

# 2. 初步实验
使用package Natural Language Toolkit(NLTK)
```
pip install NLTK
```
这是一个开源的自然语言处理库，包括collecting、handling、processing的模块
使用NLTK中的twitter dataset来进行练习，其已经被手工标注。

## 2.1. 导入工具包
```python
import nltk                                # Python library for NLP
from nltk.corpus import twitter_samples    # sample Twitter dataset from NLTK
import matplotlib.pyplot as plt            # library for visualization
import random                              # pseudo-random number generator
```

## 2.2. 关于数据集
NLTK中的这个样本数据集被分成了5000个积极和和5000个消极的tweets，两边数量恰好相等是为了有一个平衡的数据集。这并不意味着真实的积极、消极分布比例。
这只是因为平衡的数据集能够简化情感分析中绝大多数的计算方法。

- 数据集下载
在私人电脑上，需要下载数据集

```python
# downloads sample twitter dataset. uncomment the line below if running on a local machine.
nltk.download('twitter_samples')
```

<img src="/pics/NLP/datadownload.png" width = 500>

- tweets加载
使用模块的strings来进行加载

```python
# select the set of positive and negative tweets
all_positive_tweets = twitter_samples.strings('positive_tweets.json')
all_negative_tweets = twitter_samples.strings('negative_tweets.json')
```

- 打印数据集信息

```python
print('Number of positive tweets: ', len(all_positive_tweets))
print('Number of negative tweets: ', len(all_negative_tweets))

print('\nThe type of all_positive_tweets is: ', type(all_positive_tweets))
print('The type of a tweet entry is: ', type(all_negative_tweets[0]))
```

可以获得结果

        Number of positive tweets:  5000
        Number of negative tweets:  5000

        The type of all_positive_tweets is:  <class 'list'>
        The type of a tweet entry is:  <class 'str'>

可以使用Matplotlib的pyplot库来获得更多可视化信息，如饼图

```python
# Declare a figure with a custom size
fig = plt.figure(figsize=(5, 5))

# labels for the two classes
labels = 'Positives', 'Negative'

# Sizes for each slide
sizes = [len(all_positive_tweets), len(all_negative_tweets)] 

# Declare pie chart, where the slices will be ordered and plotted counter-clockwise:
plt.pie(sizes, labels=labels, 
pct='%1.1f%%',
        shadow=True, startangle=90)

# Equal aspect ratio ensures that pie is drawn as a circle.
plt.axis('equal')  

# Display the chart
plt.show()
```

<img src="/pics/NLP/piechart1.png" width = 500>

## 2.3. 数据处理
在数据科学项目中，理解数据对80%的成功或失败负有责任。我们可以在预处理数据时对各种问题进行考虑。

- 打印案例
随机打印一条正推和一条负推。我们在字符串的开头添加了一个颜色标记，以进一步区分两者。

```python
# print positive in greeen
print('\033[92m' + all_positive_tweets[random.randint(0,5000)])

# print negative in red
print('\033[91m' + all_negative_tweets[random.randint(0,5000)])
```

很多推文中都有表情符号和url。这个信息将在接下来的步骤中派上用场

### 2.3.1. 对原始文本进行预处理

预处理包括以下任务：
1. tokenizing the string 标记字符串
2. Lowercasing 小写
3. Removing stop words and punctuation 去除停顿词和标点
4. Stemming 词干提取

先选择一个来完成这个步骤

```python
# Our selected sample. Complex enough to exemplify each step
tweet = all_positive_tweets[2277]
print(tweet)
```

得到

    My beautiful sunflowers on a sunny Friday morning off :) #sunflowers #favourites #happy #Friday off… https://t.co/3tfYom0N1i

下载并加载一些必要的库

```python
# download the stopwords from NLTK
nltk.download('stopwords')
```

```python
import re                                  # library for regular expression operations
import string                              # for string operations

from nltk.corpus import stopwords          # module for stop words that come with NLTK
from nltk.stem import PorterStemmer        # module for stemming
from nltk.tokenize import TweetTokenizer   # module for tokenizing strings
```

#### 2.3.1.1. 删除超链接、Twitter标记和样式
使用re库对tweet执行正则表达式操作
正则表达式的相关知识可以参考
- [菜鸟教程-正则表达式](https://www.runoob.com/regexp/regexp-tutorial.html)
- [菜鸟教程-python中的正则表达式](https://www.runoob.com/python/python-reg-expressions.html)

```python
print('\033[92m' + tweet)
print('\033[94m')

# remove old style retweet text "RT"
tweet2 = re.sub(r'^RT[\s]+', '', tweet)

# remove hyperlinks
tweet2 = re.sub(r'https?:\/\/.*[\r\n]*', '', tweet2)

# remove hashtags
# only removing the hash # sign from the word
tweet2 = re.sub(r'#', '', tweet2)

print(tweet2)
```

其输出结果有

```
My beautiful sunflowers on a sunny Friday morning off :) #sunflowers #favourites #happy #Friday off… https://t.co/3tfYom0N1i

My beautiful sunflowers on a sunny Friday morning off :) sunflowers favourites happy Friday off… 
```

去除了不必要的字符

### 2.3.2. 标记字符串 Tokenize the string

将字符串分割([token](https://www.nltk.org/api/nltk.tokenize.html#module-nltk.tokenize.casual))为单个单词，不带空格或制表符。我们还将字符串中的每个单词转换为小写。NLTK的tokenize模块可以轻松地完成这些任务。

```python
print()
print('\033[92m' + tweet2)
print('\033[94m')

# instantiate tokenizer class
tokenizer = TweetTokenizer(preserve_case=False, strip_handles=True,
                               reduce_len=True)

# tokenize tweets
tweet_tokens = tokenizer.tokenize(tweet2)

print()
print('Tokenized string:')
print(tweet_tokens)
```

可得结果

```
My beautiful sunflowers on a sunny Friday morning off :) sunflowers favourites happy Friday off… 


Tokenized string:
['my', 'beautiful', 'sunflowers', 'on', 'a', 'sunny', 'friday', 'morning', 'off', ':)', 'sunflowers', 'favourites', 'happy', 'friday', 'off', '…']
```

### 2.3.3. 去除停顿词和标点
查看一些库里的stop words

```python
#Import the english stop words list from NLTK
stopwords_english = stopwords.words('english') 

print('Stop words\n')
print(stopwords_english)

print('\nPunctuation\n')
print(string.punctuation)
```

有结果

```
Stop words

['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]

Punctuation

!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
```

在实际应用中，我们可能仍然需要对这两个列表进行定制，如是tweets中:)和…常常含有语意

接下来清除tweet里的这些词语

```python
print()
print('\033[92m')
print(tweet_tokens)
print('\033[94m')

tweets_clean = []

for word in tweet_tokens: # Go through every word in your tokens list
    if (word not in stopwords_english and  # remove stopwords
        word not in string.punctuation):  # remove punctuation
        tweets_clean.append(word)

print('removed stop words and punctuation:')
print(tweets_clean)
```

得到

```
['my', 'beautiful', 'sunflowers', 'on', 'a', 'sunny', 'friday', 'morning', 'off', ':)', 'sunflowers', 'favourites', 'happy', 'friday', 'off', '…']

removed stop words and punctuation:
['beautiful', 'sunflowers', 'sunny', 'friday', 'morning', ':)', 'sunflowers', 'favourites', 'happy', 'friday', '…']
```

### 2.3.4. 词干分析 Stemming
词干提取是将一个单词转换为其最一般的形式或词干的过程。这有助于减少我们的词汇量。
比如
- learn
- learning
- learned
- learnt
都来源于相同的词根learn
但是，在某些情况下，词干分析过程生成的单词不是根单词的正确拼写。例如，happi和sunni。
- happy
- happiness
- happier
在以上三个词中，happi是共有最多的，而如果选用happ又会和happen搞混
接下来
使用PorterStemmer模块，该模块使用[Porter词干提取算法](https://tartarus.org/martin/PorterStemmer/)。

```python
print()
print('\033[92m')
print(tweets_clean)
print('\033[94m')

# Instantiate stemming class
stemmer = PorterStemmer() 

# Create an empty list to store the stems
tweets_stem = [] 

for word in tweets_clean:
    stem_word = stemmer.stem(word)  # stemming word
    tweets_stem.append(stem_word)  # append to the list

print('stemmed words:')
print(tweets_stem)
```

获得结果

```
['beautiful', 'sunflowers', 'sunny', 'friday', 'morning', ':)', 'sunflowers', 'favourites', 'happy', 'friday', '…']

stemmed words:
['beauti', 'sunflow', 'sunni', 'friday', 'morn', ':)', 'sunflow', 'favourit', 'happi', 'friday', '…']
```

现在我们基本上就完成了words的预处理
# 3. 作业
使用utils.py里的函数```process_tweet(tweet)```来实习今天的工作。
如

```python
from utils import process_tweet # Import the process_tweet function

# choose the same tweet
tweet = all_positive_tweets[2277]

print()
print('\033[92m')
print(tweet)
print('\033[94m')

# call the imported function
tweets_stem = process_tweet(tweet); # Preprocess a given tweet

print('preprocessed tweet:')
print(tweets_stem) # Print the result
```

得到结果

```
My beautiful sunflowers on a sunny Friday morning off :) #sunflowers #favourites #happy #Friday off… https://t.co/3tfYom0N1i

preprocessed tweet:
['beauti', 'sunflow', 'sunni', 'friday', 'morn', ':)', 'sunflow', 'favourit', 'happi', 'friday', '…']
```