---
layout: post
title: "Banach Example 巴纳赫空间、lp空间、勒贝格空间"
tag: "泛函分析"
date: 2014-01-09
categories: 数理基础
---

- [1. Banach 空间的基本性质](#1-banach-空间的基本性质)
- [2. Banach 空间的例子](#2-banach-空间的例子)
  - [2.1. 空间 $l^p, 1\le p\le \infty$](#21-空间-lp-1le-ple-infty)
  - [2.2. Lebesgue 空间 $L^p(\Omega), 1\le p \le \infty$](#22-lebesgue-空间-lpomega-1le-p-le-infty)

# 1. Banach 空间的基本性质
赋范向量空间 $(X,||\cdot||)$ 称为 Banach 空间，是指距离空间 $(X,d)$ 是完备的，这里X是的距离d定义为 $d(x,y):=||x-y||$ 

总而言之Banach空间是一个完备的赋范向量空间，就是性质很好。

# 2. Banach 空间的例子
## 2.1. 空间 $l^p, 1\le p\le \infty$
这个空间 $l^p$ 嘛，就是p次方可和的实数序列空间
- 映射 $||\cdot||_p$ 是 $\mathbb{K}^n$ 上的范数， $||x||_p=(\sum_{i=1}^{n}|x_i|^p)^{\frac{1}{p}}$ ,当 $p = \infty$ 时 $||x||_\infty = max_{1\le i \le n}|x_i|$ 
- 对每个扩充实数 $1\le p \le \infty$ 用 $l^p$ 表示由 $x_i\in\mathbb{K}$ 的满足:
  - 无穷序列 $x =(x_i)_{i=1}^\infty$ 组成的集合
  - 当 $1\le p < \infty$ 时 $\sum_{i=1}^\infty |x_i|^p <\infty$ ,
  - 当 $p = \infty$ 时， $\mathop{sup}\limits_{i\ge 1}|x_i|<\infty$

有以下性质

- 对每个 $1\le l \le \infty,~l^p \to ||x||_p = (\sum_{i=1}^\infty |x_i|^p)^{\frac{1}{p}}$
- 当 $p = \infty$ 时， $x = (x_i)_{i=1}^\infty \in l^\infty \to ||x||_\infty = \mathop{sup}\limits_{i\ge 1} |x_i|$ ，则 $||\cdot||_p$ 是 $l^p$ 上的范数
- 赋范向量空间 $(l^p,||\cdot||_p), 1\le p < \infty$ ，是可分的
- 赋范向量空间 $(l^\infty,||\cdot||_\infty)$ ，是不可分的
(再想一下可分，是说这个拓扑空间有一个可数的稠密子集，就分得开)

空间 $(l^p,||\cdot||_p),1\le p\le \infty$ 就是Banach空间




## 2.2. Lebesgue 空间 $L^p(\Omega), 1\le p \le \infty$ 
网上有位大佬说空间 $L^p(\Omega)$ 就是p次方可积的函数序列空间
把上面的 $l^p$ 里的实数换成函数，可和换成可积。

书上比较正式的定义是：
- 用 $\Omega$ 表示 $\mathbb{R}^n$ 中任意一个开子集，相应的空间 $L^1(\Omega)$ 由所有的实Lebesgue可积函数(的等价类)组成，即其元素是可测函数 $f:\Omega\to[-\infty,\infty],\int_{\Omega}|f(x)|dx < \infty$
- 将这个定义扩充，给定任何 $1<p<\infty$ ，用 $L^p(\Omega)$ 表示所有的可测函数(的等价类) $f:\Omega\to[-\infty,\infty]$ 使得 $|f|^p\in L^1(\Omega)$ ，或等价满足 $\int_{\Omega}|f(x)|^pdx < \infty$ 组成的集合

和前面那句话差不多，函数的p次方可积。

**Lebesgue可积(勒贝格可积):** 可测函数 $f:A\to [-\infty,\infty]$ 满足 $\int_A max\{f(x);0\}dx < \infty 且 \int_A max \{-f(x);0\}dx<\infty$
**Lebesgue积分:** 若f可积，其Lebesgue积分为 $\int_A f(x)dx:=\int_A max\{f(x);0\}dx - \int_A max \{-f(x);0\}dx$


Lebesgue 空间 $L^p(\Omega), 1\le p \le \infty$  同样是一个Banach空间

