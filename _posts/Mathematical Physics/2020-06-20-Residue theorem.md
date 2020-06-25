---
layout: post
title: "留数定理及应用"
tag: "数学物理方法"
date: 2020-06-20
---
<!-- TOC -->

- [留数定理](#留数定理)
  - [计算式](#计算式)
    - [有理函数部分分式处理](#有理函数部分分式处理)
    - [无穷远处的留数](#无穷远处的留数)
- [留数定理的应用](#留数定理的应用)
  - [有理三角函数积分](#有理三角函数积分)
  - [无穷积分](#无穷积分)
  - [含三角的无穷积分](#含三角的无穷积分)
    - [Jordan 引理](#jordan-引理)
  - [实轴有奇点](#实轴有奇点)
  - [多值函数积分](#多值函数积分)

<!-- /TOC -->
# 留数定理
区域G的边界C为分段光滑的简单闭合曲线，除有限个孤立奇点外f(z)在G内单值解析，在G内部连续，C上没有奇点，则
$\oint_Cf(z)dz=2\pi i\Sigma_{k=1}^n res\ f(b_k)$
其中res是f在b处的留数，等于f在b的邻域内Laurent展开中
$(z-b_k)^{-1}$
的系数
## 计算式
若为m阶极点
$a = \frac{1}{(m-1)!}\frac{d^{m-1}}{dz^{m-1}}(z-b)^mf(z)|_{z=b}$


**例：** 求
$\frac{1}{z^2+1}$
在奇点处的留数

**解：**
$z = \pm i$
是一阶极点
$res\ f(\pm i)=\frac{1}{2z}|_{z = \pm i}=\mp \frac{i}{2}$

### 有理函数部分分式处理
$\frac{1}{(z-1)^2(z-2)(z-3)}=\frac{A}{(z-1)^2}+\frac{B}{z-1}+\frac{C}{z-2}+\frac{D}{z-3}$

解得
{%raw%}
$$
\begin{aligned}
A = res \frac{1}{(z-1)(z-2)(z-3)}|_{z=1}=\frac{1}{2}\\

B = res \frac{1}{(z-1)^2(z-2)(z-3)}|_{z=1}=\frac{3}{4}\\

C = res \frac{1}{(z-1)^2(z-2)(z-3)}|_{z=2}=-1\\

D = res \frac{1}{(z-1)^2(z-2)(z-3)}|_{z=3}=\frac{1}{4}
\end{aligned}$$
{%endraw%}
### 无穷远处的留数
$res\ f(\infty)=\frac{1}{2\pi i}\oint_{C'}f(z)dz$
C'为绕无穷远点正向一周的轨道

- 结果上讲,函数f(z)在无穷远点的留数等于在邻域幂级数展开的-1次项的系数加负号。
- 概念上讲，由于-1次项是邻域内幂级数展开的正则部分，因此即使无穷远点不是奇点，其留数也可以不为0，即使是奇点，甚至是一阶极点，也可以为0（为什么？）


# 留数定理的应用
## 有理三角函数积分
做变换
$z=e^{i\theta}$
有
$\sin\theta=\frac{z^2-1}{2iz}$
$\cos\theta=\frac{z^2+1}{2z}$
$d\theta=\frac{dz}{iz}$
相应的积分路径变成z平面的单位圆


**例：** 计算
$I = \int_0^{2\pi}\frac{1}{1+\epsilon \cos\theta}d\theta,|\epsilon|<1$

**解:** 
{%raw%}
$$
\begin{aligned}
  I &= \int_0^{2\pi}\frac{1}{1+\epsilon\cos\theta}d\theta\\
  &=\oint_{|z|=1}\frac{1}{1+\epsilon\frac{z^1+1}{2z}}\frac{dz}{iz}\\
  &=2\pi \Sigma_{|z|<1}res\ {\frac{2}{\epsilon z^2+2z+\epsilon}}\\
  &= 2\pi\frac{2}{2\epsilon z+2}|_{z=(-1+\sqrt{1-\epsilon^2})/\epsilon}\\
  &=\frac{2\pi}{\sqrt{1-\epsilon^2}}
\end{aligned}
$$
{%endraw%}
虽然有两个极点，但是他们的乘积为1，因此一定有一个极点在单位圆外。

## 无穷积分
$I = \int_{-\infty}^\infty f(x)dx$
在复平面上看，这个积分是沿着实轴进行的，要补充路径形成围道
- 补上适当路径形成闭合围道
- 补上的路径上的积分 与无穷积分直接相关;或可以简单计算出来。一般直接补上以原点为圆心，R为班级的上半圆，然后使R趋于无穷。

如果函数满足
- 在上半平面除了有限个孤立奇点外处处解析，实轴无奇点
- 在[0,Π]的范围内，当|z|趋于无穷时zf(z)一致区域0

第一个条件约定原实变积分不是瑕积分，有
$\oint_C f(z)dz = \int_{-R}^Rf(z)dz+\int_{C_R}f(z)fz=2\pi i \Sigma \ res\ f(z)$

第二个条件
$\lim_{x\to\infty}xf(x)=0$
推广有
$\lim_{R\to\infty}\int_{C_R}f(z)dz = 0$
最终有
$\int_{-\infty}^\infty f(z)dx = 2\pi i \Sigma\ res\ f(z)$
**例：**
计算
$I = \int_{-\infty}^\infty\frac{dx}{(1+x^2)^3}$
**解：**
$I=\int_{\infty}^\infty \frac{dx}{(1+x^2)^3} = 2\pi i \ res\ \frac{1}{(1+z^2)^3}|_{z=i}=2\pi i (-\frac{3i}{16})=\frac{8}{3}\pi$

## 含三角的无穷积分
$I = \int_0^\infty f(x)\cos pxdx$
仍然采用半圆围道，但是北极函数不能取f(z)cospz或f(z)sinpz，因为其行为复杂。，一般取
$f(z)e^{ipz}$
如果只有有限个奇点，则
$\oint_Cf(z)e^{ipz}dz=\int_{-R}^Rf(z)e^{ipx}dx + \int_{C_R}f(z)e^{ipz}dz=2\pi i \Sigma_{上半平面} res{f(z)e^{ipz}}$

然后分别求得实部和虚部，即可求得
$I = \int_0^\infty f(x)\cos pxdx$
$I = \int_0^\infty f(x)\sin pxdx$

### Jordan 引理
在 0< arg z < Π的范围内，当|z|趋于无穷时，Q一致趋于0，则
$\lim_{R\to\infty} \int_{C_R}Q(z)e^{ipz}dz=0$
在满足Jordan引理的条件下
$\int_{-\infty}^\infty f(x)e^{ipx}dx=2\pi i \Sigma_{上半平面} res{f(z)e^{ipz}}$

**例：**
计算
$\int_0^{\infty}\frac{x\sin x}{x^2+a^2}dx,a>0$
**解：**
$\int_{-\infty}^\infty\frac{xe^{ix}}{x^2+a^2}dx = \pi i e^{-a}$
所以
$\int_{-\infty}^\infty\frac{x\sin x}{x^2+a^2}dx =\pi e^{-a}$
因此
$\int_{0}^\infty\frac{x\sin x}{x^2+a^2}dx =\frac{1}{2}\pi e^{-a}$

## 实轴有奇点
需要绕开奇点构成闭合积分围道
**例:**
$\int_{-\infty}^\infty\frac{dx}{x(1+x+x^2)}$
**解：**
在x=0不连续，因此用一个半径为δ的小半圆弧跳过奇点
![aaa](/pics/8.1Circle.png)
因此有
{%raw%}
$$
\begin{aligned}
&\ \ \ \ \oint_C\frac{dz}{z(1+z+z^2)}\\&=\int_{-R}^{-\delta}\frac{dx}{x(1+x+x^2)}+\int_{C_{\delta}}\frac{dz}{z(1+z+z^2)}+\int_{\delta}^{R}\frac{dx}{x(1+x+x^2)}+\int_{C_{R}}\frac{dz}{z(1+z+z^2)}\\
&=2\pi i res\frac{1}{z(1+z+z^2)}|_{z=e^{i2\pi/3}}\\
&=-\frac{\pi}{\sqrt{3}}-i\pi
\end{aligned}
$$
{%endraw%}
在δ趋于0 的极限下
$\lim_{\delta\to 0} \int_{C_\delta}\frac{dz}{z(1+z+z^2)} = -\pi i$

$v.p. \int_{-\infty}^\infty\frac{dx}{x(1+x+x^2)} = -\frac{\pi}{\sqrt{3}}$


## 多值函数积分
如
$I = \int_0^{\infty}x^{s-1}Q(x)dx$
s为实数，Q单值，正实轴无奇点
为保证积分收敛，需要
$\lim_{x\to\infty}x x^{s-1}Q(x)dx = \lim_{x\to\infty}x^sQ(x)=0$
相应的复变积分
$\int_0^{\infty}z^{s-1}Q(z)dz = \int_{\delta}^R x^{s-1}Q(x)dx + \int_{C_R}z^{s-1}Q(z)dz+\int_R^\delta(xe^{i2\pi})^{s-1}Q(x)dx+\int_{C_{\delta}}z^{s-1}Q(z)dz$
![aaa](/pics/8.2Circle.png)
如果Q在全平面上除了有限孤立奇点外是单析的，可以应用留数定理
$(1-e^{i2\pi s})\int_0^{\infty}x^{s-1}Q(x)dx=2\pi i \Sigma res\{z^{s-1}Q(z)\}$
所以
$\int_0^\infty x^{s-1}Q(x)dx = \frac{2\pi i}{1-e^{i2\pi s}}\Sigma res\{ z^{s-1}Q(Z)\}$