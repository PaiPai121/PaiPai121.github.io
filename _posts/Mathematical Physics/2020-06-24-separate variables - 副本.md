---
layout: post
title: "正交曲面坐标系"
tag: "数学物理方法"
date: 2020-06-25
---

# 正交曲面坐标系

对不同问题常考虑不同的坐标系，如对圆形区域，首选平面极坐标，对圆柱形区域，首选柱坐标系，对球形，则首选球坐标系，对这些坐标系进行概括，可定义曲面坐标系
$x^1,x^2,x^3$

其中

$$x^1=\xi(x,y,z),x^2 = \eta(x,y,z),x^3 = \zeta(x,y,z)$$

它的坐标面是三组曲面~~噢我有点不太了解的亚子~~

$$x^1=常数,x^2 = 常数,x^3 = 常数$$

空间任意点坐标x1x2x3由过该点的三个坐标面决定，为保证相互独立，要求Jacobi行列式

{%raw%}
$$\frac{\partial(x^1,x^2,x^3)}{\partial(x,y,z)} \equiv 
\begin{vmatrix}
    \frac{\partial x^1}{\partial x} & \frac{\partial x^1}{\partial y} &
\frac{\partial x^1}{\partial z}\\
\frac{\partial x^2}{\partial x} & \frac{\partial x^2}{\partial y} &
\frac{\partial x^2}{\partial z}\\
\frac{\partial x^3}{\partial x} & \frac{\partial x^3}{\partial y} &
\frac{\partial x^3}{\partial z}
\end{vmatrix}
$$

{%endraw%}

对于空间中任意一点，如果过该点的三个坐标面总是相互垂直，则称位正交曲面坐标系。

更常用的方法是计算出弧长

{%raw%}
$$
\begin{aligned}
ds^2 &= dx^2+dy^2+dz^2\\
&=(\frac{\partial x}{\partial x^1}dx^1+\frac{\partial x}{\partial x^2}dx^2 + \frac{\partial x}{\partial x^3}dx^3)^2\\
&+(\frac{\partial y}{\partial x^1}dx^1+\frac{\partial y}{\partial x^2}dx^2 + \frac{\partial y}{\partial x^3}dx^3)^2\\
&+(\frac{\partial z}{\partial x^1}dx^1+\frac{\partial z}{\partial x^2}dx^2 + \frac{\partial z}{\partial x^3}dx^3)^2\\
&=\Sigma_{i,j=1,2,3}g_{i,j}dx^idx^j
\end{aligned}
$$
{%endraw%}

其中

$$g_{ij} = g_{ji} = \frac{\partial x}{\partial x^3}\frac{\partial x}{\partial x^j} + \frac{\partial y}{\partial x^i}\frac{\partial y}{\partial x^j} + \frac{\partial z}{\partial x^i}\frac{\partial z}{\partial x^j}$$

如果

$$g_{ij} = g_{ii}\delta_{ij}$$

则称此为正交曲线坐标系，gij构成的矩阵称为度规

## 柱坐标系

$$x = r \cos\theta,y=r\sin\theta,z=z$$

因此柱坐标系的弧长有

$$ds^2=dx^2+dy^2+dz^2=dr^2+r^2d\theta^2+dz^2$$

有

$$g_{11}=1,g_{22}=r^2,g_{33}=1$$

所有柱坐标系是正交曲面坐标系。
（那个条件好像其实就是矩阵g是对角阵）

## 球坐标系

$$x = r\sin\theta\cos\phi,y = r\sin\theta\sin\phi,z=r\cos\theta$$

同理有

$$ds^2 = dr^2+r^2d\theta^2 + r^2 \sin^2\theta d\phi^2$$

也是正交曲面坐标系

# 正交曲面坐标系的Laplace算符

## 外微分法则

### 外微分算符

算符d作用在标量函数上

$$d:f\to df = \Sigma\frac{\partial f}{\partial x^i}dx^i$$

得到的df称为一次微分形式。

如对柱坐标系

$$du = \frac{\partial u}{\partial r}dr+\frac{\partial u}{\partial \theta}d\theta +\frac{\partial u}{\partial z}dz$$

