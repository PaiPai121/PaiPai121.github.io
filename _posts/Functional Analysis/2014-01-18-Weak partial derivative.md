
- [1. $L_{loc}^1(\Omega)$ 中的弱偏导数](#1-l_loc1omega-中的弱偏导数)
  - [1.1. $L_{loc}^1(\Omega)$ 的定义](#11-l_loc1omega-的定义)
  - [1.2. 弱偏导数](#12-弱偏导数)
  - [1.3. 弱偏导数的性质](#13-弱偏导数的性质)

# 1. $L_{loc}^1(\Omega)$ 中的弱偏导数
## 1.1. $L_{loc}^1(\Omega)$ 的定义

设 $\Omega$ 是 $\mathbb{R}^N$ 的开子集，以 $\mathcal{D}(\Omega)$ 表示所有 $\phi:\Omega\to\mathbb{R}$ 的无穷阶可微函数，其支集 $supp ~~~ \phi$ 是 $\Omega$ 的紧子集组成的空间。
那么， $L_{loc}^1(\Omega)$ 表示 **所有这样的可测函数 $v:\Omega\to\mathbb{R}$** 对 $\Omega$ 中任一紧子集 $K$，其 **在K的限制** $v|_{K}\in L^1(K)$ 组成的 **空间** 。


- 设 $\Omega$ 是 $\mathbb{R}^N$ 的开子集， $m\ge 1$ 是整数，而函数 $u\in\mathcal{C}^m(\Omega)$ 是给定的，则
$$\int_\Omega (\partial^\alpha v)\phi dx = (-1)^{|\alpha|}\int_\Omega v\partial^\alpha \phi dx,~~~~~\forall \phi \in \mathcal{D}(\Omega)$$
对每个阶数 $|\alpha|\le m$ 的重指标 $\alpha$ 成立。



- **变分学的基本引理：** 设 $\Omega$ 是 $\mathbb{R}^N$ 的开子集，若一函数 $v\in L_{loc}^1(\Omega)$ 使得 $\int_{\Omega} v\phi dx = 0,~~\forall \phi \in \mathcal{\Omega}$ ，则v=0

啥意思呢，这个 $\mathcal{D}$ 刚才说了是一大堆的无穷阶可微函数，那么如果我一个函数和所有的无穷阶可微函数的乘积的积分都是0，那么我这个函数只能是0函数。



## 1.2. 弱偏导数
给定函数 $v\in L_{loc}^1(\Omega)$ ，如果

$$\int_\Omega v_i\phi dx = -\int _\Omega v\partial_i \phi dx, \forall \phi\in\mathcal{D}(\Omega)$$

一个函数 $v_i\in L_{loc}^1(\Omega)$ 是v在 $L_{loc}^1(\Omega)$ 中关于第i个变量的一阶弱偏导数。

好像和分部积分差不多吼！！

## 1.3. 弱偏导数的性质
- 设 $\Omega$ 是 $\mathbb{R}^N$ 的开子集，给定函数 $v\in L_{loc}^1(\Omega)$ 以及重指标 $\alpha,|\alpha|\ge 1$ ，设函数 $v^\alpha\in L_{loc}^1(\Omega)$ 是v的 $|\alpha|$ 阶弱偏导数，即满足
$$\int_\Omega v^\alpha \phi dx = (-1)^{|\alpha|}\int_{\Omega} v\partial ^\alpha \phi dx$$
则这个弱偏导数是唯一的，并且如果 $v\in\mathcal{C}^{|\alpha|}(\Omega)$ ，则 $v^\alpha=\partial^\alpha v$

**证明**
*******
设 $v^\alpha \in L_{loc}^1(\Omega)$ 及 $\omega^\alpha \in L_{loc}^1(\Omega)$ 使得
$$\int_{\Omega}v^\alpha \phi dx = (-1)^{|\alpha|}\int_{\alpha} v\partial^\alpha \phi dx = \int_{\Omega}\omega^\alpha \phi dx,\forall \phi \in \mathcal{D}(\Omega)$$
所以说就是 $\alpha$ 阶的弱偏导嘛。

由**变分学的基本引理**得到 $v^\alpha = \omega^\alpha$ 
我觉得应该是通过 
$\int_{\Omega}v^\alpha \phi dx - \int_{\Omega}\omega^\alpha \phi dx = \int_{\Omega}(v^\alpha -\omega^\alpha)\phi dx=0$
得到 $(v^\alpha -\omega^\alpha) = 0$ 这样推过来的。
****

然后因为 $v\in\mathcal{C}^{|\alpha|}(\Omega)$ ，有

$$\int_\Omega(\partial^\alpha v)\phi dx = (-1)^{|\alpha|}\int_{\Omega} v\partial^\alpha \phi dx = \int_\Omega v^\alpha \phi dx$$

同理有 $v^\alpha = \partial^\alpha v$

************************

OK证明完成。

- 若 $\int_{\Omega}v\partial_i\phi dx =0,\forall \phi \in \mathcal{D},1\le i\le N$ ，则v的所有一阶弱偏导数在 $L_{loc}^1(\Omega)$ 中为0.
换句话讲，若 $\Omega$ 是 $\mathbb{R}^N$ 中的连通开子集，而函数 $v\in L_{loc}^1(\Omega)$ 使得 
$$\int_{\Omega}v\partial_i\phi dx =0,\forall \phi \in \mathcal{D},1\le i\le N$$
则 $v$ 是一个常函数

啊这，就是对每一个变量函数都不变了呗，那就是常函数了。


**证明**
**************
只需证明函数在 $\Omega$ 中是局部函数

给定任一点 $x\in \Omega,\exists r>0, \overline U \subset \Omega$ ，其中 $U:=B(x;r)$ ，然后设 $(v_\epsilon)_{\epsilon > 0}$ 是给定函数 $v\in L_{loc}^1(\Omega)$ 的正则化族，则存在 $\epsilon_1 = \epsilon_1(U) > 0$ 使得对所有的 $0<\epsilon\le \epsilon_1$

$$\overline U \subset \Omega_\epsilon := {x\in\Omega;dist(x,\mathbb{R}^N - \Omega)>\epsilon}, v_\epsilon \in D(\Omega_\epsilon), ||v_\epsilon - v||_{L^1(U)} \xrightarrow[\epsilon\to 0]{}  0$$

$$\partial_i v_\epsilon (x) = \int_{\Omega} \partial_i \omega_\epsilon (x-y) v(y)dy,\forall x\in\Omega_\epsilon , 1\le i \le N$$

由于对每个 $x\in\Omega_\epsilon$ ，每个函数 $y\in\Omega\to\partial_i\omega_\epsilon (x-y),1\le i\le N$ 都属于空间 $\mathcal{D}(\Omega)$ ，对函数 v 所做的假定意味着对所有的 $0<\epsilon\le \epsilon_1$ 成立

$$\partial_i v_\epsilon (x) =0,\forall x\in B(x;r),1\le i \le N$$

*****************
