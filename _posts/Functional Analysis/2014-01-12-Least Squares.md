---
layout: post
title: "Least Squares 投影、直角、线性系统最小二乘解"
tag: "泛函分析"
date: 2014-01-12
categories: 数理基础
---

- [1. 前置知识](#1-前置知识)
  - [1.1. 内积空间](#11-内积空间)
    - [1.1.1. 一些性质](#111-一些性质)
  - [1.2. 希尔伯特空间 Hilbert Space](#12-希尔伯特空间-hilbert-space)
    - [1.2.1. 投影算子](#121-投影算子)
- [2. 线性系统的最小二乘解](#2-线性系统的最小二乘解)
- [3. 直和定理](#3-直和定理)
  - [3.1. 直交](#31-直交)
  - [3.2. 直和定理](#32-直和定理)

# 1. 前置知识
## 1.1. 内积空间
X是实向量空间，X上的内积是指函数 $(\cdot,\cdot):X\times X\to \mathbb{R}$ ,它满足对任何 $x,y,z\in X$ 和任何 $\alpha,\beta\in \mathbb{R}$ 有
$$(\alpha x+ \beta y,z) = \alpha(x,z) + \beta(y,z)$$
$$(x,\alpha y + \beta z) = \alpha(x,y) + \beta(x,z)$$
$$(x,y) = (y,x)$$
$$(x,x)\ge 0 , 当且仅当 x=0 时 (x,x) = 0$$


也就是说，线性、对称、正定。

如果是复向量空间的话，应有 $(x,y) = \overline{(y,x)}$

### 1.1.1. 一些性质
**柯西不等式成立**
$|(x,y)|\le \sqrt{(x,x)}\sqrt{(y,y)}$

**平行四边形法则**
$(X,(\cdot,\cdot))$ 为内积空间，对任何 $x,y\in X$ ，有 $||x+y||^2+||x-y||^2=2||x||^2+2||y||^2$
由此可得内积空间是一致凸的。
(啊这。。。对角线的范数和等于边长的范数和)

## 1.2. 希尔伯特空间 Hilbert Space
内积空间 $(X,(\cdot,\cdot))$ 被称为Hilbert空间，是指其作为赋范向量空间是一个 Banach空间，即X关于由 $||x|| = \sqrt{(x,x)},x\in X$ 定义的范数 $||\cdot||$ 是完备的。希尔伯特空间是欧几里德空间的直接推广。

### 1.2.1. 投影算子
$P:=I-aa^T$ 是X到Z上的投影算子，有
$$\forall x\in \mathbb{R}^n,a^TPx = a^Tx - a^Taa^Tx = 0$$
$$\forall z\in Z,(Px-z)^Tz = -x^Taa^Tz = 0$$

也就是可以投影到以a为法向量的超平面上。

# 2. 线性系统的最小二乘解
对任意的 $m\times n$ 实矩阵A和任意向量 $c\in \mathbb{R}^m$ ，一般并不存在向量 $x\in\mathbb{R}^n$ 使得 $Ax=c$ ，因此往往一般求线性系统的最小二乘解(高中应该都学过最小二乘法拟合直线)，即寻求向量 $x\in\mathbb{R}^n$ ，使得 $\mathbb{R}^m$ 中的向量 $Ax$ 和 $c$ 的欧式(Euclid)距离最短。

设 $||\cdot||$ 为 $\mathbb{R}^m$ 中的Euclid范数，有
- 给定 $m\times n$ 阵A和向量 $c\in\mathbb{R}^m$ ，最小化问题，即求向量 $x\in\mathbb{R}^n$ 使得
$||Ax-c||=\mathop{inf}\limits_{y\in\mathbb{R}^n} ||Ay-c||$
至少有一个解。 (这说明了我们只要拿到方程，肯定能找到一个欧氏距离的下界对应的x。为啥是至少呢？因为可能有多个解都取到欧氏距离的下界吧，用哪个都行。)
- 向量 $x\in\mathbb{R}^n$ 满足上述最小化问题当且仅当x是下述线性系统
$A^TAx = A^Tc$
的解。

这就需要投影定理来证明了。首先 $\mathbb R^m$ 的闭子空间意味着存在唯一的向量 $||\tilde{x}-c|| = \mathop{inf}\limits_{\tilde{y} \in Im ~ A}||\tilde{y} - c||$

这个时候 $\tilde{x}$ 就是 c在 $Im A$ 中的投影，他们的差垂直于这个超平面。
(想象一下咱们日常投影的话就是到这个屏幕作垂线然后连接到线和平面的交点嘛)
所以他们的内积为0
因此有对任意的 $\tilde{y} \in Im~ A$ , $(\tilde{x}-c,\tilde{y})_m = 0$

其中 $(\cdot,\cdot)_m$ 表示 $\mathbb{R}^m$ 中的Euclid内积。

因此有
$||Ax-c||=\mathop{inf}\limits_{y\in\mathbb{R}^n} ||Ay-c||$

用内积为0来计算一下，有(利用一下欧式内积 $(x,y) = y^Tx$ ，感谢我还没把殷老师的数学课忘完)

$(Ax-c,Ay)_m = (y^TA^TAx - y^TA^Tc)_m =(A^TAx-A^Tc,y)_n =0$ 
因此 $A^TAx = A^Tc$

# 3. 直和定理
## 3.1. 直交
直交就是正交，就是在内积空间上两个向量满足内积为0 $(x,y) = 0$

X的任何非空子集Z的直交补定义为 X 的子集
$$Z^{\perp}:= \{x\in X; \forall z\in Z,(x,z) = 0\}$$

直交补就是和这个集合里面的所有元素都正交的元素组成的集合。

## 3.2. 直和定理
设X为实或复的Hilbert空间，Y是X的闭子空间，X可以表示为直和
$X=Y \oplus Y^{\perp}$
这里的这个 $\oplus$ 是半价运算，就是取两个集合里面只存在一个集合的元素，都有或都没有的都不取。（就是异或嘛）

所以 $\forall x\in X , x= y+y^{\perp}$ (啊这样的分解是唯一的)

- 简单的证明：
存在性：

取 $y = Px,y\in Y,y^{\perp} = (I-P)x$ ，显然有 $y+y^{\perp} = x$
$(y^{\perp},x) = (x,x) - (Px,x) = 0,y^{\perp}\in Y^{\perp}$

唯一性：
设 $x = y+y^{\perp}=\hat y +\hat y^{\perp}$

$(y - y^{\perp})\in Y,(\hat{y} - \hat y^{\perp})\in Y^{\perp}$ 又有 $Y\cap Y^{\perp} = \{0\}$

所以 $y-\hat y=y^{\perp}-\hat y^{\perp}=0$

- 投影算子
$\forall x\in X, \because Px\in Y, \forall y^{\perp}\in Y^{\perp}$ 有
$(x-P^{\perp}x,y^{\perp})=(Px,y^{\perp}) = 0$
因此 $P^{\perp} := I-P$ 是X到子空间 $Y^{\perp}$ 上的投影算子。