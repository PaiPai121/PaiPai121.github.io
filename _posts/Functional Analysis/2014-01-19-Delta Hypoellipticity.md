
- [1. 分布](#1-分布)
  - [1.1. 分布的定义](#11-分布的定义)
  - [1.2. 一些分布](#12-一些分布)
- [2. Δ的次椭圆性](#2-δ的次椭圆性)

# 1. 分布

## 1.1. 分布的定义

给定任意函数 $v\in L_{loc}^1(\Omega)$ ，线性泛函

$$T_v:\phi \in \mathcal{D}(n)\to T_v(\phi) : = \int_{\Omega}v\phi dx$$ 

定义 $\Omega$ 上的一个分布，此因对于 $\Omega$ 的任意紧子集 K 以及对任意 $supp~\phi \subset K$ 的函数 $\phi \in\mathcal{D}(\Omega)$ 有

$$|T_v(\phi)| \le ||v||_{L^1(K)} \mathop{sup}\limits_{x\in K} |\phi(x)|$$

分布 $T_v$ 称为与局部可积函数v相应的分布。


（分布好让人费解啊。。。）

## 1.2. 一些分布
************
- 设 $\Omega$ 是 $\mathbb{R}^N$ 中的开子集， $\Omega$ 上的 Schwartz分布是一个线性泛函 $T:\mathcal{D}(\Omega) \to \mathbb{R}$ 且具有性质：
  - 给定 $\Omega$ 的任一紧子集K，存在常数 $\mathcal{C}(K)$ 以及整数 $m(K)\ge 0$ 使得

$$|T(\phi)|\le c(K) \mathop{sup}\limits_{|\alpha|\le m(K),x\in K}|\partial^\alpha\phi(x)|,\forall ~supp ~\phi\subset K的 \phi \in \mathcal{D}(\Omega)$$

$\Omega$ 上所有分布形成的空间记为 $\mathcal{D}' (\Omega)$

****************
线性泛函 $\delta_a :\phi \in \mathcal{D}(\Omega) \to \delta_a (\phi) := \phi(a)$ (a是Ω中的一点)是不与任何局部可积函数相应的分布。因为

$$|\delta_a(\phi)| \le |\mathop{sup}\limits_{x\in K}\phi(x)|$$

对 Ω的任意一个紧子集K和 $supp ~\phi\subset K$ 的任意函数 $\phi \in \mathcal{D}(\Omega)$ 成立，故 $\delta_a$ 是一个分布，称为在点a的Dirac分布，如果a=0就简称dirac分布。
（这狄拉克怎么老是和点过不去？）

************************

# 2. Δ的次椭圆性
（说点题外话，我搜次椭圆性的东西的时候看到了一堆高中数学椭圆，更发现了很多糟糕的疾病治理广告???）

- 解析函数理论中熟知：

设 $\Omega$ 是 $\mathbb{R}^2$ 中的开子集，则任何在 $\Omega$ 中满足 Laplace方程 $\Delta v = 0$ 的函数 $v\in \mathcal{C}^2(\Omega)$ 实际上是解析的。

- 这一结果可以有多方位的推广，它对任何维数，更一般的分布意义、更一般的Possion方程都成立。

*********
设 $\Omega$ 为 $\mathbb{R}^N$ 中的开子集 ，那么对于任何分布 $T\in \mathcal{D'}(\Omega)$ ，如果满足

$$\Delta T =f ~~in~~\mathcal{D}'(\Omega),f\in \mathcal{C}^\infty(\Omega)$$

即满足

$$T(\Delta \phi) = \int_{\Omega} f\phi dx,\forall \phi \in \mathcal{D}(\Omega)$$

是一个函数，属于空间 $\mathcal{C}^\infty (\Omega)$ ，这一性质被称为 Δ的次椭圆性。
********************


**Weyl 引理：** 设 $\Omega$ 是 $\mathbb{R}^N$ 的一个开子集，而 $v\in L_{loc}^1(\Omega)$ 、 $f\in\mathcal{C}^m(\Omega)~~~(m\ge 0且是整数)$  这两个函数满足

$$\int_\Omega v\Delta \phi dx = \int_\Omega f\phi dx,\forall \phi \in \mathcal{ D}(\Omega)$$

则有 $v\in \mathcal{C}^m(\Omega)$ ，所有如果有 $f\in\mathcal{C}^\infty(\Omega)$ ,则 $v\in \mathcal{C}^\infty (\Omega)$


