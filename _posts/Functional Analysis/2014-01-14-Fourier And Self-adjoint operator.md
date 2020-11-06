---
layout: post
title: "傅里叶级数、紧自伴算子"
tag: "泛函分析"
date: 2014-01-14
categories: 数理基础
---
- [1. 前置知识](#1-前置知识)
  - [1.1. 规范正交系](#11-规范正交系)
  - [1.2. Gram-Schmidt规范正交化方法](#12-gram-schmidt规范正交化方法)
- [2. Hilbert 基和 Fourier 级数](#2-hilbert-基和-fourier-级数)
  - [2.1. 可分Hilbert空间的 Fourier级数](#21-可分hilbert空间的-fourier级数)
  - [2.2. 常见的傅里叶级数](#22-常见的傅里叶级数)
    - [2.2.1. 正余弦](#221-正余弦)
    - [2.2.2. 复数](#222-复数)
- [3. 自伴算子](#3-自伴算子)
  - [3.1. 自伴算子的性质](#31-自伴算子的性质)
  - [3.2. 紧自伴算子的谱定理](#32-紧自伴算子的谱定理)

# 1. 前置知识

## 1.1. 规范正交系
设 $(X,(\cdot,\cdot))$ 是实或复的内积空间，由 $e_i\in X$ 组成的元素系 $(e_i)_{i\in I}$ 称之为规范正交系，是指对所有的的 $i,j\in I$ 均有 
$$(e_i,e_j) = \delta_{ij}$$
（就是相互正交的单位向量呗。。。）

如果 $(e_i)_{i\in I}$ 是内积空间X的规范正交系，如果 $\overline{Span(e_i)_{i\in I}} = X$ ，那么它是极大的（拥有向量个数最多）

**可分内积空间中：** 设 $(X,(\cdot,\cdot))$ 是可分的无限维内积空间，有
- 存在可数无限个向量 $e_n\in X$ 组成的极大规范正交系 $(e_n)_{n=0}^\infty$。
- 任何规范正交系或为有限，或为可数无限（可数无限就是可列举但是无穷多的意思）

**存在性：** 设 $(X,(\cdot,\cdot))$ 是内积空间，则存在向量 $e_i\in X$ 组成的向量族 $(e_i)_{i\in I}$ 满足对任何的 $i,j\in I$ ,
$$(e_i,e_j)=\delta_{ij}$$
且对 $x\in X$ ，若对所有的 $i\in I$ 均有当 $(x,e_i) = 0$ 时，则必有 $x=0$

## 1.2. Gram-Schmidt规范正交化方法
这个线代里面肯定学了
在 $(X,(\cdot,\cdot))$ 实或复的无限维内积空间中， $(f_n)_{n=0}^\infty$ 可列为无限个向量 $f_n\in X$ 组成的线性无关向量族，令
$$\tilde{x}:=f_0 ,\tilde{e_k} = f_k - P_kf_k,k=1,2,\dotsc$$

其中 $P_k$ 为X到 $Span~(f_n)_{n=0}^{k-1}$ 上的投影算子，那么对所有的 $k\ge 1,\tilde{e}_k\not ={0}$ ,记向量
$$e_n:=\frac{\tilde{e_n}}{||\tilde e_n||},n\ge 0$$
则向量族 $(e_n)_{n=0}^{\infty}$ 是规范正交系，满足对一切 $k\ge 1$ 有
$$Span(e_n)_{n=0}^k = Span(f_n)_{n=0}^k$$
$$Span(e_n)^\infty_{n=0}=Span(f_n)_{n=0}^\infty$$

# 2. Hilbert 基和 Fourier 级数
**Hilbert 基** Hilbert空间X中的极大规范正交系被称为X的Hilbert基

## 2.1. 可分Hilbert空间的 Fourier级数
若 $(X,(\cdot,\cdot))$ 是无限维可分 Hilbert 空间， $(e_n)_{n=1}^\infty$ 是X的一个Hilbert基
- $\forall x\in X , x = \sum_{n=1}^\infty (x,e_n)e_n$ ，这被称之为傅里叶级数。
- 对 $n\ge 1$ ，数 $(x,e_n)\in \mathbb{K}$ 称之为x 的 傅里叶系数，满足Parseval公式 $||x||^2 = \sum_{n=1}^\infty |(x,e_n)|^2$  （啊这，Parseval能量公式？熟悉的信号与系统）
- 若 $(X,(\cdot,\cdot))$ ，为实或复的无限维可分 Hilbert 空间，则存在从X到实或相应复空间 $l^2$ 上的线性双射 $\sigma$ ，使得对任何 $x,y\in X$ , $(x,y)_X = (\sigma x,\sigma y)_{l^2}$ ，因此借助于保持内积的线性灯具，任何无限维可分Hilbert 空间恒同于空间 $l^2$ 。

## 2.2. 常见的傅里叶级数
### 2.2.1. 正余弦
$a_k:=\frac{1}{\pi} \int_{0}^{2\pi} g(\phi) \cos k\phi d\phi,k\ge 0$
$b_k:= \frac{1}{\pi} \int_{0}^{2\pi} g(\phi) \sin k\phi d\phi,k\ge 1$
$(S_ng)(\theta):= \frac{a_0}{2} + \sum_{k=1}^n (a_k\cos k\theta + b_k\sin k\theta),0\le\theta\le 2\pi$

### 2.2.2. 复数
$c_k:\frac{1}{2\pi}\int_0^{2\pi} g(\phi)e^{-ik\phi} d\phi,k\ge 0$
$g_n(\theta) = \sum_{k=-n}^n c_k e^{ik\theta},0\le \theta\le 2\pi$


这两个理工科应该都贼熟了！！
不多赘述。


# 3. 自伴算子

设 $(X,(\cdot,\cdot))$ 是 $\mathbb{K}$ 上的内积空间，如果线性算子 $A:X\to X$ 和它的伴随算子 $A^*$
相等，即对 $\forall x,y\in X,(Ax,y) = (x,Ay)$ 则称A是自伴算子。当 $\mathbb{K=R}$ 时候也称作对称算子，当 $\mathbb{K=C}$ 也称作 Hermite算子。

(啊这很像厄米算符的解释啊)

简而言之，就是一个算子的伴随算子($(Ax,y) = (x,A^*y)$)还是自身，那它就是一个自伴算子。

**正定和非负定：** 如果对所有 $x\in X$ 均有 $(Ax,x) \ge 0$ 则称A为非负定的，如果对所有的非零的 $x\in X$ 均有 $(Ax,x) > 0$ ，称A为正定的。 正定A的 $Ker ~~ A = \{0\}$

## 3.1. 自伴算子的性质

如果 $(X,(\cdot,\cdot))$ 是内积空间， $A:X\to X$ 是自伴线性算子，有
- 对任何 $x\in X$ ，数 $(Ax,x)$ 是实的
- 设 $\lambda$ 为 A 的任意的特征值，则 $\lambda$ 必是实数，若A是非负定， 则 $\lambda \ge 0$ ;若A是正定的，则 $\lambda >0$
- 对应于不同特征值的特征向量相互正交
- 如果 $A\in \mathcal{L}(X)$ ,A的算子范数，即 $||A||:= sup _{x\not ={0}} \frac{||Ax||}{||x||}$ ，也可由 $||A|| = sup_{x\not ={0}} \frac{(Ax,x)}{||x||^2}$ 给出


## 3.2. 紧自伴算子的谱定理

**紧线性算子：** 线性算子 $A:X\to Y$ 是线性算子，如果X中任何有界子集在A作用下的像是Y中的相对紧子集，即当B在X中有界时， $\overleftarrow{A(B)}$ 是紧集，A是紧算子。 （最接近有限维空间的线性算子了）
(紧算子把有界子集映射为Y中的相对紧子集)


紧自伴算子自然就是又紧又自伴的线性算子。

**无限维值域的紧自伴算子的谱定理：** 设 $(X,(\cdot,\cdot))$ 为无限维内积空间， $A:X\to X$ 是紧自伴算子，具有无限维的值域，则有
- 1. 存在A的特征值的无限序列 $(\lambda_n)_{n=1}^\infty$ 和相应的特征向量的无限序列 $(p_n)_{n=1}^\infty$ ，满足 
  - $|\lambda_1| = ||A||,\lambda_1\ge \lambda_2\ge\dotsc \ge |\lambda_n| \ge \dotsc$
  - $\lambda_n\not ={0},n\ge 1;\lim_{n\to \infty} \lambda_n = 0$
  - $Ap_n = \lambda_n p_n,n\ge 1$
  - $(p_k,p_l) = \delta_{k,l},k,l\ge 1$
  - $|\lambda_1| = \frac{|(Ap_1,p_1)|}{||p_1||^2} = sup_{x\not ={0}} \frac{|(Ax,x)|}{||x||^2}$
  - $|\lambda_n| = \frac{|(Ap_n,p_n)|}{||p_n||^2} = \mathop{sup}\limits_{x\not ={0},(x,p_k) = 0,~~1\le k \le n-1} \frac{|(Ax,x)|}{||x||^2},n\ge 2$
- 2. 对任何向量 $x\in X$, $Ax=\mathop{\sum}\limits_{n=1}^\infty \lambda_n(x,p_n)p_n$
- 3. 设 $\lambda$ 为 A 的任何非零特征值，则存在 $n\ge 1$ ,使得 $\lambda_n = \lambda$ ，而且集合 $I(\lambda):=\{n\ge 1;\lambda_n = \lambda \}$ 是有限集， $\{p\in X;Ap=\lambda p\} = Span (p_n)_{n\in I(\lambda)}$
- 4. A的核空间为 $Ker ~~A = (Span(p_n)_{n=1}^\infty)^\perp$

啊这，好多啊。
1说明的应该是存在这样一个特征值和特征向量序列，然后这些特征值是按大小排列的，而特征向量则是构成了一族正交基。
2则是经过A得到的Ax可以被分解为特征向量的线性组合，并给出了系数。
3是说不会有无穷多个重复的特征值嘛。
4则是A的核空间由特征值对应的特征向量张成的子空间的直交补。