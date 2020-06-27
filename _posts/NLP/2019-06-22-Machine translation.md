---
layout: post
title: "机器翻译 machine translation"
tag: "NLP"
date: 2019-06-22
categories: 自然语言处理
---

# Machine Translation 机器翻译

## 学习目标
- Transform Vector 向量变换
- "K nearest neightbor" K近邻
- Hash tables 哈希表
- Divide vector space into regions 划分向量
- Locality sensitive hashing 本地敏感哈希
- Approximated nearest neighbors 最近邻估计

## 概览
<img src = "/pics/NLP/MachineTranslation.png" width = 600>
基本思想为：首先将英语词语和法语词语都转换成向量表示，然后从英语到法语存在一种线性变换使其相互关联。
在翻译时，可以将一个英文单词通过变换变成一个在法语向量空间下的向量，然后找到和这个向量最接近的法语词，即为对应的翻译。

## 向量变换

<img src = "/pics/NLP/MachineTranslation2.png" width = 600>

若想获得最优的矩阵R，应使得XR和Y的distance最小。

- 1. 初始化R
- 2. 在循环中

$$Loss = ||\bold X\bold R-\bold Y||_F$$

$$g = \frac{d}{dR}Loss$$

如果从随机矩阵作为起点，可以通过不断迭代来使其优化。首先通过损失函数对矩阵求导来计算梯度

$$R = R -\alpha g$$

然后通过减去梯度*学习率来更新矩阵R

### F范数
Loss函数中的||·||<sub>F</sub>代表F范数
其表达式为

$$\sqrt{\Sigma_{i=1}^m\Sigma_{j=1}^n|a_{ij}|^2}$$

在python中可以通过以下方式计算F范数

```python
A_squared = np.square(A)
A_Frobenious = np.sqrt(np.sum(A_squared))
```

### 梯度的计算

$$g = \frac{d}{dR}Loss = \frac{2}{m}(X^T(XR-Y))$$