对球坐标系

$$du = \frac{\partial u}{\partial r}dr+\frac{\partial u}{\partial \theta}d\theta +\frac{\partial u}{\partial \phi}d\phi$$

### 运算法则

1. 
$$df = \Sigma_i\frac{\partial f}{\partial x^i}dx^i = \Sigma_i\frac{\partial f}{\partial y^i}dy^i$$

一次微分形式给出的是梯度的协变微分形式。


2. 若有p次微分

$$\alpha = \Sigma \alpha_Idx^I$$

则

$$d\alpha = d(\Sigma_I\alpha_Idx^I) = \Sigma_i\Sigma_I\frac{\partial \alpha_I}{\partial x^i}dx^i \wedge dx^I$$

其中

$$dx^I\equiv dx^{i_1}\wedge dx^{i_2}\wedge dx^{i_3}...\wedge dx^{i_p}$$


$$dx^i\wedge dx^j \equiv -dx^j\wedge dx^i,dx^i\wedge dx^i=0$$

3. 设α是p次微分，β和γ是q次微分
{%raw%}
$$
\begin{aligned}
d(\beta+\gamma) = d\beta + d\gamma\\
d(\alpha\wedge\beta) = (d\alpha)\wedge\beta + (-)^p\alpha\wedge(d\beta)\\
d(d\alpha) = 0
\end{aligned}
$$
{%endraw%}

4. "*"是一个线性变换，把p次微分变换为n-p次微分

$$*dx^i=\frac{\sqrt{\det G}}{g_{ii}}dx^I$$

$$*dx^I = \frac{-g_{ii}}{\sqrt{\det G}}dx^i$$

其中(i,I)构成(1,2,3)的[偶排列](https://baike.baidu.com/item/%E5%A5%87%E6%8E%92%E5%88%97/18881587?fr=aladdin)(逆序数为偶数的排列称为偶排列)

$$*1=\sqrt{\det G}dx^1\wedge dx^2\wedge d x^3$$

$$*(\sqrt{\det G}dx^1\wedge dx^2\wedge d x^3)=1$$

## 正交坐标系下的Laplace算符

*d*d是Laplace算符
$\nabla^2$
的协变微分形式

如柱坐标系下

$$*d*du=\frac{1}{r}\frac{\partial}{\partial r}(r\frac{\partial u}{\partial r})+\frac{1}{r^2}\frac{\partial^2 u}{\partial \theta^2}+\frac{\partial^2 u}{\partial z^2}$$

那么Laplace算符在柱坐标系下

$$\nabla^2=\frac{1}{r}\frac{\partial}{\partial r}(r\frac{\partial }{\partial r})+\frac{1}{r^2}\frac{\partial^2 }{\partial \theta^2}+\frac{\partial^2 }{\partial z^2}$$

## Laplace算符平移、转动和反射不变性

在直角坐标系下
平移不变性显而易见。
关于坐标轴取向

{%raw%}

$$
\begin{bmatrix}
    x\\y\\z
\end{bmatrix}=
\begin{bmatrix}
    a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}
\end{bmatrix}
\begin{bmatrix}
    x'\\y'\\z'
\end{bmatrix}
$$

{%endraw%}

如果矩阵A是正交变换，则laplace算符形式不变

~~爷不证了~~

(绕固定轴旋转的旋转矩阵是正交的)
绕过原点的任意轴转动，Laplace算符都不变

空间反射：x' = -x,y'=-y,z'=-z下也是不变的

## 圆形区域
定解问题

{%raw%}
$$
\begin{aligned}
\frac{\partial^2u}{\partial x^2}+\frac{\partial^2 u}{\partial y^2}=0,x^2+y^2 < a^2,\\
u|_{x^2+y^2=a^2} = f
\end{aligned}
$$
{%endraw%}

方程虽然能分离变量，但是边界条件不能分离变量，因此可以改成极坐标

$$\frac{1}{r}\frac{\partial}{\partial r} + \frac{1}{r^2}\frac{\partial^2 u}{\partial \phi^2} = 0,0<r<a\\
u|_{r=a} = f(\phi)$$

