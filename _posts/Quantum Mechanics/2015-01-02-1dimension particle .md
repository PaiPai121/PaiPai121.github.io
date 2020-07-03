---
layout: post
title: "一维粒子运动"
tag: "量子力学基础"
date: 2015-01-02
categories: 数理基础
---

# 一维势场粒子运动

## 谐振子

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

### 奇异点
考虑方程的奇异点
在x趋于无穷的时候有

$$-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}\phi(x)+\frac{1}{2} m\omega^2_0x^2\phi(x) = \lim _{|x|\to \infty}\hbar\omega\phi(x)=0 $$

是二阶常微分方程
解为

$$\tilde{\phi}(x)=exp(\pm \frac{1}{2}\frac{m\omega_0}{\hbar}x^2)$$

### 非奇异点

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

### 升降阶算符
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

# 一维定态的一些基本性质
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

# 方势阱
## 无线深

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

## 有限深

{%raw%}
$$
V(x)=
\begin{cases}
    0,&-\frac{a}{2}\le x\le \frac{a}{2};\\
    V_0,&|x|\ge \frac{a}{2};
\end{cases}
$$
{%endraw%}

###　两侧
薛定谔方程有

$$-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}\psi(x)+V_0\psi(x)=E\psi(x)，|x|\ge \frac{a}{2}$$

