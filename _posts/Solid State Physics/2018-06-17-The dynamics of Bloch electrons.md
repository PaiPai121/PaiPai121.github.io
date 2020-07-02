---
layout: post
title: "布洛赫电子动力学"
tag: "固体物理学"
date: 2018-06-17
categories: 数理基础
---

# 电子运动半经典模型

布洛赫态电子波函数

$$\psi_{nk}(r)=e^{ik\cdot r}u_{nk}(r)$$

证明其有平均速度（速度期望值）

$$v_n(k)=\frac{1}{\hbar}\nabla_k\epsilon_n(k)$$

将布洛赫态波函数代入，有

$$v_n(k) = \frac{1}{m}<\psi_{nk}(r)|\hat p|\psi_{nk}(r)>=\frac{1}{m}\int u_{nk}^*(r)(\hat p+\hbar k)u_{nk}(r)dr$$

~~用宏观的考虑一下，狄拉克符号求得动量的期望，然后p=mv？~~

布洛赫电子的薛定谔方程有

$$(\frac{(\hat p+\hbar k)^2}{2m}+V(r))u_{nk}(r)=\epsilon_n(k)u_{nk}(r)$$

左右对k求梯度，再左乘u*<sub>nk</sub>，有

$$\nabla_k\epsilon_n(k)\int u_{nk}^*(r)u_{nk}(r)dr + \epsilon_n(k)\int u_{nk}^*(r)\nabla_ku_{nk}(r)dr$$

一通胡乱相消，有

$$v_n(k)=\frac{1}{\hbar}\nabla_k\epsilon_n(k)$$

## 模型表述

1. 能带指标n是常数，忽略带间跃迁
2. 电子的速度

$$v_n(k)=\frac{1}{\hbar}\nabla_k\epsilon_n(k)$$

3. 波矢k随时间的变化

$$\hbar \dot k = -e[E(r,t)+v_n(k)\times B(r,t)]$$

(k和k+G等价)

（模型合理性就不写了，查书吧）

## 有效质量
**电子加速度**

$$\dot v = \frac{\partial}{\partial t}[\frac{1}{\hbar}\nabla_k\epsilon(k)] = \frac{1}{\hbar}\nabla_k[\frac{1}{\hbar}\nabla_k\epsilon(k)]\frac{\hbar\partial k}{\partial t}=\frac{1}{\hbar^2}\nabla_k\nabla_k\epsilon(k)\cdot F_{ext}$$

和牛顿方程相比，可引入电子的有效质量张量

$$[\frac{1}{m^*}]_{ij} = \frac{1}{\hbar^2}\frac{\partial^2\epsilon_n(k)}{\partial k_i\partial k_j}$$

由于微商可换序，这是对称张量。晶体的点群对称使张量的独立分量数减少。通常通过使坐标轴于主轴方向使之对角化。
有

$$\frac{1}{m^*_\alpha} = \frac{1}{\hbar^2}\frac{\partial^2\epsilon_n(k)}{\partial k_\alpha^2},\alpha = x,y,z$$

对简单立法晶体紧束缚近似下的s能带，有

$$\epsilon(k)=\epsilon_s-J_0-2J_1(\cos k_x a+\cos k_y a+\cos k_z a)$$

在带底，k=(0,0,0)有效质量为

$$m_x^*=m_y^*=m_z^*=m^*=\frac{\hbar^2}{2aJ_1}$$

在带顶，
$k = (\pm\frac{\pi}{a},\pm\frac{\pi}{a},\pm\frac{\pi}{a})$

因此有<span id = "m*">负的有效质量</span>

$$m_x^*=m_y^*=m_z^*=m^*=-\frac{\hbar^2}{2aJ_1}$$

## 半经典模型适用范围
1. 外场波长远大于晶格常数a
2. 外场频率满足
$\hbar \omega \ll \epsilon_g$

3. 
![](/pics/SSP/breakdown.png)

电场击穿可忽略

$$eEa\ll \frac{[\epsilon_g(k)]^2}{\epsilon_F}$$

磁场击穿可忽略

$$\hbar \omega_c \ll\frac{[\epsilon_g(k)]^2}{\epsilon_F}$$


# 恒定电场下的运动
在电场E下，半经典运动方程为

$$\hbar\dot k=-eE$$

