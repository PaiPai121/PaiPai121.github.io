---
layout: post
title: "Convex sets and convex functions 凸集和凸函数"
tag: "泛函分析"
date: 2014-01-08
categories: 数理基础
---


- [1. 凸集](#1-凸集)
- [2. 凸函数](#2-凸函数)

# 1. 凸集

**线段：** 给定向量空间的两点 a 和 b ，集合 $[a,b]: = \{ x\in X; x= \lambda a + (1-\lambda)b,0\le \lambda \le 1\}$ 是以a,b为端点的线段或闭线段。

没错没错，就是闭区间，几乎一毛一样。只不过这个点不再局限于是数轴上的点了，而是可以是任意向量空间的点。

**凸集：** 向量空间X的子集A若包含a,b 两点，则包含线段 [a,b]，称集合A为凸集。空集和单点集都是凸集，凸集的交集还是凸集。

![convex set](\../../pics/Functional%20Analysis/convexset.png)

灵魂画手绘图大概就是这样，只要集合里面有凹下去的地方，就必然有两点的连线不在集合内。如果任意两点的连线都在集合内，那么肯定一点凹都没有，那就是凸集。

**凸包：** A是X的子集，X中包含A的最小凸子集叫A的凸包 $co ~ A$

**凸组合：** A中元素的凸组合是指元素 $a_i\in A$ 的有限线性组合 $\Sigma_{i\in I} \lambda_i a_i$ 满足对一切的 $i\in I$ 有 $\lambda_i \ge 0,~ \sum_{i\in I}\lambda_i = 1$
这个凸组合就是系数和为1的有限线性组合咯。

- A的凸包就是由A的元素的所有凸组合构成的X的子集。

# 2. 凸函数
 X 为向量空间，A为X的凸子集，如果函数 $f:A\to\mathbb{R}$ 满足对任意点 $a,b\in A$ 和所有的 $0\le \lambda \le 1$ 均有 $f(\lambda a+(1-\lambda)b) \le \lambda f(a) + (1-\lambda)f(b)$ ，则其为凸函数，如果不取等号，那就是严格凸函数。

**推论:** 如果f是凸的，有
$$\sum_{i=1}^n \lambda_i =1,f(\sum_{i=1}^n\lambda_i a_i) \le \sum_{i=1}^n\lambda_i f(a_i)$$

这个其实就是说在任一点处函数的割线(这个点应该在割线两点之间)比函数值要大。比如画个最简单的x的平方的图像和一个割线

![convexfun](\../../pics/Functional%20Analysis/convexfun.png)

所以从图像的直观感觉而言，应该是函数向下凸出的时候是凸函数，如果给它反一下的话

![concavefun](\../../pics/Functional%20Analysis/concavefun.png)

这就是凹函数了。

**若函数 $-g:A\to \mathbb R$ 是凸的/严格凸的，那么 $g:A\to\mathbb{R}$ 是凹的/严格凹的**

- 如果X是实向量空集，线性泛函 $\mathcal{l}:X\to \mathbb{R}$ 是凸的，但不是严格凸的。
- 如果 $(X;||\cdot||)$ 是赋范向量空间，范数 $||\cdot||;X\to\mathbb{R}$ 是凸函数。 (由三角不等式易得。)

