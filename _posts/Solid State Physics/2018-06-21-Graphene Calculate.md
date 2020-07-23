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


from 知乎 [木沉](https://zhuanlan.zhihu.com/p/156684603)

# 周期性与拟周期边界条件
波函数

$$\psi(x)$$

势能函数有周期性
此处对一个简单势能函数

$$V = \cos(x)$$

有微分方程

$$H g(x) = E g(x)$$

其中

$$H = -\frac{1}{2}\partial^2_x + V_{\Gamma}(x),g(x) = \psi(x+2\pi)$$

这是一个二阶的线性微分方程

$$(-\frac{1}{2}\partial_x^2 + V_\Gamma (x))\psi(x)=E_m\psi(x)$$

有

$$\psi''(0)=2(V_\Gamma (0)-E_m) \psi(0)$$

同样有

$$g''(0) = 2(V_\Gamma(0)-E_m)g(0)$$

由于其二阶可积

$$\int |g(x)|^2dx = \int |f(x+2\pi)|^2dx = \int |f(x)|^2dx$$

$$f(x) = c g(x),c = e^{-ikx}$$

所有问题变成了单个周期上的拟周期边界的特征问题

## 拟周期边界特征问题

$$[-\frac{1}{2}\partial^2_x + V_{\Gamma}(x)]\psi(x)=E_m\psi(x),\psi(x+2\pi)=e^{2\pi i k}\psi(x),k\in [-\frac{1}{2},\frac{1}{2}]$$

为第一布里渊区。

使

$$\chi (x) = e^{-ikx}\psi(x)$$

则有

$$[-\frac{1}{2}(ik+\partial_x)^2 + V_{\Gamma}(x)]\chi(x)=E_m\chi(x),\chi(x+2\pi)=\chi(x)$$

转化为了周期边界条件。

## 能量E的计算

在如上的特征值问题中，每个k都有对应的特征值，E(k)构成一系列能带。

在[0,2pi]上等距离剖分

$$y_j = \frac{2\pi(j-1)}{N},X(j) = \chi(y_j)$$

可以利用导数的谱方法离散得到y点上
$\chi (x)$
的导数近似。

对每一个k，都有一个特征向量X满足

$$X(j) = \chi(y_j)$$

所以若要求E(k)，只需要求

$$Ax = \lambda x$$

并不需要真的算出来矩阵A，只需要给出x->Ax的计算过程。其实就是薛定谔方程的求两次对x偏导再加上V(x)

之前我们有k的范围是[-0.5,0.5]，现在依次求出特征值就行。



# 代码
## 导数算子的离散谱

由导数的谱方法有

```python
import numpy as np
from numpy import pi
def Diff_Spectral(X,N):
    '''导数算子的谱离散'''
    frequency = np.append(1j*np.arange(0,N/2+1),1j*np.arange(-N/2+1,0))
    y = np.fft.ifft(np.fft.fft(X)*frequency)
    return y
```

我们测试一下

```python
## 测试一下
test_x = np.linspace(0,2*pi,N)
test_y = np.sin(test_x)

test_dy = Diff_Spectral(test_y,N)

plt.plot(test_x,np.cos(test_x))
plt.plot(test_x,test_dy)
plt.show()
```

![](/pics/SSP/BandCal/testdiff.png)

还可以吼！！

## 微分算子的有限维离散

```python
def Operator_Dis(X,k_momen,N):
    """微分算子，k应该就是我们能带的E(k)里面的k了，这个应该就是求导在求导？"""
    stencil = np.linspace(0,2*pi,N+1)
    stencil = stencil[:-1]
    momentum = 1j*k_momen*X+Diff_Spectral(X,N)  # ki + partial_x X
    momentum = 1j*k_momen*momentum + Diff_Spectral(momentum,N) # ki * partial_x X + partial&2_x X
    y = -1/2*momentum + np.cos(stencil)* X # -1/2 partial^2_x X + V(x) X
    return y
```

其实就是前面那一项

$$[-\frac{1}{2}(ik+\partial_x)^2 + V_{\Gamma}(x)]$$

## 计算特征值

这里存在一个问题，就是如何计算函数的特征值

```python
def CalEnergy():
    N = 2e6
    k_momens = np.linspace(-0.5,0.5,N+1)

    res = np.zeros([8,len(k_momens)])# 保存八个特征值

    for i in range(len(k_momens)):
        
        tmp = np.linalg.eig(lambda x:Operator_Dis(x,k_momens[i],N),N,N,'LM')
        tmp.sort()
        res[:][i] = tmp[:8]
```