其解为

$$k(t) = k(0)-\frac{eEt}{\hbar}$$

对自由电子，如果k增加，电子不断被加速，但是由于散射，加速有限。

![](/pics/SSP/blochk.png)

在一维能带中，如果点乘方向是k不断增加，在k=0时候，有效质量大于0 ，加速，在布里渊区边界，有效质量小于0 ，k增加时速度反而减小。
电子在k空间循环运动，速度周期性改变，意味着在实空间位置的振荡。直流电场产生交变电流称位布洛赫震荡。

## 满带不导电
所有电子贡献为

$$J = (-e)\int_{occ}v(k)\frac{dk}{4\pi^3}$$

由于对称占据，满带状态不改变。

## 近满带的空穴

同样有电流密度

$$J + (-e)\int_{unocc}v(k)\frac{dk}{4\pi^3} = 0$$

只不过积分只涉及未占据态

可以等效为+e粒子的占据态。称为空穴。



粒子速度为

$$\dot v(k) = \frac{1}{m^*}(-e)[E+v_n(k)\times B]$$

由于未占据态一般在带顶，[m*是负的](#m*)，所以

$$\dot v(k) = \frac{1}{|m^*|}(e)[E+v_n(k)\times B]$$


## 恒定磁场下的运动

$$\dot r = v(k)=\frac{1}{\hbar}\nabla_k\epsilon(k)$$

$$\hbar \dot {\bold{k}} = (-e)v(\bold k)\times \bold B$$

用磁场方向单位矢量B叉乘两侧，有

$$\frac{d}{dt}r_\perp = -\frac{\hbar}{eB}\hat B \times \frac{d}{dt}k$$

其中
$r_\perp$
是实空间位置矢量在垂直磁场方向的投影，积分后有

$$r_\perp(t)-r_\perp(0) = -\frac{\hbar}{eB}\hat{\bold{B}}\times[k(t)-k(0)]$$

因此电子在实空间的轨道可以由k空间轨道绕磁场轴旋转90°，并乘以因子得到。

沿着磁场方向有

$$z(t)=z(0)+\int_0^t v_z(t)dt , v_z=\frac{1}{\hbar}\frac{\partial \epsilon}{\partial k_z}$$

对自由电子，vz是常数，对布洛赫电子，vz不一定不变。

波矢的变化总是
1. 垂直B
2. 垂直v

因此电子沿着垂直B的平面和等能面的交线运动，对自由电子，等能面为球形，交线为圆。
![](/pics/SSP/Mag.png)


圆周运动周期为

$$T = \frac{\oint dk}{dk/dt}=\frac{2\pi \hbar k }{evB}=\frac{2\pi m}{eB}$$

有效回旋质量有

$$m^*_c=\frac{\hbar^2}{2\pi}\frac{\partial}{\partial \epsilon}A(\epsilon,k_z)$$



## 简易能带

![能带](/pics/SSP/energyband.png)


1. 如果电子恰好填满能量低的一系列能带，能量再高的各带都是空的，由于满带不导电，这是非导体
2. 如果能量最高的满带和空带之间的带隙较小，0~2eV左右，则是半导体，在T=0K时是觉远的，但是在有限温度下满带(价带)顶部的电子收到热激发，进入空带(导带)，从而有一定的导电能力。

对本征半导体，导带中电子密度nc和价带中空穴密度pv有

$$n_c(T)=p_v(T)$$

其中

$$n_c(T)=\int_{\epsilon_c}^\infty g_c(\epsilon)\frac{1}{e^{\epsilon-\mu}/k_BT+1}d\epsilon$$


$$p_v(T)=\int^{\epsilon_v}_{-\infty} g_v(1-(\epsilon)\frac{1}{e^{\epsilon-\mu}/k_BT+1}d\epsilon)=\int^{\epsilon_v}_{-\infty} g_v(\epsilon)\frac{1}{e^{\epsilon-\mu}/k_BT+1}d\epsilon$$

经过一堆计算有

$$\mu =\frac{\epsilon_c+\epsilon_v}{2}+\frac{1}{2}k_BT\ln\frac{P_v}{N_c}$$

化学势在禁带的中间附近。

3. 对绝缘体，满带和空带的间隙极大(>>5eV)，0K以上仍然是绝缘体，

