---
layout: post
title: "线性偏微分方程"
tag: "数学物理方法"
date: 2020-06-23
---
<!-- TOC -->

- [1. 线性偏微分方程解的叠加性](#1-线性偏微分方程解的叠加性)
  - [1.1. 基本性质](#11-基本性质)
  - [1.2. 线性齐次偏微分方程的通解](#12-线性齐次偏微分方程的通解)
    - [1.2.1. L齐次](#121-l齐次)
    - [1.2.2. L 非齐次](#122-l-非齐次)
  - [1.3. 线性非齐次偏微分方程的通解](#13-线性非齐次偏微分方程的通解)
    - [1.3.1. 求特解](#131-求特解)
      - [1.3.1.1. 基本特性](#1311-基本特性)
      - [1.3.1.2. 相关推论](#1312-相关推论)
  - [1.4. 特殊变系数齐次微分方程(待补充)](#14-特殊变系数齐次微分方程待补充)
- [2. 波动方程的行波解](#2-波动方程的行波解)
- [3. 波的耗散和色散](#3-波的耗散和色散)
  - [3.1. 耗散](#31-耗散)
  - [3.2. 色散](#32-色散)

<!-- /TOC -->
# 1. 线性偏微分方程解的叠加性
L为线性算符，将线性偏微分方程统一写为

$$L[u] = f$$

u为未知函数，f为已知函数，是非齐次项。

|方程类型|方程|线性算符L|
|:-:|:-:|:-:|
|波动方程| $\frac{\partial^2u}{\partial t^2}-a^2\nabla^2u=f$ |$L\equiv \frac{\partial^2}{\partial t^2}-a^2\nabla^2$ |
|热传导方程|$\frac{\partial u}{\partial t}- \kappa \nabla^2u=f$|$\frac{\partial }{\partial t}- \kappa \nabla^2$|
|Poisson方程|$\nabla^2 u=f$|$\nabla^2 $|

## 1.1. 基本性质
1. 若u1,u2都是L[u]=0的解，则其线性组合也是齐次方程的解

$$
L[c_1u_1+c_2u_2] = 0
$$

2. 若u1和u2都是L[u] = f的解，则其差一定是相应齐次方程的解

$$L[u_1-u_2]=0$$

3. 若u1、u2分别满足非齐次方程

$$L[u_1]=f_1,L[u_2]=f_2$$

则其线性组合满足非齐次方程

$$L[c_1u_1+c_2u_2] = c_1f_1+c_2f_2$$

## 1.2. 线性齐次偏微分方程的通解

常系数线性齐次偏微分方程的基本形式为

$$A_0\frac{\partial^n u}{\partial x^n}+A_1\frac{\partial^n u}{\partial x^{n-1}\partial y} + ... + A_n\frac{\partial^n u}{\partial y^n} + B_0\frac{\partial^{n-1} u}{\partial x^{n-1}}+...+M\frac{\partial u}{\partial x}+N \frac{\partial u}{ \partial y}+Pu=0$$

即

$$L(D_x,D_y)u=[A_0D_x^n+A_1D_x^{n-1}D_y+ ... + A_nD_y^n + B_0D_x^{n-1}+...+MD_x+N D_y+P]u=0$$


### 1.2.1. L齐次
若L是DxDy的齐次式
$L(D_x,D_y)$
，下方程可以分解为n个线性算符的乘积。

$$[A_0D_x^n+A_1D_x^{n-1}D_y+ ... + A_nD_y^n]u=0$$

即

$$L(D_x,D_y)=A_0(D_x-\alpha_1D_y)(D_x-\alpha_2D_y)...(D_x-\alpha_nD_y)$$

**尝试计算**
取试探解
$u = \phi(y+\alpha x)$
有

$$
D_x^ku = \alpha^k\phi^{(k)}(y+\alpha x)
$$


$$
D_y^ku = \phi^{(k)}(y+\alpha x)
$$


$$
D_x^r D_y^s u = \alpha^r\phi^{(r+s)}(y+\alpha x)
$$

代回原方程有

$$[A_0\alpha^n + A_1\alpha^{n-1}+ ... + A_n]\phi^{(n)}(y+\alpha x) =0$$

则有附加方程

$$A_0\alpha^n + A_1\alpha^{n-1} +...+A_n =0$$

如果解a1a2...互不相等，则通解为

$$u = \phi_1(y+\alpha_1 x)+\phi_2(y+\alpha_2 x)+ ... +\phi_n(y+\alpha_n x)$$

其中
$\phi_i$
是互相独立的任意n次可微函数

若某个
$\alpha$
为n重根，则其对应的为

$$ u = x^{n-1}\phi_1(y+\alpha x) + ... + x\phi_{n-1}(y+\alpha x) + \phi_n(y + \alpha x)$$


**例：**
<span id ="波动方程行波解">求</span>
$\frac{\partial^2 u}{\partial x^2} - a^2 \frac{\partial^2u}{\partial y^2}= 0$
的通解，a为常数

**解：**
令
$u=\phi(y+\alpha x)$
则附加方程
$\alpha^2 - a^2 =0$
的解为
$\alpha = \pm a$
则方程的通解为

$$u = \phi_1(y+a x)+\phi_2(y-ax)$$

### 1.2.2. L 非齐次
一阶偏微分方程

$$(D_x - \alpha D_y -\beta)z = 0$$

如果f(x,y,z)=0是方程的解，必有

$$\frac{\partial f}{\partial x}dx + \frac{\partial f}{\partial y}dy + \frac{\partial f}{\partial z}dz = 0$$

另一方面，有

$$D_xz=-\frac{\partial f/\partial x}{\partial f/\partial z},D_yz=-\frac{\partial f/\partial y}{\partial f/\partial z}$$

将其带入前式，有

$$\frac{\partial f}{\partial x}- \alpha \frac{\partial f}{\partial y} + \beta z \frac{\partial f}{\partial z} = 0$$

将其与原式比较，有

$$\frac{dx}{1}=\frac{dy}{-\alpha}=\frac{dz}{\beta z}$$

称之为<span id = "Lagrange">Lagrange辅助方程组</span>

可以解出

$$y + \alpha x = C,\beta x = \ln z -\ln C'$$


因此通解为 
$z = e^{\beta x}\phi (y+\alpha x)$

<span id = "nonlinear">若有重复性因子</span>，如
$(D_x - \alpha D_y -\beta)^2z = 0$
则通解为
$z = (x+1)e^{\beta x}\phi (y+\alpha x)$

L不是Dx和Dy的齐次式时，如果能将L分解为n个因子，也容易求出通解

**例：**
求
$\frac{\partial^2 u}{\partial x^2}-\frac{\partial^2 u}{\partial x\partial y}-2\frac{\partial^2 u}{\partial y ^2}+ 2\frac{\partial u}{\partial x}+2\frac{\partial u}{\partial y} = 0$
的通解

**解：**

$$(D_x^2-D_xD_y-2D_y^2+2D_x+2D_y)u = (D_x+D_y)(D_x - 2D_y + 2)u = 0$$

其中
$(D_x - 2D_y + 2)u = 0$
的通解为
$u = e^{-2 x}\phi(y+2x)$

而对
$(D_x+D_y)y = 0$
而言
取试探解
$y=\phi(y+\alpha x)$
有附加方程
$\alpha + 1 = 0$
所以
$\alpha = -1$

其通解为

$$y = \phi(x-y)$$

方程的通解为

$$u = \phi(x-y) +e^{-2x}\phi(y+2x)$$

~~不对啊TMD我咋觉得书上算的不对呢~~

## 1.3. 线性非齐次偏微分方程的通解
其通解可分解为<kbd>非齐次方程的任意特解</kbd>+<kbd>齐次方程的通解</kbd>

设方程为

$$L(D_x,D_y)u = f(x,y)$$

其特解可表示为

$$u_0=\frac{1}{L(D_x,D_y)}f(x,y)$$

### 1.3.1. 求特解
#### 1.3.1.1. 基本特性
1. 若
$f(x,y) = e^{ax+b}$
且L不为0，则

$$\frac{1}{L(D_x,D_y)}e^{ax+by} = \frac{1}{L(a,b)}e^{ax+by}$$

理由求偏导公式可以简易证明。

2. 若
$f(x,y) = e^{i(ax+by)}$
则有

$$\frac{1}{L(D_x,D_y)}e^{i(ax+by)} = \frac{1}{L(ia,ib)}e^{i(ax+by)}$$

因此若a和b为实数，且L中的系数也是实数，则有

$$\frac{1}{L(D_x,D_y)}\sin(ax+by)=Im[\frac{1}{L(ia,ib)}e^{i(ax+by)}]$$
以及

$$\frac{1}{L(D_x,D_y)}\cos(ax+by)=Re[\frac{1}{L(ia,ib)}e^{i(ax+by)}]$$

3. 若
$f(x,y) = e^{ax+by}g(x,y)$
则

$$\frac{1}{L(D_x,D_y)}e^{ax+by}g(x,y)=e^{ax+by}\frac{1}{L(D_x+a,D_y+b)}g(x,y)$$

4. 若
$f(x,y) = x^my^n$
则可将
$1/L(D_x,D_y)$
展开为DxDy的幂级数然后求特解

**例：**
求
$(D_x^2-2D_xD_y+D_y^2)u = 12xy$
的通解
**解：**
特解可取
{%raw%}
$$
\begin{aligned}
u_0 &= \frac{12}{(D_x-D_y)^2}xy\\
&=\frac{12}{D_x^2}(1-\frac{D_y}{D_x})^{-2}xy \\
&=\frac{12}{D_x^2}[1+2\frac{D_y}{D_x}+...]xy\\
&=12[y\frac{1}{D_x^2}x+\frac{2}{D_x^3}x]\\
&=12[\frac{1}{6}x^3y+\frac{1}{12}x^4]\\
&=x^4+2x^3y
\end{aligned}
$$
{%endraw%}

其通解可以参考[前文](#nonlinear)
因此本题通解为

$$u = x\phi (y+x)+\phi (y+x) + x^4 + 2x^3y$$

#### 1.3.1.2. 相关推论
**1. 若非齐次项为f(ax+by)，且L是DxDy的齐(n)次式，则**

$$\frac{1}{L(D_x,D_y)}g(n)(ax+by)=\frac{1}{L(a,b)}g(ax+by)$$

**例：**
求解
$\frac{\partial^2 \nu}{\partial x^2}+ \frac{\partial^2\nu}{\partial y^2}= 12(x+y)$

**解：**
符合推论1条件，有

$$\nu_0 = \frac{12}{(D_x^2+D_y^2)}(x+y) = \frac{12}{(1^2+1^2)3!}(x+y)^3 = (x+y)^3$$

**2. 对一般的非齐次项，可通过求解Lagrange辅助方程求解，如**

$$(D_x-\alpha D_y)u = f(x,y$$

其[lagrange辅助方程](#Lagrange)为

$$\frac{dx}{1}= \frac{dy}{-\alpha} = \frac{du}{f(x,y)}$$

由
$dx = dy/(-\alpha)$
得
$y+\alpha x =c$
代入
$dx = du/f(x,y)$
得

$$du = f(x,y)dx = f(x,c-\alpha x)dx,u=\int f(x,c-\alpha x)dx$$

计算出积分后，用
$y + \alpha x$
代替c，即得特解

$$u_0 = \frac{1}{D_x-\alpha D_y}f(x,y) = [f(x,c-\alpha x)dx]_{c=y+\alpha x}$$

**例：**
解
$(2D_x-3D_y)(D_x+D_y)u = 5e^{x-y}$
**解：**
齐次方程通解为
$\phi(y-x)+\psi(2y+3x)$

非齐次方程特解可取

{%raw%}
$$
\begin{aligned}
u_0 &= \frac{5}{(2D_x-3D_y)(D_x+D_y)}e^{x-y}\\
&=\frac{1}{D_x+D_y}[\frac{5}{2-3(-1)}e^{x-y}]\\
&=\frac{1}{D_x+D_y}e^{x-y}\\
&=\int e^{x-(c+x)}dx|_{c=y-x}\\
&=xe^{x-y}
\end{aligned}
$$
{%endraw%}

所以通解为

$$u = xe^{x-y} + \phi(y-x)+\psi(2y+3x)$$

## 1.4. 特殊变系数齐次微分方程(待补充)

# 2. 波动方程的行波解
波动方程

$$\frac{\partial^2 u}{\partial x^2} - a^2 \frac{\partial^2u}{\partial y^2}= 0$$

的通解在[前文](#波动方程行波解)
将其改写为

$$u(x,t)=f(x-at)+g(x+at)$$

这表明波动方程的通解由沿x正向和负向传播的两个波组成。

**求定解问题**
{%raw%}
$$
\begin{aligned}
&\frac{\partial^2 u}{\partial t^2} - a^2\frac{\partial^2 u}{\partial x^2} = 0, -\infty < x < \infty,t>0\\
&u(x,t)|_{t=0} = \phi(x),-\infty<x<\infty\\
&\frac{\partial u}{\partial t}|_{t=0} = \psi(x),-\infty < x <\infty
\end{aligned}
$$
{%endraw%}

**解:**
我们已知方程的通解，现在的问题是如何根据边界条件确定f和g
将通解带入初始条件，得到

$$f(x)+g(x) = \phi(x)$$

以及

$$a[f'(x)-g'(x)]=-\psi(x)$$

将其积分，有

$$f(x)-g(x) = -\frac{1}{a}\int_0^x\psi(\xi)d\xi + C$$

联立有

$$f(x) = \frac{1}{2}\phi(x) - \frac{1}{2a}\int_0^x\psi(\xi)d\xi + \frac{C}{2}$$

以及

$$\phi(x) = \frac{1}{2}\phi(x) + \frac{1}{2a}\int_0^x\psi(\xi)d\xi - \frac{C}{2}$$

将其带回有
{%raw%}
$$
\begin{aligned}
u(x,t) & = f(x-at) + g(x+at)\\
& = \frac{1}{2}\phi(x-at) - \frac{1}{2a}\int_0^{x+at}\psi(\xi)d\xi+\frac{C}{2} +\frac{1}{2}\phi(x) + \frac{1}{2a}\int_0^x\psi(\xi)d\xi - \frac{C}{2}\\
&=\frac{1}{2}[\phi(x-at)+\phi(x+at)] + \frac{1}{2a}\int_{x-at}^{x+at}\psi(\xi)d\xi
\end{aligned}
$$
{%endraw%}

便完成了波动方程的定解问题，称位一维波动方程定解问题的行波解，或d'Alembert解
第一项表示初始唯一激发的行波t=0时波形为
$\phi(x)$
，以后分为相等的两部分独立向左右传播，速度为a；第二项表示由初速度激发的行波，在t=0时在x处速度为
$\phi(x)$
，在t时刻它将左右对称的扩散到[x-at,x+at]的范围，传播速度也是a

# 3. 波的耗散和色散
只考察前节向右传播的波
$u(x,t)=f(x-at)$
，是一阶波动方程

$$\frac{\partial u}{\partial t}+a\frac{\partial u}{\partial x}= 0$$

的解，在此基础上可以进一步包括进方程建立过程中略去的高级项，便可以表现出耗散和色散。
## 3.1. 耗散
首先加上u的二阶偏导

$$\frac{\partial u}{\partial t}+a\frac{\partial u}{\partial x}-\alpha \frac{\partial^2 u}{\partial x^2}= 0$$

谐波形式的解为

$$u(x,t)=\int_{-\infty}^\infty A(k)e^{i(kx-\omega t)}dk$$

代入可以有

$$u(x,t)=\int_{-\infty}^\infty A(k)e^{-\alpha k^2t}e^{ik(x-at)}dk$$

这说明振幅随时间指数衰减
由于衰减因子与k有关，不同k的分量衰减速度不同，因此波的覆盖区间大小不变，但波形不断变化。
## 3.2. 色散
如果加上三次项，有

$$\frac{\partial u}{\partial t}+a\frac{\partial u}{\partial x} + \beta \frac{\partial^2 u}{\partial x^2}= 0$$

如果仍要寻找谐波形式解，波数和角频率一定要满足
$\omega = k(a - \beta k^2)$
因此

$$kx-\omega t = k[x-(a-\beta k^2)t]$$

则解为

$$u(x,t)=\int_{-\infty}^\infty A(k)e^{ik[x-(a-\beta k^2)t]}dk$$

波的传播速率（相速度）为
$v_p = \frac{\omega}{k}=a - \beta k^2$

是k的函数，说明波数不同，传播速度不同，甚至对于
$k^2<a/\beta$
和
$k^2>a/\beta$
的分量，传播方向也不同，因此随着时间增大，覆盖区间也越大，在空间一点上，波的组成成分随着时间变化，即色散
定义另一种传播速率

$$v_g = \frac{d\omega}{dk} = a -3\beta k^2$$

称位群速度，是波包的传播速率，也就是能量的传播速率。


