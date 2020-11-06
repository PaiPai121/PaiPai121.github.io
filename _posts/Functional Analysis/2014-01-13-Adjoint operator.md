---
layout: post
title: "伴随算子和再生核"
tag: "泛函分析"
date: 2014-01-13
categories: 数理基础
---
- [1. 前置知识](#1-前置知识)
- [2. 伴随算子](#2-伴随算子)
- [3. 再生核](#3-再生核)

# 1. 前置知识

设 $(X,(\cdot,\cdot))$ 是  $\mathbb{ K=R ~~ or~~ K=C}$ 上的内积空间，用X'表示其对偶空间，任意给定向量 $y\in X$ ,定义线性泛函 $l_y:X\to\mathbb K$ 为
$$l_y(x):=(x,y)\in\mathbb{K},\forall x\in X$$
是连续的且有 
$||l_y||_{X'}=||y||$
(由直和定理有，在X为Hilbert空间时，其逆定理也成立。)

**Hilbert空间的F.Riesz表示定理：** 设 $(X,(\cdot,\cdot))$ 是 $\mathbb{ K=R ~~ or~~ K=C}$ 上的Hilbert空间，对任意给定的连续线性泛函 $l\in X^*$ 存在唯一的向量 $y_l \in X$ 使得对所有的 $x\in X$ 有 $l(x) = (x,y_l),||l||_{X'}=||y_l||_X$


**Hilbert空间的Hanh-Banach定理：** 设 X 为 $\mathbb{ K=R ~~ or~~ K=C}$ 上的Hilbert空间，Y是X的子空间， $l:Y\to\mathbb{K}$ 是Y上的连续线性型，则存在连续线性型 $\tilde{l}:X\to\mathbb{K}$ (这就是一个延拓)满足对所有的 $y\in Y$ 有
$$\tilde{l}(y) = l(y),||\tilde{l}(y)||_{X'} = ||l(y)||_{Y'}$$
而且这样的延拓是唯一的。


# 2. 伴随算子
设 $(X,(\cdot,\cdot)_X) , (Y,(\cdot,\cdot)_Y)$ 为两个复Hilbert空间，给定算子 $A\in\mathcal{L}(X;Y)$
- 存在唯一的算子 $A^*\in\mathcal{L}(Y;X)$ ,称之为A的伴随算子 ，对所有的 $x\in X,y\in Y$ 有
  $(Ax,y)_Y = (x,A^*y)_X$
  这样定义的映射 $A\in \mathcal{L}(X;Y)\to A^*\in\mathcal{L}(Y;X)$ 是半线性的，而且
  $||A^*||_{\mathcal{L}(Y;X)} = ||A||_{\mathcal{L}(X;Y)}$
- 有 $(Im ~ A)^{\perp} = Ker ~A^*,(Im ~ A^*)^{\perp} = Ker ~A,~ Y=Ker ~ A^* \oplus \overline{Im~ A},~X=Ker ~ A \oplus \overline{Im~ A^*}$

证明：
1. 对每个 $y\in Y$ , 由于 $||(Ax,y)_Y||\le||A||~||x||~||y||$ （范数的特性嘛）对所有的 $x\in X$ 成立，因此 $x\in X \to (Ax,y)_y\in\mathbb{K}$ 是连续线性泛函（按距离收敛嘛）
在X上运用F.Riesz定理，有存在唯一的向量 $A^*y\in X$ ,使得对一切的 $x\in X$ 有 $(Ax,y)_Y=(x,A^*y)_X$
这样定义的映射 $A^*:Y\to X$ 是线性的。（可以验证）

线性算子 $A^*$ 连续，对任何 $y\in Y$ 有 $||A^*y||^2 = (A^*y,A^*y)_X = (AA^*y,y)_Y\le ||A||~||A^*y||~||y||$
所以有
$||A^*||~||A^*||~||y||~||y||\le ||A||~||A^*||~||y||~||y||$
因此有 
$$||A^*||_{\mathcal{L}(Y;X)} = \mathop{sup}\limits_{x\not ={0}} \frac{||Ax||}{||y||}\le ||A||_{\mathcal{L}(X;Y)}$$

同理 $\forall x\in X,||Ax||^2 \le ||A^*||~||Ax||~||x||$
有 
$$||A||\le||A^*||$$

夹逼定理嘛，他俩就相等了。

2. 有 $(Im ~ A)^{\perp} = \{y\in Y;\forall z\in Im~ A,(y,z)_Y = 0\}\\ = \{y\in Y;\forall x\in X,(y,Ax)_Y = 0\} \\= \{y\in Y;\forall x\in X,(A^*y,x)_X = 0\} = Ker~~A^*$

$(\overline{Im~A})^{\perp} = Im~A^\perp$

其他类似可得。


# 3. 再生核

设 $A$ 非空集合， $(X,(\cdot,\cdot))$ 为 $\mathbb{ K=R ~~ or~~ K=C}$ 上的Hilbert空间， 其元素为 $x:A\to \mathbb K$ 
设对每个 $a\in A,\exists C(a)\to 0$ 使得对任何的 $x\in X$ ,有 
$$|x(a)|\le C(a)||x||$$
则存在函数 $K:A\times A\to\mathbb{K}$ ，即为X的再生核，使得对每个 $a\in A$ ，函数 $K(\cdot,a):A\to K$ 是空间X的元素，对任何 $x\in X$ ，有 $x(a) = (x,K(\cdot,a))$

由F.Riesz定理易得该结论。

这个再生核还有再生核希尔伯特空间都蛮常用的，不过这里只是简单的给出了定义，以后再来仔细研究。