可以令

$$u(r,\phi)=R(r)\Phi(\phi)$$

代入方程，有

$$\frac{1}{r}\frac{d}{dr}(r\frac{dR}{dr})\phi+\frac{R}{r^2}\frac{d^2\Phi}{d\phi^2}=0$$

$$\frac{r}{R}\frac{d}{dr}(r\frac{dR}{dr})=-\frac{1}{\phi}\frac{d^2\Phi}{d\phi^2}=\lambda$$


可以<span id = "原方程">分离变量</span>

$$r\frac{d}{dr}(r\frac{dR}{dr})-\lambda R = 0$$

$$\frac{d^2\Phi}{d\phi^2}+\lambda\Phi = 0$$

但是对于边界条件仍然不能分离变量。
这是由于变换到极坐标系时并不等价。(比如极角在0到2pi的十分偏导无定义)

应当补充周期条件

$$u(r,\phi)|_{\phi =0}=u(r,\phi)|_{\phi=2\pi}$$

以及

$$\frac{\partial u(r,\phi)}{\partial \phi}|_{\phi =0}=\frac{\partial u(r,\phi)}{\partial \phi}|_{\phi=2\pi}$$

所以有

$$\Phi(0) = \Phi(2\pi),\Phi'(0)=\Phi'(2\pi)$$

原方程通解为

$$\Phi(\phi) = A\sin\sqrt \lambda \phi+B\cos\sqrt \lambda \phi $$

代入周期边界条件有

$$B= A\sin\sqrt \lambda 2\pi+B\cos\sqrt \lambda 2\pi,
A= A\cos\sqrt \lambda 2\pi-B\sin\sqrt \lambda 2\pi  $$

其有非0解的充要条件([齐次线性方程组有非0解](https://baike.baidu.com/item/%E9%BD%90%E6%AC%A1%E7%BA%BF%E6%80%A7%E6%96%B9%E7%A8%8B%E7%BB%84/2225933?fr=aladdin))是

$$2(\cos\sqrt\lambda 2\pi -1)=0$$

可求得本征值

$$\lambda_{m}=m^2,m=1,2,3,4....$$

对于一个本征值，有两个本征函数

$$\Phi_{m1} (\phi) = \sin m \phi.\Phi_{m2}(\phi)=\cos m \phi$$


然后再去求[原方程的解](#原方程)
使用t=ln r做变量替换，有

$$\frac{d}{dt}=r\frac{d}{dr}$$

则原方程变为常系数常微分方程

$$\frac{d^2R}{dt^2}-\lambda R =0$$

当特征值为0时，通解为

$$R_0(r) = C_0+D_0t=C_0+D_0\ln r$$

当不为0时候，为

$$R_m(r) = C_me^{mt}+D_me^{-mt}=C_mr^m+D_mr^{-m}$$

则全部特解为

{%raw%}
$$
\begin{aligned}
u_0(r,\phi) &= C_0+D_0\ln r\\
u_(m1)(r,\phi) &= (C_{m_1}r^{m_1}+D_{m_1}r^{-m_1})\sin m \phi\\
u_(m_2)(r,\phi) &= (C_{m_2}r^{m_2}+D_{m_2}r^{-m_2})\cos m \phi
\end{aligned}
$$
{%endraw%}

叠加起来可得一般解，同时考虑有界条件，使得ln和指数函数的系数为0（否则r=0时候酱趋于无穷）

然后可以通过分离变量法标准做法或傅里叶变换求出系数。

## Helmholtz方程在柱坐标系下分离变量

$$\nabla ^2 u + k^2 u = 0$$

在柱坐标系中为

$$\frac{1}{r}\frac{\partial u}{\partial r}(r\frac{\partial u}{\partial r})+\frac{1}{r^2}\frac{\partial^2 u}{\partial \theta^2}+\frac{\partial^2 u}{\partial z^2}+k^2u=0$$

涉及三个自变量，可以先分离一个

$$u(r,\theta,z)=v(r,\theta)Z(z)$$

然后再

$$v(r,\theta) = R(r)\Theta(\theta)$$

此处不抄了。

