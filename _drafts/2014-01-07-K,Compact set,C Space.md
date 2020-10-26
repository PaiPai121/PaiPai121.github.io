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