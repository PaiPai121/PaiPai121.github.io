---
layout: post
title: "级数与函数展开"
tag: "数学物理方法"
date: 2020-06-18
---
<!-- TOC -->

- [级数](#级数)
  - [复数级数](#复数级数)
    - [收敛性](#收敛性)
  - [函数级数](#函数级数)
    - [收敛性](#收敛性-1)
      - [定义法](#定义法)
      - [Weierstrass判别法](#weierstrass判别法)
  - [幂级数](#幂级数)
    - [Abel 第一定理](#abel-第一定理)
  - [含参积分](#含参积分)
    - [定理1](#定理1)
    - [定理2](#定理2)
- [解析函数的展开](#解析函数的展开)
  - [Taylor展开](#taylor展开)
    - [常见展开](#常见展开)
  - [Laurent 展开](#laurent-展开)

<!-- /TOC -->


# 级数

## 复数级数

### 收敛性

Cauchy充要条件：给定任意$\epsilon>0$，存在正整数n使任意p有
$|u_{n+1}+...+u_{n+p}|< \epsilon$

在不改变求和次序的前提下科研将收敛技术并项，如
$u_1+u_2+u_3+u_4+...=(u_1+u_2)+(u_3+u_4)+...$
如果级数$\Sigma_{n=0}^\infty|u_n|$收敛，则级数$\Sigma_{n=0}^\infty u_n$绝对收敛

**比较判别法** 若
$|u_n|<v_n$
而
$\Sigma_{n=0}^\infty v_n$
收敛，则
$\Sigma_{n=0}^\infty|u_n|$
收敛
若
$|u_n|>v_n$
而
$\Sigma_{n=0}^\infty v_n$
发散，则
$\Sigma_{n=0}^\infty|u_n|$
发散


**比值判别法** 若
$|\frac{u_{n+1}}{u_n}|<1$
则
$\Sigma_{n=0}^\infty u_n$
绝对收敛，若大于1则发散

**d'Alembert判别法** 如果
$\lim_{n\to \infty}|u_{n+1}/u_n|<1$
则
$\Sigma_{n=0}^\infty u_n$
收敛
如果
$\lim_{n\to \infty}|u_{n+1}/u_n|>1$
则
$\Sigma_{n=0}^\infty |u_n|$
发散

**Cauchy判别法** 如果
$\lim_{n\to\infty}|u_n|^{1/n}<1$
则
$\Sigma_{n=0}^\infty |u_n|$
收敛
如果
$\lim_{n\to\infty}|u_n|^{1/n}>1$
则
$\Sigma_{n=0}^\infty u_n$
发散

**绝对收敛级数性质**
1. 科研交换次序
2. 可以拆成绝对收敛的子级数
3. 绝对收敛级数的积仍然是绝对收敛级数

## 函数级数
### 收敛性
#### 定义法
对于任意
$\epsilon>0$
存在与z无关的
$N(\epsilon)$
，当
$n>N(\epsilon)$
时，
$|S(z)-\Sigma_{k=1}^\infty u_k(z)|<\epsilon$
，则在G内一致收敛
#### Weierstrass判别法
若在区域G内
$|u_k(z)|<a_k$
,
$a_k$
与z无关而且
$\Sigma_{k=1}^\infty a_k$
收敛，则
$\Sigma_{k=1}^\infty u_k(z)$
在G内绝对且一致收敛

## 幂级数

### Abel 第一定理
如果
$\Sigma_{n=0}^\infty c_n(z-a)^n$
在z0收敛，则在a为圆心，
$|z_0-a|$
为半径的圆内绝对收敛，圆内一致收敛。

## 含参积分
### 定理1
若
1. f(t,z)是t和z的连续函数，
   $t\in [a,b] ,z\in G$
2. 对[a,b]中任意t，f(t,z)是单值解析函数
   
则 
$F(z)=\int_a^b f(t,z)dt$
解析，且
$F'(z)=\int_a^b\frac{\partial f(t,z)}{\partial z}dt$

### 定理2
若
1. f(t,z)是t和z的连续函数，
   $t > a ,z\in G$
2. 对任意t满足
   $a\le t$
    ，f(t,z)是单值解析函数
3. 积分
   $\int_a^\infty f(t,z)dt$
    在G一致收敛
   
则 
$F(z)=\int_a^b f(t,z)dt$
解析，且
$F'(z)=\int_a^b\frac{\partial f(t,z)}{\partial z}dt$

# 解析函数的展开
## Taylor展开
f(z)在以a为圆心的圆C解析，对圆内任意z点
$f(z) = \Sigma_{n=0}^\infty a_n (z-a)^n$
其中
$a_n = \frac{1}{2\pi i}\oint_C\frac{f(\zeta)}{(\zeta-a)^{n+1}}d\zeta=\frac{f^{(n)}(a)}{n!}$
逆时针方向
### 常见展开
$e^z = 1+ z+\frac{z^2}{2!}+...+\frac{z^n}{n!}+...$
$\sin z = \frac{e^{iz}-e^{-iz}}{2i}=\Sigma_{0}^\infty \frac{(-1)^n}{(2n+1)!}z^{2n+1}$
$\cos z = \frac{e^{iz}+e^{-iz}}{2}=\Sigma_{0}^\infty \frac{(-1)^n}{(2n)!}z^{2n}$
$\frac{1}{1-z}=\Sigma_{n=0}^\infty z^n$

## Laurent 展开
f(z)在以b为圆心的环形区域$R_1\le|z-b|\le R_2$单值解析，则对环域内任何z点，f(z)可幂级数展开为
$f(z) = \Sigma_{n=-\infty}^\infty a_n(z-b)^n, R_1<|z-b|<R_2$
其中 $a_n = \frac{1}{2\pi i}\oint_C\frac{f(\zeta)}{(\zeta-b)^{n+1}}d\zeta$