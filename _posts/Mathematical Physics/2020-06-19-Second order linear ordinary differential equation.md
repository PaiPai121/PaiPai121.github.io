---
layout: post
title: "二阶线性常微分方程与幂级数"
tag: "数学物理方法"
date: 2020-06-19
---
<!-- TOC -->

- [常微分方程](#常微分方程)
  - [二阶线性常微分方程](#二阶线性常微分方程)
    - [常点邻域的解](#常点邻域的解)
    - [奇点邻域的解](#奇点邻域的解)
    - [Bessel 方程的解](#bessel-方程的解)

<!-- /TOC -->
# 常微分方程

## 二阶线性常微分方程
标准形式：
$\frac{d^2\omega}{dz^2} + p(z)\frac{d\omega}{dz}+q(z)\omega = 0$

其中p(z)和q(z)是方程的系数，决定方程的解和解析性。
级数法解微分方程的时候，得到的解总是某一指定点领域收敛的无穷级数。
如果p(z),q(z)在z0解析则z0是方程的常点，否则是奇点

### 常点邻域的解
如果p(z),q(z)在圆$|z-z_0|<R$内单值解析
$\frac{d^2\omega}{dz^2} + p(z)\frac{d\omega}{dz}+q(z)\omega = 0$
$\omega(z_0)=c_0,w'(z_0)=c_1$
有唯一的解w(z)，并且w(z)在圆内单值解析
因此可展开Taylor级数
$\omega(z)=\Sigma_{k=0}^\infty c_k (z-z_0)^k$
其中0次项和1次项的系数与初值c0，c1相等
**例：**求解Legendre方程
$(1-x^2)\frac{d^2y}{dx^2}-2x\frac{dy}{dx} + l(l+1)y=0$
在x=0邻域的解
**解：**
x=0为常点，将
$y = \Sigma_k=0^\infty c_k x^k$
代入方程
有
$(1-x^2)\Sigma_{k=0}^\infty c_kk(k-1)x^{k-2}-2x\Sigma_{k=0}^\infty c_k kx^{k-1}+l(l+1)y=0$
合并有
{%raw%}
$$\Sigma_{k=0}^\infty c_{k+2} (k+2)(k+1)x^k - \Sigma_{k=0}^\infty c_k k (k-1)x^k - \Sigma_{k=0}^\infty 2c_kkx^k+\Sigma_{k=0}^\infty l(l+1)c_kx^k \\
= \Sigma_{k=0}^\infty \{(k+2)(k+1)c_{k+2}-[k(k+1)-l(l+1)]c_k\}x^k = 0$$
{%endraw%}

由于泰勒展开的唯一性

$(k+2)(k+1)c_{k+2}-[k(k+1)-l(l+1)]c_k = 0$
可以获得递推关系
$c_{k+2}=\frac{(k-l)(k+l+1)}{(k+2)(k+1)}c_k$
偶数项
$c_{2n} = \frac{c_0}{(2n)!}(2n-l-2)(2n-l-4)...(-l)\times (2n+l-1)(2n+l-3)...(l+1)$
奇数项
$c_{2n+1}=\frac{c_1}{(2n+1)!}(2n-l-1)(2n-l-3)...(-l+1)\times(2n+l)(2n+l-2)...(l+2)$
此时Legendre方程已解得
可用
$\Gamma(z+1)=z\Gamma(z)$
$\Gamma(z+n+1)=(z+n)(z+n-1)...(z+1)z\Gamma(z)$
化简，有
$c_{2n} = \frac{2^{2n}}{(2n)!}\frac{\Gamma(n-l/2)}{\Gamma(-l/2)}\frac{\Gamma(n+\frac{l+1}{2})}{\Gamma(\frac{l+1}{2})}c_0$
$c_{2n+1} = \frac{2^{2n}}{(2n+1)!}\frac{\Gamma(n-(l-1)/2)}{\Gamma(-(l-1)/2)}\frac{\Gamma(n+1+\frac{l}{2})}{\Gamma(1+\frac{l}{2})}c_1$

$y(x) = c_0y_1(x) + c_1y_2(x)$
其中y1y2分别是奇数函数级数和偶数项函数级数

### 奇点邻域的解

若z0是奇点，则p和q都解析的环形区域$0<|z-z_0|<R$
其两个线性无关解为
$w_1(z) = (z-z_0)^{p_1}\Sigma_{k=-\infty}^\infty c_k(z-z_0)^k$

$w_2(z) = g\omega_1(z)ln(z-z_0) + (z-z_0)^{\rho_2}\Sigma_{k=-\infty}^\infty d_k(z - z_0)^k$

由于有无穷多个负幂项，即使求得递推公式也无法获得表达式，仅在有限负项时可以找出表达式。
可以通过调整$\rho$来使得级数解没有负幂项，称为正则解

取$w_1(z) = (z-z_0)^{p_1}\Sigma_{k=-0}^\infty c_k(z-z_0)^k$
把p和q做Laurent展开

$p(z) = (z-z_0)^{-m}\Sigma_{k=0}^\infty a_k(z-z_0)^k$
$q(z) = (z-z_0)^{-n}\Sigma_{k=0}^\infty b_k(z-z_0)^k$
代入方程有一个挺长的表达式，我懒得写了，直接搞定理

方程
$\frac{d^2\omega}{dz^2} + p(z)\frac{d\omega}{dz}+q(z)\omega = 0$
在奇点z0的邻域$0<|z-z_0|<R$有两个正则解
$w_1(z) = (z-z_0)^{p_1}\Sigma_{k=0}^\infty c_k(z-z_0)^k$

$w_2(z) = g\omega_1(z)ln(z-z_0) + (z-z_0)^{\rho_2}\Sigma_{k=0}^\infty d_k(z - z_0)^k$
的充要条件是z0是方程的正则奇点（p和q的展开有有限个负幂项）。

如果求出了一个解
$\omega_1(z)$
可以通过积分求出另一个解
$\omega_2(z) = A \omega_1(z)\int \{ \frac{1}{[\omega_1(z)]^2} exp[-\int p(\zeta)d\zeta] \}dz$

### Bessel 方程的解
$\frac{d^2y}{dx^2}+\frac{1}{x}\frac{dy}{dx}+(1-\frac{\nu^2}{x^2})y=0$
其中
$Re\nu\ge 0$
x=0是正则奇点
设
$y(x) = x^\rho\Sigma_{k=0}^\infty c_kx^k$
得
$\Sigma_{k=0}^\infty c_k(k+\rho)(k+\rho -1)x^{k+\rho -2}+\Sigma_{k=0}^\infty c_k(k+\rho)x^{k+\rho-2} + \Sigma_{k=0}^\infty c_k x^{k+\rho} - \nu^2\Sigma_{k=0}^\infty c_k x^{k+\rho -2} = 0$
化简得
$\Sigma_{k=0}^\infty c_k[(k+\rho)^2-\nu^2]x^k + \Sigma_{k=0}^\infty c_k x^{k+2} = 0$
比较系数有
$c_0(\rho^2-\nu^2) = 0$
因为c0不为0
$\rho^2-\nu^2=0$
$\rho_1 = \nu,\rho_2 = -\nu$
同理有
$c_1[(\rho + 1)^2 -\nu^2]=0$
有
{%raw%}
$$
\begin{cases}
    c_1 = 0,\rho \neq -1/2 \\
    c_1 任意, \rho = -1/2
\end{cases}
$$
{%endraw%}
对n次项，有
$c_n n(2\rho+n)+ c_{n-2} = 0$
得到递推关系
$c_n = -\frac{1}{n(n+2\rho)}c_{n-2}$
可求得系数表达式
$c_{2n} = \frac{(-1)^n}{n!}\frac{\Gamma(\rho+1)}{\Gamma(n+\rho+1)}\frac{1}{2^{2n}}c_0$

$c_{2n+1}= (-1)^n\frac{\Gamma(3/2)}{\Gamma(n+3/2)}\frac{\Gamma(\rho+3/2)}{\Gamma(n+\rho+3/2)}\frac{1}{2^{2n}}c_1=0$

如果
$\rho = \rho_1 = \nu$
则
$y_1(x) = c_0 x^\nu \Sigma_{k=0}^\infty \frac{(-1)^k\Gamma(\nu+1)}{k!\Gamma(k+\nu+1)}(\frac{x}{2})^{2k}$
可取
$c_0=\frac{1}{2^\nu\Gamma(\nu+1)}$
使其合并
若
$\rho = \rho_2 =\nu$
则
$y_2(x)= c_0 x^{-\nu} \Sigma_{k=0}^\infty \frac{(-1)^k\Gamma(-\nu+1)}{k!\Gamma(k-\nu+1)}(\frac{x}{2})^{2k}$
同理可取
$c_0=\frac{1}{2^\nu\Gamma(-\nu+1)}$

以上都取了c1 = 0，但是
$\rho = -1/2$
时其不一定为0，如果不为0，则
$c_{2n+1}= (-1)^n\frac{\Gamma(3/2)}{\Gamma(n+3/2)\Gamma(n+1)}\frac{1}{2^{2n}}c_1$
所以y2的结果还需要叠加一项
$x^{-1/2}\Sigma_{n=0}^\infty c_{2n+1}x^{2n+1}=c_1\Sigma_{k=0}^\infty\frac{(-1)^n}{n!\Gamma(n+3/2)}(\frac{x}{2})^{2n+1/2}\sqrt{\frac{\pi}{2}}=c_1\sqrt{\frac{\pi}{2}}J_{1/2}(x)$
$J_\nu$
和
$J_{-\nu}$
线性无关时候Bessel方程解得，但是如果
$\nu$
为0（其实为1,2,3...的整数时也是同一个解），则只给出了同一个解
$J_0(x) = \Sigma_{k=0}^\infty \frac{(-1)^k}{k!k!}(\frac{x}{2})^{2k}$

因此第二解还应包括对数项（为什么？？？）
$y_2(x) = gJ_0(x)\ln x+\Sigma_{k=0}^\infty d_k x^k$

带入Bessel方程，使ln x的系数为0，有表达式
$g\Sigma_{k=0}^\infty \frac{(-1)^k}{k!k!}\frac{k}{2^{2k-2}}(\frac{x}{2})^{2k} + \Sigma_{k=0}^\infty d_k k^2 x^k + \Sigma_{k=0}^\infty d_k x^{k+2}=0$
通过比较2k项和2k+1项的系数可以求得dk，最终求得第二解。
流行的做法是取
$g=\frac{2}{\pi},d_0=-\frac{2}{\pi}[\ln 2+\psi(1)]$
其中
$\psi$
是
$\Gamma$
的对数微商。