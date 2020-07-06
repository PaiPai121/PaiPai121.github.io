---
layout: post
title: "一维粒子运动"
tag: "量子力学基础"
date: 2015-01-02
categories: 数理基础
---
<!-- TOC -->

- [1. 一维势场粒子运动](#1-一维势场粒子运动)
  - [1.1. 谐振子](#11-谐振子)
    - [1.1.1. 奇异点](#111-奇异点)
    - [1.1.2. 非奇异点](#112-非奇异点)
    - [1.1.3. 升降阶算符](#113-升降阶算符)
- [2. 一维定态的一些基本性质](#2-一维定态的一些基本性质)
- [3. 方势阱](#3-方势阱)
  - [3.1. 无线深](#31-无线深)
  - [3.2. 有限深](#32-有限深)
    - [3.2.1. 两侧](#321-两侧)
  - [3.3. 中间](#33-中间)
  - [3.4. 边界条件](#34-边界条件)
- [4. 投射和反射](#4-投射和反射)
  - [4.1. 方势垒的反射和穿透](#41-方势垒的反射和穿透)
    - [4.1.1. 系数计算](#411-系数计算)
  - [4.2. 方势阱的反射和穿透以及共振](#42-方势阱的反射和穿透以及共振)
- [5. 宇称](#5-宇称)
- [6. 几率流](#6-几率流)

<!-- /TOC -->
# 1. 一维势场粒子运动

## 1.1. 谐振子

势函数

$$V(x) = \frac{1}{2}Kx^2 = \frac{1}{2} m\omega^2_0x^2$$

薛定谔方程

$$i\hbar\frac{\partial}{\partial t} \psi(x,t) = -\frac{\hbar^2}{2m} \frac{\partial^2}{\partial x^2}\psi(x,t)+\frac{1}{2} m\omega^2_0x^2\psi(x,t)$$

依然是分离变量

$$\psi(x,t) = \phi(x)e^{-i\omega t}$$

代回方程，有

$$\hbar\omega\phi(x)=-\frac{\hbar^2}{2m}\frac{d^2\phi(x)}{d x^2}+\frac{1}{2} m\omega^2_0x^2\phi(x)$$

这种问题被称为定态问题，
$E = \hbar\omega$
是微分方程的本征值

### 1.1.1. 奇异点
考虑方程的奇异点
在x趋于无穷的时候有

$$-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}\phi(x)+\frac{1}{2} m\omega^2_0x^2\phi(x) = \lim _{|x|\to \infty}\hbar\omega\phi(x)=0 $$

是二阶常微分方程
解为

$$\tilde{\phi}(x)=exp(\pm \frac{1}{2}\frac{m\omega_0}{\hbar}x^2)$$

### 1.1.2. 非奇异点

之前满足在无穷远处的条件，继续考虑，以

$$\tilde{\phi}(x) = exp(-\frac{1}{2}\frac{m\omega_0}{\hbar}x^2)$$

那么

$$\phi(x)=\tilde{\phi}(x)\chi(x)$$

代回原方程有

$$\frac{\hbar^2}{2m}\chi''(x) - \hbar\omega_0x\chi '(x)+(E-\frac{\hbar\omega_0}{2})\chi(x)=0$$

求其级数解

$$\chi(x) = \Sigma_{n=0}^\infty C_n x^n$$

代回原方程，有递推关系

$$\frac{\hbar^2}{2m} (2C_2 + 6C_3x)+...+n(n-1)C_nx^{n-2}+...)-\hbar\omega_0 x (C_1+2C_2x + ... + nC_nx^{n-1}+...) + (E-\frac{\hbar \omega_0}{2})(\Sigma_{n=0}^\infty C_n x^n)= 0$$

$$(\frac{\hbar^2}{2m}2C_2  +(E-\frac{\hbar \omega_0}{2})C_0   ) + (\frac{\hbar^2}{2m}6C_3 -\hbar\omega_0 xC_1 +(E - \frac{\hbar\omega_0}{2})C_2)x+...+[\frac{\hbar^2}{2m}n(n-1)C_n-\hbar\omega_0x(n-1)C_{n-1}+(E-\frac{\hbar\omega_0}{2})C_{n-2}]+... = 0$$

可以看出递推关系，如果随便区，当x趋于无穷的时候其很可能也会趋于无穷，因此应该使其截断，比如取

$$E_0=\frac{\hbar\omega_0}{2},C_1=0$$

则有
$$C_1=C_2=...=C_n=...=0$$


如果令
$C_0 = 0,C_1=1$
则需要

$$E = E_1=(1+\frac{1}{2})\hbar \omega_0$$

推广有若

$$E_n = (n+1/2)\hbar\omega_0$$

其级数解都会在某一阶截断，成为多项式。因此得到了所有的本征值，而本征函数则是

$$\phi_n(x) =(\frac{\sqrt{m\omega_0/\hbar}}{\sqrt{\pi 2^n n!}})^{1/2} exp(-\frac{1}{2}\frac{m\omega_0}{\hbar}x^2) H_n(\sqrt{\frac{m\omega_0}{\hbar}}x)$$

其中Hn是[厄米多项式](https://baike.baidu.com/item/%E5%9F%83%E5%B0%94%E7%B1%B3%E7%89%B9%E5%A4%9A%E9%A1%B9%E5%BC%8F/11001477?fr=aladdin),其正交归一条件是

$$\int_{-\infty}^{+\infty} \phi^*_m(x)\phi_n(x)dx=\delta_{mn}$$

### 1.1.3. 升降阶算符
正则对易关系有

$$[\hat x,\hat p] = i\hbar$$

使

$$a_{\pm} = \frac{1}{\sqrt{2\hbar m\omega}}(\mp i\hat p+ m\omega  \hat x)$$

哈密尔顿算符有

$$H = \frac{1}{2m}[\hat p^2 +(m\omega \hat x)^2]$$

则一波运算

$$a_-a_+= \frac{1}{\hbar\omega}H +\frac{1}{2},a_+a_-= \frac{1}{\hbar\omega}H -\frac{1}{2}$$

搭配薛定谔方程食用，有

$$\hbar\omega(a_{\pm}a_{\mp}\pm \frac{1}{2})\psi = E\psi$$

你随便算算，就能算得

$$H(a_+\psi) = (E+\hbar\omega)(a_+\psi),H(a_-\psi) = (E-\hbar\omega)(a_-\psi)$$

所以乘这个a可以让能量增加或减少一个阶梯，成为阶梯算符，升阶算符和降阶算符。
不过能量自然不能无限的降低，应该存在一个最低的阶梯使得

$$a_-\psi_0 =0$$

$$\frac{1}{\sqrt{2\hbar m\omega}}(\hbar\frac{d}{dx}+m\omega x)\psi_0=0$$

一阶常微分，你不会解我就怀疑你有没有上过大一。

$$\psi_0 (x)= Ae^{-\frac{m\omega}{2\hbar}x^2}$$

归一化并代入薛定谔方程，求出能量

$$E_0=\frac{1}{2}\hbar\omega$$

~~(之前不确定性原理求出来的为啥不太一样呢？？)~~

# 2. 一维定态的一些基本性质
- 设V是实函数，若ψ(x)是一个解，则ψ*(x)也是一个解，本征值相同。
- 设V是实函数，对任何本征值E都能找到一组实函数解，凡是属于本征值E的任何一个解，都可以表示为这组实函数的叠加。
- 设势函数V有空间反射对称性，满足V(-x)=V(x)，若ψ(x)是一个解，则ψ(-x)也是一个解
- 如果V(x)有空间反射对称性，则对任意一个本征值E，总可以找到方程的一组解，每个都具有确定的宇称，而且任何对应于本征值E的解都可以按照它来展开。
- 对一维空间的定态薛定谔方程，若
$\psi_1(x)$
和
$\psi_2(x)$
是对应于同一个本征值的两个解，则有(C是常数)

$$\psi_1(x)\psi_2'(x) - \psi_1'(x)\psi_2(x)=C$$

- 如果粒子在一维空间中规则的势函数V中运动，其束缚态比如非简并。

# 3. 方势阱
## 3.1. 无线深

![123](/pics/Quan/fsj.png)

{%raw%}
$$
V(x)=
\begin{cases}
    +\infty,&x\le 0;\\
    0,&0\le x\le a;\\
    +\infty,&x\ge a.
\end{cases}
$$
{%endraw%}

那定态薛定谔方程就很好解了，就是个简单的二阶常微分嘛

$$-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}\psi(x)=E\psi(x)$$

解得

$$\psi_1(x) = exp(i\sqrt{\frac{2mE}{\hbar^2}}),\psi_2(x) = exp(-i\sqrt{\frac{2mE}{\hbar^2}})$$

以及边界条件

$$\psi(x)|_{x=0}=\psi(x)|_{x=a}=0$$

取线性组合并代入边界条件并归一化，得到

$$\psi(x) = \sqrt{\frac{2}{a}}\sin(\sqrt{\frac{2mE}{\hbar^2}}x)$$

$$\sqrt{\frac{2mE}{\hbar^2}}a=n\pi$$

## 3.2. 有限深

{%raw%}
$$
V(x)=
\begin{cases}
    0,&-\frac{a}{2}\le x\le \frac{a}{2};\\
    V_0,&|x|\ge \frac{a}{2};
\end{cases}
$$
{%endraw%}

### 3.2.1. 两侧
薛定谔方程有

$$-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}\psi(x)+V_0\psi(x)=E\psi(x)，|x|\ge \frac{a}{2}$$

有

$$\beta = \sqrt{2m(V_0-E)\hbar^2}$$

{%raw%}
$$
\psi(x)=
\begin{cases}
    Ae^{-\beta x},&x\ge \frac{a}{2};\\
    Be^{-\beta x},&x\le- \frac{a}{2};
\end{cases}
$$
{%endraw%}

## 3.3. 中间

$$k=\sqrt{2mE/\hbar^2}$$

$$\psi(x) = C_1e^{ikx}+C_2e^{-ikx}$$

## 3.4. 边界条件

波函数及其导数在x=a/2和x=-a/2连续

稀里哗啦有

$$C_1=\pm C_2$$

若取正号，有

$$\beta = k\tan\frac{ka}{2}$$

还有个我也不知道从哪来的方程

$$\frac{a^2}{4}(\frac{2mE}{\hbar^2}+\frac{2m}{\hbar^2}(V_0-E))=\frac{mV_0a^2}{2\hbar}$$

然后联立就有E了。 ~~（所以到底是tm哪里来的这个方程啊）~~

你慢慢联立吧，能解出来中间的波函数

$$\psi(x)=D\sin kx$$

这是一个奇[宇称](#宇称)的本征函数，因此对两侧的A = -B(是因为整个函数的宇称的奇偶性要保证相同吗??)

( 在一维方势阱中，无论V0多小都有一个偶宇称的束缚态，但是在二维或三维空间不成立。 )

# 4. 投射和反射
## 4.1. 方势垒的反射和穿透

这次是势垒了

{%raw%}
$$
V(x)=
\begin{cases}
    0,&x\le 0;\\
    V_0,&0\le x\le a;\\
    0,&x\ge a.
\end{cases}
$$
{%endraw%}

在左侧x<0和右侧x>a，薛定谔方程有

$$\frac{d^2}{dx^2}\psi(x)+\frac{2mE}{\hbar^2}\psi(x)=0$$

其一般解为

$$\psi(x) = C_1exp(ikx)+C_2exp(-ikx),k=\sqrt{\frac{2mE}{\hbar^2}}$$

exp(ikx)为从左向右传播的行波，exp(-ikx)是从右向左传播的行波，假设

{%raw%}
$$\psi(x) = \begin{cases}
e^{ikx} + R e^{-ikx}&x<0,\\
Se^{ikx} & x>a
\end{cases}$$
{%endraw%}

(这是预设好了波从左向右传播，然后左边有反射波R，右边有透射波S)

[入射流密度](#几率流)是

$$j_in=\frac{\hbar}{2mi}(e^{-ikx}\frac{d}{dx}e^{ikx}-e^{ikx}\frac{d}{dx}e^{0ikx})=\frac{\hbar}{2mi}2ik=\frac{\hbar k}{m} = \frac{p}{m}=v_{in}$$

反射流和透射流密度是

$$j_r = |R|^2v_{in},i_t=|S|^2v_{in}$$

反射系数和透射系数为 ~~(为啥不用S或者S不用T啊)~~

$$\mathcal R = |R|^2,\mathcal{ T}=|S|^2$$


### 4.1.1. 系数计算

在势垒内部

$$\frac{d^2}{dx^2}\psi(x)-\frac{2m}{\hbar^2}(V_0-E)\psi(x)=0,0<x<a$$

若
$0<E<V_0$
则通解为

$$\psi(x) = Ae^{\beta x} + Be^{-\beta x},\beta = \sqrt{\frac{2m(V_0-E)}{\hbar^2}}$$

连续性条件能解出在x=0处

$$A = \frac{1}{2}[(1+\frac{ik}{\beta}) + R(1-\frac{ik}{\beta})],B = \frac{1}{2}[(1-\frac{ik}{\beta})+R(1+\frac{ik}{\beta})]$$

同理在x=a处有

$$A = \frac{S}{2}[1+\frac{ik}{\beta}] e^{ika-\beta a},B = \frac{S}{2}[1-\frac{ik}{\beta}]$$

联立消去A和B有

$$(1+\frac{ik}{\beta}) + R(1-\frac{ik}{\beta}) = S(1+\frac{ik}{\beta}) e^{ika - \beta a}$$

$$(1-\frac{ik}{\beta}) + R(1+\frac{ik}{\beta}) = S(1-\frac{ik}{\beta}) e^{ika + \beta a}$$

再联立消去R有~~(一堆联立消去贼麻烦的)~~

$$\mathcal T = |S|^2=[1+\frac{sh^2\beta a}{(k^2+\beta^2)\sh^2\beta a+4k^2\beta^2}]^{-1}$$

同理有

$$\mathcal R = |R|^2=\frac{(k^2+\beta^2)\sh^2\beta a}{(k^2+\beta^2)\sh^2\beta a+4k^2\beta^2}$$

其和为1 ~~(k和β代进去啊混蛋)~~

所以说几率流守恒，但是由于隧道效应，透射系数不为0。

如果βa远大于1，则T可近似为

$$\mathcal{ T \approx \frac{16E(V_0-E)}{V_0^2}}exp[-\frac{2a}{\hbar}\sqrt{2m(V_0-E)}]$$

如果E>V<sub>0</sub>，则把β替换成iβ'就完事了。

~~(那E<0的情况呢？？？？)~~


## 4.2. 方势阱的反射和穿透以及共振
如果势函数的V_0换成-V_0
~~如果我俩角色互换,我会让你看看什么叫残忍~~

透射系数为

$$\mathcal T = [1+\frac{sh^2\beta a}{4\frac{E}{V_0}(1+\frac{E}{V_0})}]^{-1}$$

在V趋于0的时候反射系数趋于1，不为0的时候反射系数小于1.

在E远小于V的时候，反射系数很小，除了

$$\beta'a=n\pi,n=1,2,3,...$$

时有反射系数为1，是共振隧穿，物理意义为入射粒子在进入势阱后，碰到两侧阱壁时发生反射和投射，如果能量合适，使其波长满足

$$n\lambda'=2a$$

其各次反射后投射出去的波都相位相同，相干叠加，从而使透射波波幅增加。

发生共振投射时，粒子能量为

$$E = E_n = -V_0+\frac{n^2\pi^2\hbar^2}{2ma^2},n=1,2,3,...$$

为共振能级。

# 5. 宇称
[宇称](https://baike.baidu.com/item/%E5%AE%87%E7%A7%B0/101711?fr=aladdin)是描述粒子在空间反演下变换性质的相乘性量子数,引记为P，只有+1和-1两个值。

如果描述某一粒子的波函数在空间反演变换(r→－r)下改变符号，该粒子具有奇宇称(P=－1)，如果波函数在空间反演下保持不变，该粒子具有偶宇称(P=+1)；n个粒子组成的系统的宇称等于这n个粒子宇称之积再乘以这n个粒子之间的n－1个轨道宇称之积；轨道角动量量子数为1时，其轨道宇称为(－1)。玻色子及其反粒子内禀宇称之积为+1；费米子及其反粒子内禀宇称之积为－1。在强互作用和电磁作用过程中宇称守恒，在弱作用过程中宇称不守恒。

# 6. 几率流
[概率流](https://baike.baidu.com/item/%E6%A6%82%E7%8E%87%E6%B5%81/22691802?fr=aladdin)又称为概率通量，是描述概率密度流动的物理量。
假若将概率密度想像为非均匀流体。那么，概率流就是这流体的流率（概率密度乘以速度）。

在量子力学中，定义概率流为

$$J \overset{def}= \frac{\hbar}{2mi}(\psi^*\nabla \psi - \psi \nabla\psi^*) =\frac{\hbar}{m} Im(\psi^*\nabla\psi) $$