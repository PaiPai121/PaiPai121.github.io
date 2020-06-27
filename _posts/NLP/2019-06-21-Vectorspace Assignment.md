---
layout: post
title: "向量空间 Assignment"
tag: "NLP"
date: 2019-06-21
categories: 自然语言处理
---
<!-- TOC -->

- [1. Predict the Countries from Capitals 从首都猜测国家](#1-predict-the-countries-from-capitals-从首都猜测国家)
  - [1.1. 引入数据](#11-引入数据)
  - [1.2. 预测词语关系](#12-预测词语关系)
    - [1.2.1. 余弦相似性](#121-余弦相似性)
    - [1.2.2. 欧氏距离](#122-欧氏距离)
    - [1.2.3. 寻找首都对应的国家](#123-寻找首都对应的国家)
    - [1.2.4. 模型精度](#124-模型精度)
    - [1.2.5. 使用PCA绘制向量](#125-使用pca绘制向量)
    - [PCA测试](#pca测试)

<!-- /TOC -->
# 1. Predict the Countries from Capitals 从首都猜测国家
## 1.1. 引入数据

```python
# Run this cell to import packages.
import pickle
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from utils import get_vectors

data = pd.read_csv('capitals.txt', delimiter=' ')
data.columns = ['city1', 'country1', 'city2', 'country2']

# print first five elements in the DataFrame
data.head(5)
```

由于Google new 数据集大约有3.64Gb，不能由工作区直接处理，因此下载并命名为了word_embeddings_capitals.p，如果想在自己的PC上运行可以从[此链接](https://code.google.com/archive/p/word2vec/)
下载，并运行如下代码

```python
import nltk
from gensim.models import KeyedVectors


embeddings = KeyedVectors.load_word2vec_format('./GoogleNews-vectors-negative300.bin', binary = True)
f = open('capitals.txt', 'r').read()
set_words = set(nltk.word_tokenize(f))
select_words = words = ['king', 'queen', 'oil', 'gas', 'happy', 'sad', 'city', 'town', 'village', 'country', 'continent', 'petroleum', 'joyful']
for w in select_words:
    set_words.add(w)

def get_word_embeddings(embeddings):

    word_embeddings = {}
    for word in embeddings.vocab:
        if word in set_words:
            word_embeddings[word] = embeddings[word]
    return word_embeddings


# Testing your function
word_embeddings = get_word_embeddings(embeddings)
print(len(word_embeddings))
pickle.dump( word_embeddings, open( "word_embeddings_subset.p", "wb" ) )
```

```python
word_embeddings = pickle.load(open("word_embeddings_subset.p", "rb"))
len(word_embeddings)  # there should be 243 words that will be used in this assignment
print("dimension: {}".format(word_embeddings['Spain'].shape[0]))
```

## 1.2. 预测词语关系

现在编写一个函数来预测单词之间的关系，实现如下图的功能

<img src="/pics/NLP/vectorAssign1.jpg">

### 1.2.1. 余弦相似性
如之前所述

$$\cos(\theta) = \frac{\vec A\cdot \vec B}{||\vec A||\cdot||\vec B||}$$

则代码实现为

```python
# UNQ_C1 (UNIQUE CELL IDENTIFIER, DO NOT EDIT)
def cosine_similarity(A, B):
    '''
    Input:
        A: a numpy array which corresponds to a word vector
        B: A numpy array which corresponds to a word vector
    Output:
        cos: numerical number representing the cosine similarity between A and B.
    '''

    ### START CODE HERE (REPLACE INSTANCES OF 'None' with your code) ###
    
    dot = np.dot(A,B)
    norma = np.linalg.norm(A)
    normb = np.linalg.norm(B) 
    cos = dot/norma/normb

    ### END CODE HERE ###
    return cos


king = word_embeddings['king']
queen = word_embeddings['queen']

cosine_similarity(king, queen)

## 输出为 0.6510957
```

### 1.2.2. 欧氏距离

同样如前节所述

$$d(A,B) = d(B,A) = \sqrt{\Sigma_{i=1}^n(A_i-B_i)^2}$$

代码实现为

```python
# UNQ_C2 (UNIQUE CELL IDENTIFIER, DO NOT EDIT)
def euclidean(A, B):
    """
    Input:
        A: a numpy array which corresponds to a word vector
        B: A numpy array which corresponds to a word vector
    Output:
        d: numerical number representing the Euclidean distance between A and B.
    """

    ### START CODE HERE (REPLACE INSTANCES OF 'None' with your code) ###

    # euclidean distance

    d = np.linalg.norm(A-B)

    ### END CODE HERE ###

    return d

# Test your function
euclidean(king, queen)

## 输出为 2.4796925
```

### 1.2.3. 寻找首都对应的国家
给定了以下词语
Athens、 Greece、 Baghdad
已知雅典是希腊的首都，希望得到巴格达是伊拉克的首都。


```python
# UNQ_C3 (UNIQUE CELL IDENTIFIER, DO NOT EDIT)
def get_country(city1, country1, city2, embeddings):
    """
    Input:
        city1: a string (the capital city of country1)
        country1: a string (the country of capital1)
        city2: a string (the capital city of country2)
        embeddings: a dictionary where the keys are words and values are their embeddings
    Output:
        countries: a dictionary with the most likely country and its similarity score
    """
    ### START CODE HERE (REPLACE INSTANCES OF 'None' with your code) ###

    # store the city1, country 1, and city 2 in a set called group
    group = set((city1,country1,city2))

    # get embeddings of city 1
    city1_emb = embeddings[city1]

    # get embedding of country 1
    country1_emb = embeddings[country1]

    # get embedding of city 2
    city2_emb = embeddings[city2]

    # get embedding of country 2 (it's a combination of the embeddings of country 1, city 1 and city 2)
    # Remember: King - Man + Woman = Queen
    vec = country1_emb - city1_emb + city2_emb

    # Initialize the similarity to -1 (it will be replaced by a similarities that are closer to +1)
    similarity = -1

    # initialize country to an empty string
    country = ''

    # loop through all words in the embeddings dictionary
    for word in embeddings.keys():

        # first check that the word is not already in the 'group'
        if word not in group:

            # get the word embedding
            word_emb = embeddings[word]

            # calculate cosine similarity between embedding of country 2 and the word in the embeddings dictionary
            cur_similarity = cosine_similarity(word_emb,vec)

            # if the cosine similarity is more similar than the previously best similarity...
            if cur_similarity > similarity:

                # update the similarity to the new, better similarity
                similarity = cur_similarity

                # store the country as a tuple, which contains the word and the similarity
                country = (word, similarity)

    ### END CODE HERE ###

    return country


### 进行预测国家

# Testing your function, note to make it more robust you can return the 5 most similar words.
get_country('Athens', 'Greece', 'Cairo', word_embeddings)
```

则可以得到结果('Egypt', 0.76268214)

### 1.2.4. 模型精度

$$Accuracy = \frac{Correct\ of\ predictions}{Total\ of\ predictions}$$

按照定义计算，有

```python
# UNQ_C4 (UNIQUE CELL IDENTIFIER, DO NOT EDIT)
def get_accuracy(word_embeddings, data):
    '''
    Input:
        word_embeddings: a dictionary where the key is a word and the value is its embedding
        data: a pandas dataframe containing all the country and capital city pairs
    
    Output:
        accuracy: the accuracy of the model
    '''

    ### START CODE HERE (REPLACE INSTANCES OF 'None' with your code) ###
    # initialize num correct to zero
    num_correct = 0

    # loop through the rows of the dataframe
    for i, row in data.iterrows():
        # get city1
        city1 = row["city1"]

        # get country1
        country1 = row["country1"]

        # get city2
        city2 =  row["city2"]

        # get country2
        country2 = row["country2"]

        # use get_country to find the predicted country2
        predicted_country2, _ = get_country(city1, country1, city2, word_embeddings)

        # if the predicted country2 is the same as the actual country2...
        if predicted_country2 == country2:
            # increment the number of correct by 1
            num_correct += 1

    # get the number of rows in the data dataframe (length of dataframe)
    m = len(data)

    # calculate the accuracy by dividing the number correct by m
    accuracy = num_correct / m

    ### END CODE HERE ###
    return accuracy

accuracy = get_accuracy(word_embeddings, data)
print(f"Accuracy is {accuracy:.2f}")

## Accuracy is 0.92
```

### 1.2.5. 使用PCA绘制向量
1. 平均归一化数据
2. 计算数据的协方差矩阵
3. 计算特征值和特征向量
4. 给归一化的数据乘前k个特征值

本次目标是把数据降到二维，以便绘图，其计算函数如下


```python
# UNQ_C5 (UNIQUE CELL IDENTIFIER, DO NOT EDIT)
def compute_pca(X, n_components=2):
    """
    Input:
        X: of dimension (m,n) where each row corresponds to a word vector
        n_components: Number of components you want to keep.
    Output:
        X_reduced: data transformed in 2 dims/columns + regenerated original data
    """

    ### START CODE HERE (REPLACE INSTANCES OF 'None' with your code) ###
    # mean center the data
    X_demeaned = X - np.mean(X)

    # calculate the covariance matrix
    covariance_matrix = np.cov(X_demeaned, rowvar=False)

    # calculate eigenvectors & eigenvalues of the covariance matrix
    eigen_vals, eigen_vecs = np.linalg.eigh(covariance_matrix, UPLO='L')
    
    # sort eigenvalue in increasing order (get the indices from the sort)
    idx_sorted = np.argsort(eigen_vals)
    
    # reverse the order so that it's from highest to lowest.
    idx_sorted_decreasing = idx_sorted[::-1]
    
    # sort the eigen values by idx_sorted_decreasing
    eigen_vals_sorted = eigen_vals[idx_sorted_decreasing]

    # sort eigenvectors using the idx_sorted_decreasing indices
    eigen_vecs_sorted = eigen_vecs[:,idx_sorted_decreasing]

    # select the first n eigenvectors (n is desired dimension
    # of rescaled data array, or dims_rescaled_data)
    eigen_vecs_subset = eigen_vecs_sorted[:,0:n_components]

    # transform the data by multiplying the transpose of the eigenvectors 
    # with the transpose of the de-meaned data
    # Then take the transpose of that product.
    X_reduced = np.dot(eigen_vecs_subset.transpose(),X_demeaned.transpose())

    ### END CODE HERE ###

    return X_reduced.transpose()

```

原文中的hints给的十分详细，按照hints内容可以轻易写出这个结果。
hint原文如下
- Use numpy.mean(a,axis=None) : If you set axis = 0, you take the mean for each column. If you set axis = 1, you take the mean for each row. Remember that each row is a word vector, and the number of columns are the number of dimensions in a word vector.
- Use numpy.cov(m, rowvar=True) . This calculates the covariance matrix. By default rowvar is True. From the documentation: "If rowvar is True (default), then each row represents a variable, with observations in the columns." In our case, each row is a word vector observation, and each column is a feature (variable).
- Use numpy.linalg.eigh(a, UPLO='L')
- Use numpy.argsort sorts the values in an array from smallest to largest, then returns the indices from this sort.
- In order to reverse the order of a list, you can use: x[::-1].
- To apply the sorted indices to eigenvalues, you can use this format x[indices_sorted].
When applying the sorted indices to eigen vectors, note that each column represents an eigenvector. In order to preserve the rows but sort on the columns, you can use this format x[:,indices_sorted]
- To transform the data using a subset of the most relevant principle components, take the matrix multiplication of the eigenvectors with the original data.
- The data is of shape (n_observations, n_features).
- The subset of eigenvectors are in a matrix of shape (n_features, n_components).
- To multiply these together, take the transposes of both the eigenvectors (n_components, n_features) and the data (n_features, n_observations).
- The product of these two has dimensions (n_components,n_observations)
- Take its transpose to get the shape (n_observations, n_components).


  ### PCA测试

```python
words = ['oil', 'gas', 'happy', 'sad', 'city', 'town',
         'village', 'country', 'continent', 'petroleum', 'joyful']

# given a list of words and the embeddings, it returns a matrix with all the embeddings
X = get_vectors(word_embeddings, words)

print('You have 11 words each of 300 dimensions thus X.shape is:', X.shape)

result = compute_pca(X, 2)
plt.scatter(result[:, 0], result[:, 1])
for i, word in enumerate(words):
    plt.annotate(word, xy=(result[i, 0] - 0.05, result[i, 1] + 0.1))

plt.show()
```

有结果

<img src = "/pics/NLP/PCA.png">