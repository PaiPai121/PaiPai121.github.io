---
layout: post
title: "能带计算初试"
tag: "固体物理学"
date: 2018-06-21
categories: 数理基础
---

仿自[知乎皇甫伤逝](https://zhuanlan.zhihu.com/p/94636246)

# 紧束缚模型
![](https://pic4.zhimg.com/80/v2-6c41b83d5bc930b994e4b41c7e9d9b3f_1440w.jpg)

## 晶格常数

$$a_1 = \frac{3a}{2} i + \frac{\sqrt{3}a}{2} j,a_2 = \frac{3a}{2} i - \frac{\sqrt{3}a}{2} j$$

## 倒格矢

$$b_1=\frac{2\pi}{3a}k_x+\frac{2\sqrt 3 \pi}{3a}k_y,b_2=\frac{2\pi}{3a}k_x-\frac{2\sqrt 3 \pi}{3a}k_y$$

## 两个最接近跳跃向量的不等价位点（A和B）~~这块我不懂~~

$$\rho_1 = \frac{a}{2}i +\frac{\sqrt{ 3} a}{2}j,\rho_2 = \frac{a}{2}i -\frac{\sqrt{ 3} a}{2}j,\rho_3 = -ai$$

## 布洛赫状态归一化正交基

Wannier基的傅里叶变换

$$\psi_{nk} (r) = \frac{1}{\sqrt N}\Sigma_l e^{ikl}a_n(r,l)$$

由于a是r-l的函数，只考虑两个不相等的A、B位点，忽略能带指标n，重写布洛赫态，有

$$\phi_1=\frac{1}{\sqrt{ N}}\Sigma_l e^{ik\cdot R_l^A}\phi(r-R_L^A),\phi_2=\frac{1}{\sqrt{ N}}\Sigma_l e^{ik\cdot R_l^B}\phi(r-R_L^B)$$

N是元胞数，R是第J个元胞中A和B的位置矢量。

由于相似的局域化波函数，我们通常使用原子轨道波函数来代替Wannier函数an(r-l)。
出了sp2杂化轨道的σ键，每个碳原子都还有一个pz轨道的Π键，因此使用2pz轨道波函数。整个系统的波函数为

$$\psi(r) = c_1\phi_1+c_2\phi_2 = \frac{1}{\sqrt{ N}}\Sigma_{l,l'}[e^{ik\cdot R_l^A}c_1\phi(r-R_l^A)+e^{ik\cdot R_{l'}^B}c_2\phi(r- R_{l'}^B)]$$

