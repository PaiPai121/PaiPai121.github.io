---
layout: post
title: "Fixed point 不动点定理及应用"
tag: "泛函分析"
date: 2014-01-11
categories: 数理基础
---

- [1. 不动点定理](#1-不动点定理)
  - [Banach  不动点定理](#banach-不动点定理)
- [2. 不动点定理的应用](#2-不动点定理的应用)
  - [2.1. 非线性常微分方程解的存在性](#21-非线性常微分方程解的存在性)
    - [2.1.1. 单摆方程](#211-单摆方程)
  - [2.2. 非线性两点边值问题的(经典)解的存在性](#22-非线性两点边值问题的经典解的存在性)

# 1. 不动点定理
$f:X\to X$ 是集合X到自身的一个映射，不动点就是指满足 $f(x) = x$ 的任意点 $x\in X$

**压缩映射：** $(X,d)$ 是一个距离空间，对映射 $f:X\to X$ 如果存在常数k，使得 $0<k<1$ ,且对任何 $x,y\in X$ 有 $d(f(x),f(y))\le kd(x,y)$ ，则称f为压缩映射。

字面意思理解的话，就是在映射之后两点的距离变短了(0< k < 1)，就是压缩了

---
Banach  不动点定理
---

设 $(X,d)$ 是完备的距离空间，则任何压缩映射 $f:X\to X$ 有且仅有一个不动点 $x\in X$
此外任意给定点 $x_0\in X$ ,由 $x_{n+1} = f(x_n),n\ge 0$ 定义的序列 $(x_n)_{n=0}^\infty$ 在 $n\to\infty$ 时收敛于 $x$，且有

$$||x_n-x||\le Ck^n,n\ge 0, C:=\frac{d(f(x_0),x_0)}{1-k}$$

- 简单的证明

由 $x_{n+1} = f(x_n),n\ge 0$ 定义的序列 $(x_n)_{n=0}^{\infty}$ 对任何的 $p\ge 1$ 有(压缩映射嗷)
$$d(x_{p+1},x_p)\le kd(x_p,x_p-1)\le \dotsb \le k^pd(x_1,x_0)$$
因此对任意的 $m>n\ge 0$ 有
$$d(x_m,x_n)\le \mathop{\sum}\limits_{p=n}^{m-1} d(x_{p+1},x_p)\le (\mathop{\sum}\limits_{p=n}^{m-1} k^p)d(x_1,x_0)\le \\ k^n (\mathop{\sum}\limits_{p=0}^{m-n-1}k^p)d(x_1,x_0)\le \frac{k^n}{1-k}d(x_1,x_0)$$

(用了距离的不等式、前面的不等式以及一个等比数列求和)

所以这是一个Cauchy序列。(对任何正实数r>0 存在一个正整数N使得对所有的整数 $m,n\ge N$ 都有 $d(x_m,x_n)<r$)

完备的空间 $(X,d)$ 存在 $x\in X$ 使 $\lim_{n\to\infty} x_n = x$ ，因此
$$f(x) = \lim_{n\to\infty} f(x_n) = \lim_{n\to\infty} x_{n+1} = x$$

因此x是f的不动点，设 $y\in X$ 也是 f 的一个不动点，则 $d(x,y)=d(f(x),f(y))\le kd(x,y)$ 所以y=x，f有唯一的不动点。

# 2. 不动点定理的应用

## 2.1. 非线性常微分方程解的存在性

**Cauchy-Lipschitz定理(又称皮卡-林德勒夫定理  Picard-Lindelöf Theorem)：** 若 $||\cdot||$ 是 $\mathbb{R}^N$ 上的任意一个范数， $T>0,\bold g\in\mathcal{C}([0,T]\times \mathbb{R}^N;\mathbb{R}^N)$ 是一个映射，且存在常数 $\gamma>0$ 使得 $||g(t,\omega)-g(t,v)||\le\gamma||\omega-v||$ 对一切的 $t\in [0,T],\omega,v\in \mathbb{R}^N$ 成立，又设 $u_0\in\mathbb{R}^N$ 为给定的向量，则初始问题或Cauchy问题

$$u'(t) = g(t,u(t))$$
$$u(0) = u_0$$

有且仅有一个解 $u\in\mathcal{C}^1([0,T];\mathbb{R}^N)$

嗯，简而言之就是是满足条件的常微分方程只有一个解。

****************
推论:

**对某个 $T>0$ ，给定一个矩阵场 $A \in \mathcal{C}([0,T];\mathbb{M}^N)$ 和向量场 $b\in\mathcal{C}([0,T];\mathbb{R}^N)$ ，给定向量 $u_0\in\mathbb{R}^N$ ，则初值问题**

$$u'(t) = A(t)u(t) + b(t),~0\le t\le T$$
$$u(0) = u_0$$

**有且仅有一个解 $u\in\mathcal{C}^1([0,T];\mathbb{R}^N)$**

### 2.1.1. 单摆方程

一个”理想摆“是一个长为 $l$ 的无重量刚性棒，一端可以绕着O点自由转动，质量m集中于另一端，在单摆于垂直面上运动的附加假设下，在时刻t其位置可完全通过O点垂直向下的轴于单摆自身的夹角 $\theta(t)$ 确定，如图所示(百度百科)

![单摆，图源百度](\../../pics/Functional%20Analysis/danbai.png)

可导出牛顿运动方程为 $-mg\sin\theta(t) = ml\theta''(t)$ ，有 $\theta''(t) = -\frac{g}{l}\sin\theta(t)$
初始条件 $\theta(0)=\theta_0,\omega(0)=\omega_0$

证明其有且仅有一个解 $\theta \in \mathcal{C}^\infty ([0,\infty[)$

定义向量场 $u:[0,\infty[ \to \mathbb{R}^2$ 为 $u(t) = (u_i(t))^2_{i=1}$ 

(这里的 $(u_i(t))^2_{i=1}$ 可不是平方，而是 $(x_j)_{j=1}^n$ 里面x取u，n取2，在这里 $u_0,u_1,u_2分别是 \theta,\theta',\theta''$)

其中对所有的 $t\ge 0 ~, u_1(t):= \theta(t),u_2(t):=\theta'(t)$ ，这个向量场 
$$u'(t) = g(t,u(t)),t\ge 0 ~~ u'(0) = u_0$$

向量值函数 $g:[0,\infty]\times\mathbb{R}^2 \to \mathbb R^2$ 定义为
$g(t,\theta):= (\theta_2,-\frac{g}{l}\sin\theta(\theta_1)), (t,\theta)\in [0,\infty[\times \mathbb{R}^2, u_0 :=(\theta_0,\omega_0)$

这个形式和Cauchy-Lipschitz定理的形式一样，又有
$||g(t,\omega) - g(t,v)||_1 = |\omega_2-v_2| + \frac{g}{l}|\sin\omega_1 - \sin v_1|\le max\{1,\frac{g}{l}\}||\omega-v||_1$ 
满足该定理的条件，因此对任意正的T存在唯一的解 $u\in \mathcal{C}^1([0,\infty[;\mathbb{R}^2)$

## 2.2. 非线性两点边值问题的(经典)解的存在性

**经典解** 在I是二阶连续可微在 $\overline{I}$ 上连续的解。 而"弱"解是属于 $L^2(I)$ 且在分布意义下导数也属于 $L^2(I)$ 的解，先不用。

**定理：** 设 $I=]0,1[$ ，函数 $f\in\mathcal{C}(\overline{I}\times \mathbb{R})$ 且存在常数 $\gamma$ 使得 
$0\le\lambda<8,|f(x,u)-f(x,v)|\le \gamma|u-v|$
对一切 $0\le x\le 1,u,v\in\mathbb{R}$ 均成立，$\alpha,\beta\in \mathbb{ R}$ 是常数，则两点边值问题 
$$-u''(x) = f(x,u(x)),0<x<1$$
$$u(0)=\alpha,u(1)=\beta$$
有且仅有一个解 $u\in \mathcal{C}(\overline I)\cap \mathcal{C}^2(I)$

其形式与非线性常微分方程解的存在性的区别是换成了加符号的二阶导数，然后多了一个点，自变量的范围限制在了(0，1)，$\gamma$ 的数值也被限制了。