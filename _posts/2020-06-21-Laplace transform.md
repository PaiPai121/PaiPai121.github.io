---
layout: post
title: "Laplace变换"
tag: "数学物理方法"
date: 2020-06-21
---
<!-- TOC -->

- [1. Laplace变换](#1-laplace变换)
  - [1.1. 基本性质](#11-基本性质)
    - [1.1.1. 线性](#111-线性)
    - [1.1.2. 解析性](#112-解析性)
    - [1.1.3. 反演](#113-反演)
      - [导数反演](#导数反演)
      - [积分反演](#积分反演)
      - [普遍反演](#普遍反演)
      - [卷积定理 ~~(这个不会可以去死了)~~](#卷积定理-s这个不会可以去死了s)

<!-- /TOC -->
# 1. Laplace变换
一种积分变换，将f(t)变换为F(p)~~(可能s更常见)~~
$F(p) = \int_0^\infty e^{-pt}f(t)dt$

## 1.1. 基本性质
### 1.1.1. 线性
   $\mathcal{L}(\alpha_1f_1(t) + \alpha_2f_2(t)) = \alpha_1\mathcal{L}(f_1(t)) + \alpha_2\mathcal{L}(f_2(t))$
### 1.1.2. 解析性
   如果满足Laplace变换存在的充分条件，则
   $|e^{-pt}f(t)|<Me^{-(s-s_0)t},s = Rep$
   当 
   $s-s_0\ge\delta>0$
   时

   $|e^{-pt}f(t)|<Me^{-\delta t}$
   而积分
   $\int_0^\infty Me^{-\delta t}dt$
   收敛
   故
   $\int_0^{\infty}e^{-pt}f(t)dt$
   在
   $Rep \ge s_0 +\delta$
   中一致收敛
   因此F(p)在Re p>s0内解析
### 1.1.3. 反演
   #### 导数反演 
   $F^{(n)}(p)=\frac{d^n}{dp^n}\int_0^\infty f(t)e^{-pt}dt=\int_0^\infty (-t)^nf(t)e^{-pt}dt$
   所以
   $\mathcal{L}((-t)^nf(t))=(\mathcal{L}(f(t)))^{(n)}$
  易得
  若F是有理函数，则总可以通过部分分式求反演
  #### 积分反演
  如果
 
  $\int_p^\infty f(q)dq$
 
  存在，t趋于0时|f(t)/t|有界，则
 
  $\mathcal{L}(\frac{f(t)}{t})=\int_p^\infty F(q)dq $
 
  如果两端积分存在
 
 $\int_0^\infty F(p)dp=\int_0^\infty \frac{f(t)}{t}dt$
  
  **例如**
  $\int_0^\infty \frac{\sin t}{t}dt = \int_0^\infty \frac{1}{p^2+1}dp = \frac{\pi}{2}$
 #### 普遍反演
  $p = s+i\sigma$
  
  若
    1. F(p)在Re p>s0解析
    2. 在Re p>s0中，当|p|趋于无穷的时候，F(p)一致趋于0
    3. 对所有Re p = s > s0，积分
    $\int_{s-i\infty}^{s+i\infty}|F(p)|d\sigma$
    收敛 
  则有F(p)是
  $f(t) = \frac{1}{2\pi i}\int_{s-i\infty}^{s+i\infty}F(p)e^{pt}dp$
  的Laplace变换


  #### 卷积定理 ~~(这个不会可以去死了)~~

  $\mathcal{L}(\int_0^t f_1(\tau)f_2(t-\tau)d\tau) = F_1(p)F_2(p)$
