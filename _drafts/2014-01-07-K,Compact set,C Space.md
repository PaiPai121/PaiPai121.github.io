---
layout: post
title: "Vector Space 向量空间"
tag: "泛函分析"
date: 2014-01-07
categories: 数理基础
---


拓扑空间的时候给出过 $\mathcal{C}(X;Y) (Y=R时为 C(X))$ 是X到Y的所有连续映射组成的集合。

$K$ 为紧拓扑空间，$(Y,||\cdot||)$ 是赋范向量空间，函数 $|||\cdot|||:\mathcal{C}(K:Y)\to R$ 定义为

$$|||f|||:=\mathop{sup}\limits_{x\in K}||f(x)||, f\in\mathcal{C}(K:Y)$$

$|||\cdot|||$ 为 $\mathcal{C}(K;Y)$ 上的范数。

$d(x,x) = \sum_{i=0}^\infty 0 = 0$

$d(x,y) = \lim_{i=1}^\infty |x_i-y_i| =  \lim_{i=1}^\infty |y_i-x_i| = d(y,x)$

$d(x,y) + d(y,z) = \mathop{\sum}\limits_{i=1}^\infty (|x_i-y_i|+|y_i-z_i|) \ge \mathop{\sum}\limits_{i=1}^\infty |x_i-z_i| = d(x,z)$

$\rho(x,x) = \mathop{sup}\limits_i~~ 0=0$

$\rho(x,y)=\mathop{sup}\limits_i |x_i-y_i| = \mathop{sup}\limits_i |y_i-x_i|=\rho(y,x)$

$\rho(x,y) + \rho(y,z) = \mathop{sup}\limits_i |x_i-y_i| + \mathop{sup}\limits_i |y_i-z_i|\ge \mathop{sup}\limits_i (|x_i-y_i|+|y_i - z_i|)\ge \mathop{sup}\limits_i |x_i-z_i| = \rho(x,z) $

<!----->

$\mathop{sup}\limits_i |x_n-x_0| \to 0,\sum_{i=0}^\infty |x_n-x_0| \not \to 0$

## 唯一线性连续延拓

设X为赋范向量空间 $\tilde{ X}$ 的稠密子空间，Y是Banach空间， $A: X\to Y$ 为连续线性算子，则存在唯一的连续线性算子 $\tilde{A}:\tilde{X}\to Y$ ,$\tilde{A}$是A的延拓，即当 $x\in X$ 时， $\tilde{A}x = Ax$ ，而且对任何 $\tilde{x}\in \tilde{X}$ 和元素 $x_n\in X$ 的任何序列 $(x_n)_{n=1}^\infty$ , 当它在 $\tilde{X}$ 中满足 $\lim_{n\to\infty} x_n = \tilde{x}$ 时

$$\tilde{A}\tilde{x} = \lim_{n\to\infty} Ax_n$$

$$||\tilde{A}||_{\mathcal{L}(\tilde{X};Y)} = ||A||_{\mathcal{L}(X;Y)}$$

