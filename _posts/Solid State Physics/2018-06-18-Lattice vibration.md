---
layout: post
title: "晶格振动"
tag: "固体物理学"
date: 2018-06-18
categories: 数理基础
---
# 晶格振动
离子实绕平衡位置的热振动导致晶格对理想周期性的偏离，是金属中电子所受散射的主要来源。

## 简谐近似

设离子实任意时刻的位置为

$$R(R_n)= R_n+u(R_n)$$

其中u是对平衡位置的偏离。

如果两个原子间的相互作用势能为
$\phi[R(R_n)-R(R_{n'})]$
则晶体的总使能为

$$V = \frac{1}{2}\Sigma_{R_n,R_n'}\phi[R(R_n) - R(R_{n'}) ]=\frac{1}{2} \Sigma_{R_n,R_n'}\phi[R_n-R_{n'}+u(R_n) - U(R_{n'})],|u(R_n) - U(R_{n'})|\ll|R_n - R_{n'} |$$

可进行泰勒展开，有

$$V = \frac{1}{2}\Sigma_{R_n,R_{n'}}\phi(R_n-R_{n'}) + \frac{1}{2}\Sigma_{R_n,R_{n'}}\cdot \nabla \phi(R_n-R_{n'})+\frac{1}{4}\Sigma_{R_n,R_{n'}}\{[u(R_n)-u(R_{n'}]\cdot\nabla)\}^2\phi(R_n-R_{n'})+...$$

右侧第一项是平衡位置的相互作用能，为常数，可略去，第二项是线性位移项，由于原子处在平衡位置对应于相互作用能的极值而消失，对平衡势能第一个非零的改正项是位移的二次项，仅保留这一项称为简谐近似。
（三次、四次等非简谐项对热传导，热膨胀十分重要）

### 一维原子链，声学支

假定在一维单原子链中每个原子的质量是M，布拉维格子的格矢是R=na，总长L=na，N是元胞总数，a是格点间距，链上任一原子的运动方程为

$$M\ddot u(na) = -\frac{\partial V}{\partial u (na)} $$

其中u(na)是以na为中心振动的原子对平衡位置的偏离。仅考虑最近邻原子间的相互作用，有

$$V =\frac{1}{2}\Sigma_n\frac{d^2\phi(x)}{dx^2}[u(na)-u((n+1)a)]^2$$

解应使得

$$u(na,t) = Ae^{i(qna-\omega t)}$$

$$\omega(q) = \sqrt{\frac{2\beta(1-\cos\alpha)}{M}}=2\sqrt{\frac{\beta}{M}}|\sin\frac{1}{2}qa|$$

这是格波的色散关系
周期性边界条件有

$$e^{iqNa}= 1$$

因此

$$q = \frac{l}{N}\frac{2\pi}{a}$$

在第一布里渊区呈现一个倒屁股的样子

![屁股](/pics/SSP/sesan.png)

在第一布里渊区边界，格波的群速度为0，相当于受布拉格反射形成驻波。

长波极限下

$$aq\ll 1,\omega(q) \approx a\sqrt{\frac{\beta}{M}}|q|$$

把q，ω趋于0的色散关系称为声学模，每一组q，ω称为声学模。

### 一维双原子链，光学支

![屁股](/pics/SSP/doubleatom.png)

色散关系有

![屁股](/pics/SSP/sesan2.png)

每个波矢q对应两个振动模式，共2N格振动模式。

$$\omega_-:q \to 0,\omega\approx(\frac{2\beta}{m+M})^{\frac{1}{2}}|q|,\frac{A}{B}\approx 1$$

是声学支

$$\omega_+:q \to 0,\omega\approx(\frac{2\beta}{\mu})^\frac{1}{2},\frac{A}{B}\approx-\frac{m}{M}$$

其中

$$\mu\equiv \frac{mM}{m+M}$$

为约化质量，这支称为光学支。
如果m和M恰好带相反电荷，这种运动相当于长波长的振荡电偶极矩，可以和同频电磁波有很强的相互作用，导致强烈红外光吸收，因此得名。

### 三维情形
先按下不表


## 简正坐标
由于原子间势能相互关联，最好做正交变换获得简正坐标，化为单体问题。

位置在Rn处的原子在t时刻的位移是

$$u(R_n,t) = \frac{1}{\sqrt{NM}}\Sigma_qQ_qe^{iqR_n}$$

其中简正坐标

$$Q_q=\sqrt{NM}A_qe^{-i\omega t}$$

一大堆乱七八糟有

$$Q_q = \sqrt{\frac{M}{N}}\Sigma_{R_n}u(R_n,t)e^{-iqR_n}$$

是代表N个原子的集体运动，是一种集体坐标。

## 声子

在没写的一堆东西里发现并不完全对应
严格来讲应该通过线性变换引进新的算符，使哈密尔顿量成为不含q和-q交叉项的对角形式。

简正模能量和有


$$\Epsilon = \Sigma_{qs}(n_{qs}+\frac{1}{2})\hbar\omega_s(q)$$

格波的能量是量子化，的这个能量量子叫声子。波矢q在第s支格波处在第nqs激发态，可简单描述为晶体有nqs个波矢为q，s类型的声子，某振动模式从nqs变到nqs+1视为产生一个声子，反之是一个声子湮灭
声子是玻色子，遵从玻色统计，平均占据数有

$$n_s(q)=\frac{1}{e^{\beta\hbar\omega_s(q)}-1},\beta = \frac{1}{k_BT}$$

