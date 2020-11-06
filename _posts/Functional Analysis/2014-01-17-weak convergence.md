---
layout: post
title: "二次极小化问题和Lax-Milgram引理"
tag: "泛函分析"
date: 2014-01-17
categories: 数理基础
---
- [1. 二次极小化问题](#1-二次极小化问题)
- [2. Lax-Milgram 引理](#2-lax-milgram-引理)
  - [2.1. **Lax-Milgram 引理：**](#21-lax-milgram-引理)


# 1. 二次极小化问题

(在函数空间中更多的是用 $u,v\in V$ 而不是 $x,y\in X$ ，我也不知道为什么)

- 设 $(V,||\cdot||)$ 是Banach空集， $a:V\times V\to\mathbb{R}$ 是对称的连续双线性形式，则有
$$\exists \alpha 使得 \alpha>0 , \alpha(u,v)\ge \alpha||v||^2,v\in V$$

- 设 $l:V\to \mathbb{R}$ 是连续线性形式，而泛函 $J:V\to\mathbb{R}$ 为 $J(v):=\frac{1}{2}a(v,v)-l(v)$

- 设U是V的子集

则存在唯一的元素u使得
$u\in U,J(u) = inf_{v\in U}J(v)$

这样的映射是Lipschitz连续的，当且仅当U是V的子空间时它是线性的。

这里的这个 $J$ 就是一个二次泛函，定理说的自然就是在满足条件的情况下，这个二次泛函的下界是存在的。

**强制：** 设V是一个赋范向量空间，其中范数为 $||\cdot||$ ，一个双线性形式 $a:V\times V \to \mathbb{R}$ 如果存在常数α使得 $\alpha >0 且 a(v,v)\ge \alpha ||v||^2,\forall v\in V$ 则称V是强制的😂。

也就是说，能找到这么一个数让他的范数的平方比 a(v,v) 小。

V强制的双线性形式也经常称为V椭圆的。


**二次极小化问题：** 探讨是否存在一个元素使得二次泛函 $J:V\to\mathbb{R}$ 在V的一个非空子集U上达到极小。

仍然有假设

- 设 $(V,||\cdot||)$ 是Banach空集， $a:V\times V\to\mathbb{R}$ 是对称的连续双线性形式，则有
$$\exists \alpha 使得 \alpha>0 , \alpha(u,v)\ge \alpha||v||^2,v\in V$$

- 设 $l:V\to \mathbb{R}$ 是连续线性形式，而泛函 $J:V\to\mathbb{R}$ 为 $J(v):=\frac{1}{2}a(v,v)-l(v)$

- 设U是V的子集

一个元素 $u\in U$ 是定理中的极小化问题的解的充要条件是它满足
$$a(u,v-u)\ge l(v-u),\forall v\in U$$
如果U是V上的闭子空间，则为
$$a(u,v) = l(v),\forall v\in U$$

**证明**
（疯狂使用投影定理）
设 $c\in V$ 使得 $l(v)=a(c,v),\forall v\in X$  ，由投影定理由 $u\in U$ 是c到U上的投影的充要条件是 $a(u-c,v-u)\ge 0,\forall v\in U$ 。

该不等式等价为 $a(u,v-u)\ge a(c,v-u) = l(v,u),\forall v\in U$  （由线性关系可得）
就是刚才题目里面的那个不等式。

如果U是V的子空间的话，由投影定理断定 $u\in U$ 是c到U上的投影的充要条件是 $a(u-c,v) = 0,\forall v\in U$
（就是u-c和平面U正交嘛）
所以
$$a(u,v) = l(v),\forall v\in U$$

# 2. Lax-Milgram 引理
给定向量空间V的一个非空子集 U，一个双线性形式 $a(\cdot,\cdot):V\times V\to \mathbb{ R}$ 以及一共线性形式 $l$ 。

**一个抽象变分问题：** 
****************
在一般情况下，求一个元素 $u\in U$ 使得 

$$a(u,v-u)\ge l(v-u),\forall v\in U$$

如果U是一个子空间，则求一个元素 $u\in U$ 使得 

$$a(u,v)= l(v),\forall v\in V$$

****************************
由刚才二次极小化问题可知，如果
- 空集V完备
- V的子集U是闭凸
- 线性形式l是连续的
- 双线性形式是V强制、连续、对称的

那么这些问题都均有且只有一个解。

(其实如果把双线性形式的对称性去掉，V是Hilbert空集，这种抽象变分仍然只有一个解。)


## 2.1. **Lax-Milgram 引理：**
设V是Hilbert空集， $a(\cdot,\cdot):V\times V \to \mathbb{R}$ 是连续且V强制的双线性形式，而 $l:V\to\mathbb{R}$ 是连续线性形式。

**抽象变分问题：** 
**************
求一个元素 $u\in V$ 使得

$$a(u,v)=l(v),\forall v\in V$$

**************

有且只有一个解，且由此定义的映射 $l\in V'\to u\in V$ 是线性连续的。

- **证明：**
设 $(\cdot,\cdot)$ 和 $||\cdot||$ 表示空间V中的内积和范数，而M为常数使得

$$|a(u,v)|\le M||u||~||v||,\forall u,v\in V$$

也就是说，对每一个u，线性形式 $v\in V\to a(u,v) \in \mathbb{R}$ 都是连续的，因此对每个 $u\in V$ ，都有唯一的元素 $Au\in V'$ 使得 

$$a(u,v) = Au(v),\forall v\in V$$

因此可以定义线性映射 $A:V\to V'$ ，其是线性的。
由于 

$$||Au||_{V'} = sup_{v\not ={0}} \frac{|Au(v)|}{||v||} = sup_{v\not ={0}}\frac{|a(u,v)}{||v||}\le M||u||,\forall u\in V$$

因此A是连续的，有 $||A||_{\mathcal{L}(V;V')}\le M$

抽象变分问题等价于解方程 

$$V' 中：Au = l  $$

或者等价的有

$$V中： \tau(Au-l)=0$$

这里的 $\tau:V'\to V$ 为F.Riesz 映射。

可以证明，对适当的值 $\rho > 0$ ，仿射映射 $f_p:v\in V\to v - \rho \tau (Av-l)\in V$ 是压缩的。(证明过程略过了，可以求得允许的 $\rho$ 范围是 $(0,\frac{2\alpha}{M^2})$)

然后由Banach不动点定理可得 $f_p$ 有唯一不动点 $u\in V$ ，满足 $\tau(Au-l) = 0$

- **补充:F.Riesz 表示定理**
设 $(X,(\cdot,\cdot))$ 是 $\mathbb{K=R}$ 或 $\mathbb{K=C}$ 上的Hilbert空间，对任意给定的连续线性泛函 $l\in X^*$ 存在唯一的向量 $y_l\in X$ 使得对所有的 $x\in X$ 有

$$l(x) = (x,y_l)$$

而且 

$$||l||_X'=||y_l||_X$$

由此定义的 F.Riesz 等距算子 $\sigma: l\in X' \to \sigma (l) = y_l\in X$ 是一个双射，当 $\mathbb{K=R}$ 时，它是线性的，当 $\mathbb{K=C}$ 时，它是半线性的。