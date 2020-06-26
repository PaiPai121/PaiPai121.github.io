---
layout: post
title: "一些常见的数理方程"
tag: "数学物理方法"
date: 2020-06-22
---
<!-- TOC -->

- [1. 弦的横振动方程](#1-弦的横振动方程)
  - [1.1. 基本概念](#11-基本概念)
  - [1.2. 力学方程](#12-力学方程)
- [2. 杆的纵振动方程](#2-杆的纵振动方程)
  - [2.1. 基本概念](#21-基本概念)
  - [2.2. 波动方程](#22-波动方程)
- [3. 热传导方程](#3-热传导方程)
  - [3.1. Fourier定律](#31-fourier定律)
  - [3.2. 热传导方程的推导](#32-热传导方程的推导)
    - [3.2.1. 扩散方程](#321-扩散方程)
- [4. 稳定问题](#4-稳定问题)
  - [4.1. 温度](#41-温度)
  - [4.2. 波动方程](#42-波动方程)
  - [4.3. 静电场](#43-静电场)
<!-- /TOC -->
# 1. 弦的横振动方程
## 1.1. 基本概念
完全柔软的均匀弦，沿水平直线绷紧，然后激发使其在一个平面做小振动。


<img src = "/pics/12.1string.png " width = 300>


取平衡位置为x轴，令一个端点坐标x=0，另一股端点左边x=l
设u(x,t)是坐标为x的弦在t时刻的横向位移，在弦上长为dx的一小段可视为质点。
## 1.2. 力学方程
T为张力，即切向应力，这小段弦在两个端点x和x+dx的力学方程有
  
$$(T\sin\theta_2)_{x+dx}-(T\sin\theta_1)_x = dm \frac{\partial^2 u}{\partial t^2}$$

以及横向

$$(T\cos\theta_2)_{x+dx}-(T\cos\theta_1)_x = 0$$

在小振动的条件下，x+dx与x间任意时刻的横向位移差u(x+dx,t)-u(x,t)与dx相比是一个小量，因此

$$\sin\theta \approx \tan \theta = \frac{\partial u}{\partial x},\cos\theta \approx1$$

弦的各点张力相等

$$(T)_{x+dx}=(T)_x$$

因此

$$\rho dx\frac{\partial^2u}{\partial t^2}=T[(\frac{\partial u}{\partial x})_{x+dx}-(\frac{\partial u}{\partial x})_x] = T \frac{\partial^2 u}{\partial x^2}dx$$

因此有

$$\rho \frac{\partial^2u}{\partial t^2} - T \frac{\partial^2 u}{\partial x^2} = 0$$

定义

$$a = \sqrt{\frac{T}{\rho}}$$

则方程为

$$\frac{\partial^2u}{\partial t^2} - a^2 \frac{\partial^2 u}{\partial x^2}dx = 0$$

此处的a实际上是弦的振动传播速度
可以计算弦的伸长

$$ds - dx = \sqrt{du^2+dx^2}-dx = [\sqrt{1+(\frac{\partial u}{\partial x})^2}-1]dx = O((\frac{\partial u}{\partial x})^2)$$

所以总长近似不变，由Hooke定律，T不随x变化，是常数
如果有外力，设单位长度外力为f。则变为

$$\rho dx\frac{\partial^2u}{\partial t^2}= T \frac{\partial^2 u}{\partial x^2}dx + fdx$$

因此

$$\frac{\partial^2u}{\partial t^2} - a^2 \frac{\partial^2 u}{\partial x^2} = \frac{f}{\rho}$$

# 2. 杆的纵振动方程
## 2.1. 基本概念
一均匀细杆，沿杆长方向做小振动


<img src = "/pics/12.2stick.png" width =400>



对一小段应用Newton第二定律，有

$$dm \frac{\partial^2 u}{\partial t^2}=[P(x+dx,t)-P(x,t)]$$

若密度为ρ，则dm=ρdxS
有

$$\rho\frac{\partial^2u}{\partial t^2}=\frac{\partial P}{\partial x}$$

应力p与应变

$\frac{\partial u}{\partial x}$

成正比
因此有

$$P = E \frac{\partial u}{\partial x}$$

可得杆的纵振动方程

$$\frac{\partial^2u}{\partial t^2} - a^2 \frac{\partial^2 u}{\partial x^2}=0$$

其中

$$a = \sqrt{\frac{E}{\rho}}$$

与弦的横振动偏微分方程形式相同，这类方程统称波动方程。
三维空间中的波动方程为
## 2.2. 波动方程

$$\frac{\partial^2 u}{\partial t^2} - a^2 \nabla^2 u = 0$$

其中

$$\nabla^2 =\nabla \cdot \nabla = \frac{\partial^2}{\partial x^2}+\frac{\partial^2}{\partial y^2}+\frac{\partial^2}{\partial z^2}$$

被称位拉普拉斯算符

# 3. 热传导方程
## 3.1. Fourier定律
用u(x,y,z,t)表示介质内某一点在t时刻的温度，若沿x方向有一定的温度差，则会有热量传递，单位时间通过垂直x方向的单位面积的热量q与温度的空间变化率成正比，即

$$q = -k\frac{\partial u}{\partial x}$$

k为热导率，与介质有关，严格来讲与温度u有关，但在温度变化不大的情况下可以认为无关。负号表示热量由高温流向低温
在三维空间中，有

$$q = -k\nabla u$$

## 3.2. 热传导方程的推导



<img src = "/pics/12.3box.png" width = 400 />



$\Delta t$
时间内沿x方向流入六面体的热量为

$$[-(q_x)_x+(q_x)_{x+dx}]\Delta y\Delta z\Delta t=[(k\frac{\partial u}{\partial x})_{x+dx}-(k\frac{\partial u}{\partial x})_{x}]\Delta y\Delta z\Delta t=k\frac{\partial^2 u}{\partial x^2}\Delta x\Delta y\Delta z\Delta t$$

同理有y方向流入六面体的热量为

$$[-(q_y)_y+(q_y)_{y+dy}]\Delta x\Delta z\Delta t=k\frac{\partial^2 u}{\partial y^2}\Delta x\Delta y\Delta z\Delta t$$

以及z方向流入六面体的热量

$$[-(q_z)_z+(q_z)_{z+dz}]\Delta x\Delta y\Delta t=k\frac{\partial^2 u}{\partial z^2}\Delta x\Delta y\Delta z\Delta t$$

根据能量守恒定律，净流入的热量等于温度升高所需热量，所以有

$$k(\frac{\partial^2 u}{\partial x^2}+\frac{\partial^2 u}{\partial y^2}+\frac{\partial^2 u}{\partial z^2})\Delta x\Delta y\Delta z=\rho\Delta x\Delta y\Delta z \cdot c\cdot \Delta u$$

所以有

$$\frac{\partial u}{\partial t} - \frac{k}{\rho c}\nabla^2 u = 0$$

令
$\kappa =\frac{k}{\rho c}$
为扩散率或温度传导率
则有

$$\frac{\partial u}{\partial t} - \kappa\nabla^2 u = 0$$


若有热量产生，单位时间在单位体积产生的热量为F(x,y,z,t)，应有

$$k\nabla^2u\Delta x\Delta y\Delta z\Delta t + F(x,y,z,t)\Delta x\Delta y\Delta z\Delta t=\rho\Delta x\Delta y\Delta z \cdot c\cdot \Delta u$$

即

$$\rho c\frac{\partial u}{\partial t} - \nabla\cdot(k\nabla u) = F(x,y,z,t)$$

令热流
$j=\rho cu$
则有

$$\frac{\partial j}{\partial t} +\nabla\cdot q = F(x,y,z,t)$$

### 3.2.1. 扩散方程
温度高低是分子热运动激烈程度的反映，而物质浓度的不均匀也会通过分子运动发散物质交换，这种微观机理的相似性决定扩散方程和热传导方程有香死的形式

$$\frac{\partial u}{\partial t} +D\nabla^2 u = f(x,y,z,t)$$

其中u是分子浓度，D是扩散率，f是单位体积该种分子的产率。

# 4. 稳定问题
## 4.1. 温度
温度稳定时，温度分布满足Possion方程

$$\nabla^2 u =-\frac{f}{\kappa}$$

如果f=0则有Laplace方程

$$\nabla^2 u =0$$

## 4.2. 波动方程
同理，如果波动方程的u不随时间变化，也满足Possion方程

$$\nabla^2 u = -\frac{\rho}{\epsilon_0}$$

如果u随时间周期性变化

$$u(x,y,z,t)=v(x,y,z)e^{-i\omega t}$$

则v满足Helmholtz方程

$$\nabla^2 v(x,y,z) + k^2v(x,y,z) = 0$$

其中k=w/a为波数

## 4.3. 静电场
静电场势满足Laplace方程

$$\nabla^2u(x,y,z) =0 $$

