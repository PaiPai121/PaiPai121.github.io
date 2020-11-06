---
layout: post
title: "Series in Banach 巴纳赫空间的级数"
tag: "泛函分析"
date: 2014-01-10
categories: 数理基础
---

- [1. Banach 空间的级数](#1-banach-空间的级数)
  - [1.1. **Neumann级数 $\sum_{n=0}^\infty A_n$**](#11-neumann级数-sum_n0infty-a_n)
  - [1.2. 相关定理](#12-相关定理)

# 1. Banach 空间的级数
如果 $(X,||\cdot||)$ 是赋范向量空间， $(x_n)_{n=1}^\infty$ 是向量 $x_n\in X$ 的序列，则 $\sum_{n=1}^\infty x_n$ 是一个级数，对每个整数 $k\ge 1$ 称 $s_k:=\sum_{n=1}^k x_n$ 是级数的前k项部分和。如果序列 $(s_k)_{k=1}^\infty$ 在X中收敛，则称级数 $\sum_{n=1}^\infty x_n$ 为收敛的，有 $\sum_{n=1}^\infty x_n = s$
s为级数的和。

emmm似乎和高数里面的级数没什么区别

**收敛性：** 如果级数满足 $\sum_{n=1}^\infty ||x_n|| <\infty$ ，则级数收敛，其和满足 $||\sum_{n=1}^\infty x_n||\le \sum_{n=1}^\infty ||x_n||$

## 1.1. **Neumann级数 $\sum_{n=0}^\infty A_n$** 
- 如果 $(X,||\cdot||)$ 是Banach空间， $A\in \mathcal L(X)$ （这里A是一个线性算子） 满足 $||A||<1$ 
1. 连续线性算子 $(I-A):X\to X$ 是双射，其逆 $(I-A)^{-1}:X\to X$也是连续线性算子
2. $(I-A)^{-1}= \sum_{n=0}^\infty A^n ~~ and ~~ ||(I-A)^{-1}||\le\frac{1}{1-||A||}$

**简单的证明** 
$||A||<1$ 有 $\sum_{n=0}^\infty ||A^n|| \le \sum_{n=0}^\infty ||A||^n <\infty $ （中间这一步可以由柯西不等式出来 $||A^2|| \le ||A||\cdot||A||$ ）

**（补充一个定理：如果X为赋范向量空间，Y是Banach空间，则 $(\mathcal{L}(X;Y),||\cdot||_{\mathcal{L}(X;Y)})$ 是Banach空间，这里应该有证明但是我~~懒得写了~~写不下了 ）**

又有刚才的级数收敛性，可以知道这个级数是收敛的。 $B \in \mathcal{L} (X)$ 为级数和，即 $B = \sum_{n=0}^\infty A^n := \lim_{k \to \infty} B_k, ~~ B_k:=\sum_{n=0}^k A^n$

(B是线性算子的乘积嘛，所有还是线性算子，$\mathcal L (X)$ 是线性算子的集合，肯定包含了B嘛)

再给它分别左乘和右乘A，有

$AB = \lim_{k\to\infty} AB_k = \lim_{k\to \infty} (B_{k+1} - I) = B-I$

$BA = \lim_{k\to\infty} B_kA = \lim_{k\to \infty} (B_{k+1} - I) = B-I$

联立有

$I=B(I-A) = (I-A)B$

由于 $(I-A)\in \mathcal{L}(X)$ 既有左逆又有右逆，所有是双射。

~~1的双射证明完成，开始搞2~~

$(I-A)^{-1} = B =\sum_{n=0}^\infty A^n$

有展开式 $\frac{1}{1-z} = \sum_{n=0}^\infty z^n$ ，所以

$||(I-A)^{-1}||\le \sum_{n=0}^\infty ||A^n||\le\sum_{n=0}^\infty ||A||^n = \frac{1}{1-||A||}$


## 1.2. 相关定理
1. **如果X是Banach空间，Y是赋范向量空间，则集合**

$$\mathcal{U}:= \{A\in\mathcal{L}(X;Y);A:X\to Y 是双射，且 A^{-1}\in \mathcal{L}(Y;X)\}$$ 

**是赋范向量空间 $(\mathcal{L}(X;Y),||\cdot||_{\mathcal{L}(X;Y)})$ 中的开集**

**又设 $A\in\mathcal{U}$ ,如果 $||B-A||<\frac{1}{||A^{-1}||}$ 则 $B\in \mathcal{U}$ ，此时**
$$||B^{-1}||\le\frac{||A^{-1}||}{1-||A^{-1}(B-A)||}\le\frac{||A^{-1}||}{1-||A^{-1}||||B-A||}$$

$$||B^{-1}-A^{-1}||\le\frac{||A^{-1}||^2||B-A||}{1-||A^{-1}(B-A)||}\le\frac{||A^{-1}||^2||B-A||}{1-||A^{-1}||||B-A||}$$
**因而 $A\in\mathcal{U}\to A^{-1}\in \mathcal{U}$ 是连续的**

- 简单的证明
$A\in\mathcal{U}$ ，$\mathcal{L}(X)$ 是Banach空间 (因为X是Banach空间嘛，前面提到有定理。) ，如果有
$$||B-A||<\frac{1}{||A^{-1}||}$$
则有 $||A^{-1}(B-A)||\le ||A^{-1}||~~||B-A|| < 1$ ,前面证明了如果 $||A||<1$ 连续线性算子 $(I-A):X\to X$ 是双射，这里把A 换成 $-A^{-1}(B-A)$ ，可知 $(I+A^{-1}(B-A))$ 是双射，有双射
$$B = A + B - A = A(I+A^{-1}(B-A))$$
$$B^{-1} = (I+A^{-1}(B-A))^{-1}A^{-1}$$
B也是有连续逆的双射 , $B\in \mathcal{L}(X;Y)$
还是用前面证明的不等式$||(I-A)^{-1}||\le\frac{1}{1-||A||}$，有
$||B^{-1}||\le ||(I+A^{-1}(B-A))^{-1}|| ~~||A^{-1}||\le \frac{||A^{-1}||}{1-||A^{-1}(B-A)||} \le \frac{||A^{-1}||}{1-||A^{-1}||~~||(B-A)||}$
如果 $||B-A||<\frac{1}{||A^{-1}||}$ ，$B^{-1} - A^{-1} = B^{-1}(A-B)A^{-1}$
所以 
$$||B^{-1} - A^{-1}||\le||B^{-1}(A-B)A^{-1}||\le\frac{||A^{-1}||^2||B-A||}{1-||A^{-1}(B-A)||}\le\frac{||A^{-1}||^2||B-A||}{1-||A^{-1}||||B-A||}$$