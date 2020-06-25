---
layout: post
title: "分离变量法解微分方程"
tag: "数学物理方法"
date: 2020-06-24
---
<!-- TOC -->

- [1. 分离变量法](#1-分离变量法)
  - [1.1. 两端固定的弦的自由振动](#11-两端固定的弦的自由振动)
    - [1.1.1. 分离变量](#111-分离变量)
    - [1.1.2. 求解本征值](#112-求解本征值)
    - [1.1.3. 求特解](#113-求特解)
    - [1.1.4. 叠加](#114-叠加)
    - [1.1.5. 利用本征函数的正交性确定叠加系数](#115-利用本征函数的正交性确定叠加系数)
    - [1.1.6. 解的物理意义](#116-解的物理意义)
    - [1.1.7. 弦的总能量](#117-弦的总能量)
  - [1.2. 矩形区域稳定问题](#12-矩形区域稳定问题)
  - [1.3. 固定弦的强迫振动](#13-固定弦的强迫振动)
  - [1.4. 非齐次边界条件](#14-非齐次边界条件)

<!-- /TOC -->
# 1. 分离变量法
- 分离变量法是偏微分方程定解最常用的方法。

+ 通常解微分方程总是先求出特解，然后由线性无关的特解叠加出通解，然后用定解条件确定叠加系数
+ 对一阶偏微分方程，常化为一阶线性常微分方程组的求解
+ 对二阶及更高阶的偏微分方程，即使求出通解，其中的待定函数也很难根据定解条件求出。
+ 可以先求出满足方程及一部分定解问题的全部特解，再叠加起来，再利用另一部分定界条件求出叠加系数

## 1.1. 两端固定的弦的自由振动

### 1.1.1. 分离变量
其方程和定解条件为
{%raw%}
$$
\begin{cases}
\frac{\partial^2 u}{\partial t^2}-a^2\frac{\partial^2 u}{\partial x^2}=0, & 0<x<l,t>0 \\
u|_{x=0}=0, u|_{x=l}=0,&t\ge0,\\
u|_{t=0}=\phi(x),\frac{\partial u}{\partial t}|_{t=0} = \psi(x),&0\le x \le l
\end{cases}
$$
{%endraw%}

方程和边界条件都是齐次的，而初始条件是非齐次的。
希望特解有分离变量的形式，即

$$
u(x,t)=X(x)T(t)
$$

将u(x,t)代入方程，有

$$X(x)T''(t)=a^2X''(x)T(t)$$

俩高端除以X(x)T(t)，有

$$
\frac{1}{a^2}\frac{T''(t)}{T(t)} = \frac{X''(x)}{X(x)}
$$

左端是t的函数，右端是x的函数，因此若左右相等，比如等于一个与x和t都无关的常数，使其为
$-\lambda$
，则结果可改写成

{%raw%}
$$
\begin{cases}
T''(t) + \lambda a^2T(t)=0\\
X''(x)+\lambda X(x)=0
\end{cases}
$$
{%endraw%}

代入边界条件，有

$$X(0)T(t)=0,X(l)T(t)=0$$

因此有

$$X(0)=0,X(l)=0$$

否则函数恒为0

### 1.1.2. 求解本征值
函数X(x)的常微分方程定解问题称为本征值问题，特点是方程含有一个待定常数
$\lambda$
，而定解条件是一对齐次边界条件。
只有
$\lambda$
取某些特定值时，才能既满足常微分方程，又满足边界条件，称为本征值，相应非零解为本征函数。

如果有解的话，本征值
$\lambda$
必为正数。
(证明见《数学物理方法(吴崇试)》p293)

常微分方程

$$
X''(x)+\lambda X(x)=0$$

的<span class = "常微分方程通解1">通解</span>为

$$X(x)=A\sin \sqrt{\lambda}x + B\cos \sqrt{\lambda} x$$

代入边界条件，有

$$B = 0,A\sin\sqrt{\lambda}t = 0$$

所以有

$$\sqrt{\lambda}l=n\pi,\lambda_n=(\frac{n\pi}{l})^2,n = 1,2,3...$$

相应的本征函数为

$$X_{n}(x)=\sin\frac{n\pi}{l}x$$

可简单取A=1。

### 1.1.3. 求特解

对每一对本征值，应由方程

$$T''(t) + \lambda a^2T(t)=0$$

求出相应的
$T_n(t)$
，即

$$T_n(t)=C_n\sin\frac{n\pi}{l}at+D_n\cos\frac{n\pi}{l}at$$

(仍然利用相同形式的[常微分方程通解](#常微分方程通解1))
由此可以求得满足偏微分方程和边界条件的特解

$$u_n(x,t)=(C_n\sin\frac{n\pi}{l}at+D_n\cos\frac{n\pi}{l}at)\sin\frac{n\pi}{l}x \  (n=1,2,3...)$$

共有无穷多个特解，但一般来讲，单独的任何一个特解很难恰好满足问题中的初始条件。

### 1.1.4. 叠加
如果把全部无穷多特解叠加

$$u(x,t)=\Sigma_{n=1}^\infty(C_n\sin\frac{n\pi}{l}at+D_n\cos\frac{n\pi}{l}at)\sin\frac{n\pi}{l}x$$

只要级数有一定的收敛性，那得到的u依然是满足条件的解，称位一般解。与通解相比，它还满足齐次边界条件。

### 1.1.5. 利用本征函数的正交性确定叠加系数
系数
$C_n$
和
$D_n$
应满足

$$
\Sigma_{n=1}^\infty D_n\sin\frac{n\pi}{l}x=\phi(x)
$$

以及

$$\Sigma_{n=1}^\infty C_n\frac{n\pi}{l}\sin\frac{n\pi}{l}x=\psi(x)  
$$

设
$X(x)=\sin\frac{n\pi}{l}x$
和
$X_m(x)=\sin\frac{m\pi}{l}x$
是分别对应不相等的本征值
$\lambda_n$
和
$\lambda_m$
的本征函数，易得
{%raw%}
$$
\begin{aligned}
&X_n''(x)+\lambda_n X_n(x)=0\\
& X_n(0) = 0,X_n(l) = 0\\
&X_m''(x)+\lambda_m X_m(x)=0\\
& X_m(0) = 0,X_m(l) = 0\\
\end{aligned}
$$
{%endraw%}

分别乘
$X_m(x)$
以及
$X_n(x)$
并相减，积分
有

{%raw%}
$$
\begin{aligned}
(\lambda_n-\lambda_m)&\int_0^lX_n(x)X_m(x)dx\\
=&\int_0^l[X_n(x)X''_m(x)-X_m(x)X_n''(x)]dx \\
= &[X_n(x)X'_m(x)-X_m(x)X_n'(x)]|_0^l=0
\end{aligned}
$$
{%endraw%}

因此本征函数正交 ~~（woc哪个鬼才配出来的，太牛逼了）~~

还可以计算本征函数的模方

$$||X_n||^2 \equiv \int_0^lX^2_n(x)dx=\frac{l}{2}$$

在
$
\Sigma_{n=1}^\infty D_n\sin\frac{n\pi}{l}x=\phi(x)
$
两侧同乘
$\sin\frac{m\pi}{l}x$
并积分，有

{%raw%}
$$
\begin{aligned}
\int_0^l\phi(x)\sin\frac{m\pi}{l}xdx
&=\int_0^l\Sigma_{n=1}^\infty D_n\sin\frac{n\pi}{l}x\sin\frac{m\pi}{l}xdx\\
&=\Sigma_{n=1}^\infty D_n\int_0^l \sin\frac{n\pi}{l}x\sin\frac{m\pi}{l}xdx \\
&= D_m\frac{l}{2}
\end{aligned}
$$
{%endraw%}

所以有
$D_n=\frac{2}{l}\int_0^l\phi(x)\sin\frac{n\pi}{l}xdx$

同样，有

$D_n=\frac{2}{n\pi a}\int_0^l\psi(x)\sin\frac{n\pi}{l}xdx$

### 1.1.6. 解的物理意义
特解

$$u_n(x,t)=(C_n\sin\frac{n\pi}{l}at+D_n\cos\frac{n\pi}{l}at)\sin\frac{n\pi}{l}x=A_n\sin(\omega_nt+\delta_n)\sin k_n x$$

其中
$u_n(x,t)$
是一个主播,
$A_n\sin k_n x$
为弦上各点振幅分布,
$\sin(\omega_nt+\delta_n)$
为相位因子.
整个问题的解是这些驻波的叠加,因此也成为驻波法.

固有频率的最小值
$\omega_1=\frac{\pi}{l}a$
称位基频,其他故有频率都是基频的整数倍.

### 1.1.7. 弦的总能量
- 动能

$$\frac{1}{2}\int_0^l\rho(\frac{\partial u}{\partial t})^2dx$$

- 势能

$$
\frac{1}{2}\int_0^lT(\frac{\partial u}{\partial x})^2dx
$$

所以总能量为

$$E(t)=\frac{1}{2}\int_0^l\rho(\frac{\partial u}{\partial t})^2dx+\frac{1}{2}\int_0^lT(\frac{\partial u}{\partial x})^2dx$$

将解代入,得

$$E(t)= \frac{m\pi^2a^2}{4l^2}\Sigma_{n=1}^\infty n^2[|C_n|^2+|D_n|^2]$$

与时间无关,因此总能量守恒

## 1.2. 矩形区域稳定问题
求解Laplace方程别介问题
设有定解问题
{%raw%}
$$
\begin{aligned}
&\frac{\partial^2 u}{\partial x^2}+\frac{\partial^2 u}{\partial y^2} = 0&,0<x<1,0<y<b\\
&u|_{x=0}=0,\frac{\partial u}{\partial x}|_{x=a}=0&,-\le y\le b\\
&u|_{y=0}=f(x)&,\frac{\partial u}{\partial y}|_{y=b}=0,-\le x\le a
\end{aligned}
$$
{%endraw%}

仍用分离变量法求解

$$u(x,y)=X(x)Y(y)$$

有

$$
\frac{X''(x)}{X(x)}=-\frac{Y''(y)}{Y(y)}
$$

同理有

$$X''(x)+\lambda X(x)=0,Y''(y)-\lambda Y(y)=0$$

由边界条件

$$X(0)Y(y)=0,X'(a)Y(y)=0$$

求解有本征值
$\lambda_n=(\frac{2n+1}{2a}\pi)^2$
和本征函数
$X_n(x)=\sin\frac{2n+1}{2a}\pi x$

相应有

$$Y_n(y)=C_n\sinh \frac{2n+1}{2a}\pi y+D_n\cosh\frac{2n+1}{2a}\pi y$$

特解

$$u_n(x,y)=(C_n\sinh\frac{2n+1}{2a}\pi y+D_n\cosh\frac{2n+1}{2a}\pi y)\sin\frac{2n+1}{2a}\pi x$$

同理可求得叠加的一般解,并根据本征函数正交归一性求得叠加系数.

## 1.3. 固定弦的强迫振动
{%raw%}
$$
\begin{cases}
\frac{\partial^2 u}{\partial t^2}-a^2\frac{\partial^2 u}{\partial x^2}=f(x,t), & 0<x<l,t>0 \\
u|_{x=0}=0, u|_{x=l}=0,&t\ge0,\\
u|_{t=0}=\phi(x),\frac{\partial u}{\partial t}|_{t=0} = \psi(x),&0\le x \le l
\end{cases}
$$
{%endraw%}
与之前相比, 增加了非齐次项.
不妨先求得非齐次方程的一个特解v(x,t)
设
$u(x,t)=v(x,t)+\omega(x,t)$
则
$\omega(x,t)$
是相应齐次方程的解.
所以重点问题就是求这个特解

**例:**
{%raw%}
$$
\begin{cases}
\frac{\partial^2 u}{\partial t^2}-a^2\frac{\partial^2 u}{\partial x^2}=f(x,t), & 0<x<l,t>0 \\
u|_{x=0}=0, u|_{x=l}=0,&t\ge0,\\
u|_{t=0}=\phi(x),\frac{\partial u}{\partial t}|_{t=0} = \psi(x),&0\le x \le l
\end{cases}
$$
{%endraw%}
**解:**
设
$u(x,t)=v(x)+\omega(x,t)$
其中
$v(x)$
可以通过边界条件求出
{%raw%}
$$
\begin{cases}
v''(x)=-\frac{1}{a^2}f(x)\\
v(0)=,v(l)=0
\end{cases}
$$
{%endraw%}

而w(x,t)是齐次偏微分方程的解,也可按过去的方法求出

## 1.4. 非齐次边界条件

**例:**

$$
\begin{cases}
\frac{\partial^2 u}{\partial t^2}-\kappa\frac{\partial^2 u}{\partial x^2}=0, & 0<x<l,t>0 \\
u|_{x=0}=A\sin\omega t, u|_{x=l}=0,&t\ge0,\\
u|_{t=0}=0&0\le x \le l
\end{cases}
$$

**解:**
针对

$$
\begin{cases}
\frac{\partial^2 u}{\partial t^2}-\kappa\frac{\partial^2 u}{\partial x^2}=0, & 0<x<l,t>0 \\
u|_{x=0}=\mu(t), u|_{x=l}=\nu(t),&t\ge0,\\
u|_{t=0}=0&0\le x \le l
\end{cases}
$$
有
设齐次化函数为
$v(x,t)=A(t)x+B(t)$

得到
$B(t)=\mu(t),A(t)=\frac{1}{l}[\nu(t)-\mu(t)]$

因此
$B(t)=A\sin\omega t,A(t)=-\frac{1}{l}A\sin\omega t$

所以

$v(x,t)=A(1-\frac{x}{l})\sin\omega t$

令

$u(x,t)=A(1-\frac{x}{l})\sin\omega t + \omega(x,t)$

则
$\omega(x,t)$
为满足定解问题

$$
\begin{cases}
\frac{\partial^2 \omega}{\partial t^2}-\kappa\frac{\partial^2 \omega}{\partial x^2}=-A\omega(1-\frac{x}{l})\cos\omega t, & 0<x<l,t>0 \\
\omega|_{x=0}=0, \omega|_{x=l}=0,&t\ge0,\\
u|_{t=0}=0&0\le x \le l
\end{cases}
$$

的解
可以按前述方法求得
