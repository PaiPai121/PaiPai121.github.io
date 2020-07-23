---
layout: post
title: "算符和表象变换"
tag: "量子力学基础"
date: 2015-01-02
categories: 数理基础
---

# 1. 力学量的算符

Heisenberg 要求一个力学量必须是实验上可观测的。
比如动量，可以表示为
$\hat p = \frac{\hbar}{i}\nabla$
。

当一个经典仪器作用到被观测的量子客体上时,我们称为进行了一次操作(Operation),其目的是要得到标志该客体的状态的一些物理量的数值。
这里有两种情况。一种是在做了第一次测量之后,仪器给出确定的读数。但是再用同样的仪器对同一客体做第二次测量,第三次测量,仪器可能给出确定的然而是不同的读数。这种测量我们称为第一类测量。绝大多数的测量过程属于这一类型。
第二类测量则与之相反:在做了第一次测量之后,仪器给出确定的读数。再用同样的仪器对同一客体做第二次测量,第三次测量时,仪器仍以百分之百的几率给出同一确定的读数。第二种测量被称为可预测的(Predictable),在量子力学中起着极为重要的作用。这种测量过程给出的读数即为标志一个量子客体所处状态的一个力学量。换句话说,第二种测量才是力学量的测量。
如果对于一个态的某一种力学量的测量连续两次给出同一确定数值,我们就称这个态为该力学量的本征态,而对应的读数则称为它的一个本征值。在今后的课程中,我们将以上述的意义理解“力学量”一词的含义。

我们可以假设一
$\psi_n$
是一个力学量，比如就能量吧，其本征态为En。
有一个算符
$\hat H$
是对“能量”这一力学量进行操作的，那么有

$$\hat H \psi_n =E_n\psi_n$$

同理，动量、角动量等力学量所对应的算符及其对应的本征值和本征态也可以这样表示。
特殊的是坐标这一力学量，对它的连续两次测量可能给出不太的读数，这是唯一一个例外。

对于一个量子客体的一个力学量
$\hat Q$
测量所得到的读书的全体
$\{q_n\}$
应该穷尽了所有的可能值。
换句话讲，相应的本征态族
$\{\phi_n\}$
在量子客体所有可能的状态构成的线性空间中应该是完备的。

也就是说

$$\phi = \sum\limits_{n=1}^\infty C_n \phi_n$$

对这样一个态，定义

$$\hat Q \phi = \hat{Q}\sum\limits_{n=1}^\infty C_n \phi_n =\sum\limits_{n=1}^\infty C_n \hat{Q}\phi_n = \sum\limits_{n=1}^\infty C_n q_n\phi_n$$

指导原则是量子力学态应该满足的态叠加原理。而其物理内涵则是与力学量在状态
$\phi$
下的平均值有关的。换句话说,当许多个量子客体在相同的初始条件下被制备出来之后,人们对它们逐一地进行同一力学量的测量,原则上会得到不同的读书。

# 2. 线性空间与线性变换（啊要是线代高代学得好就可以直接跳了吧）

这个是为定义线性算符打基础的。

它是一个集合。在它的元素之间可以定义加法“+”。同时,也可以定义它的一个元素和一个复数的数乘。这些操作之间满足所谓的分配律。一个线性空间中的元素,习惯上称为向量。

## 2.1. 线性算符性质
线性算符具有如下的性质。
1. 
$\hat A = \hat B$
成立,意味着对于任何V中的向量ψ,我们都有
$\hat A\psi=\hat B\psi$。

2. 算符
$\hat I$
称为单位元,若
$\hat I \psi = \psi$
对于V中所有的向量ψ成立。

3. 算符之和定义作
$(\hat A+\hat B)\psi=\hat A \psi+\hat B \psi$

4. 线性算符之积定义作
$(\hat A\hat B)\psi=\hat A(\hat B\psi)$
.一般而言,
$\hat A\hat B≠\hat B\hat A$

在一个有限维线性空间中,我们总可以找到一组线性无关的向量组,从而将一个线性算符写成一个矩阵。但是在一个无限维的线性空间,我们不一定能做到这一点。特别是,算符
$\hat x$
和
$\hat p_x$
不可能写成矩阵的形式。
~~why？？？哦哦有证明的通过对易子~~


## 2.2. 内积

1. 对任何向量
$u\in V$
，有
$(u,u)\ge 0$
仅有u=0时可以取0

2. 
$(u,v)=\overline{(v,u)}$

3. 
$(u,C_1v_1+C_2v_2) = C_1(u,v_1)+C_2(u,v_2)$

4. 
$(C_1u_1+C_2u_2,v) = \overline C_1 (u_1,v) + \overline{ C_2} (u_2,v)$

有限维空间V内积

$$(u,v)=\sum\limits_{n=1}^N \overline{u_n}v_n$$

平方可积函数空间内积

$$(\phi,\psi) = \int_\omega dr \overline{\phi(r)}\psi(r)$$

### 2.2.1. 厄米算符
给定线性算符
$\hat A$
如果有

$$(u,\hat A v)=(\hat B u,v)$$

则称
$\hat B$
是其共轭算符，记作
$\hat A^\dagger$
，如果有
$\hat A^\dagger=\hat A$
则其为厄米算符

1. 如果
$\hat A,\hat B$
是厄米的，那么
$\hat C = \hat A + \hat B$
也是厄米的

2. 如果满足上面条件
$\hat D = \hat A \hat B$
也是厄米的


**例：** 证明动量算符是厄米的


{%raw%}
$$\begin{aligned}
(\phi,\hat p_x \psi) &= \int_{-\infty}^\infty \overline {\phi(x)}(-i\hbar \frac{\partial}{\partial x}\psi(x))dx\\
&= (-i\hbar)\overline{\phi(x)}\psi(x)|_{-\infty}^\infty + \int_{-\infty}^\infty \overline {(-i\hbar \frac{\partial}{\partial x}\phi(x)})\psi(x)dx\\
&=(\hat p_x\phi,\psi)
\end{aligned}$$
{%endraw%}

所以是厄米的

#### 2.2.1.1. 厄米算符定理

1. 一个算符
$\hat A$
是厄米的，当且仅当对任何一个波函数，平均值
$(\psi,\hat A \psi)$
都是实值的

2. 厄米算符的本征值一定是实数。

3. 厄米算符属于不同本征值的本征函数是正交的。

对算符的一个本征值如果只有一个本征态对应，则是非简并的。如果有多个线性无关的本征函数与之对应，则是k重简并的。可以将其schmidt正交化。

量子力学的一个基本假定是,测量某一个力学量时,所有可能用经典仪器读出的值,都是相应的厄密算符的本征值。更精确一点讲,在进行一个确定的测量之前,该体系的波函数是算符的所有的本征函数的一个线性组合。

在做测量时,人们总是读出力学量的一个确定的本征值。在此测量之后,其它测量之前,体系的波函数变到并且保持。形象地讲,测量力学量使得体系的波函数亚“塌缩”到某一个确定的本征函数ψm去了。而相应的展开系数Cm的绝对值的平方Cml2被解释作ψm出现在该位置的几率。值得强调的是,根据上述理论,在波函数塌缩发生以后,再次对于体系重复力学量的测量,将只会得到相同的读数了。

### 2.2.2. 对两个力学量测量

1. 由于Heisenberg测不准原理，两个量不能同时被精确测量，不存在共同本征函数族。

2. 如果
$[\hat A,\hat B]=0$
总可以找到二者的一组共同本征函数族使得
$\hat A\psi_{nm}=\lambda_n \psi_{nm} ,\hat B \psi_{nm} = q_m\psi_{nm}$
同时成立。

#### 2.2.2.1. 例：角动量的测量

$$\hat L = \hat r \times \hat p=\hat r \times (\frac{\hbar}{i}\nabla)$$

由对易算子有

$$[\hat{L}_x,\hat{L}_y]= i\hbar \hat{L}_z,[\hat{L}_y,\hat{L}_z]= i\hbar \hat{L}_x,[\hat{L}_z,\hat{L}_x]= i\hbar \hat{L}_y$$

以及

$$[\hat L^2,\hat{L}_z]=[\hat L_x^2+\hat L_y^2+\hat L_z^2,\hat{L}_z]=0$$

根据刚刚所说的如果两个算符在对易子为0，其有共同的本征函数族，那么
$\hat L^2$
和
$\hat L_z$
满足条件

$$\hat L_z = \hat x\hat p_y - \hat y\hat p_x=\frac{\hbar}{i}(\hat x \frac{\partial}{\partial y} -\hat y \frac{\partial}{\partial x})$$

把对坐标的偏导变换到球坐标系，一通瞎jb楞算有

$$\hat L_z = -i\hbar \frac{\partial}{\partial \phi}$$

$$\hat L_x = i\hbar (\sin\phi\frac{\partial}{\partial\theta} + \ctg \theta \cos \phi\frac{\partial}{\partial \phi})$$

$$\hat L_y = i\hbar (-\cos\phi\frac{\partial}{\partial\theta} + \ctg \theta \sin \phi\frac{\partial}{\partial \phi})$$

继续一通瞎jb猛算，有

$$\hat L^2 = \hat L_x^2 + \hat L_y^2 + \hat L_z^2=-\hbar^2[\frac{1}{\sin\theta}\frac{\partial}{\partial\theta}(\sin\theta\frac{\partial}{\partial\theta})+\frac{1}{\sin^2\theta}\frac{\partial^2}{\partial \phi^2}]$$

是总轨道角动量算符，其本征方程

$$-\hbar^2[\frac{1}{\sin \theta} \frac{\partial}{\partial\theta}
(\sin\theta\frac{\partial}{\partial \theta}) + \frac{1}{\sin^2\theta}\frac{\partial^2}{\partial \phi^2}]\psi(\theta,\phi)=E\psi(\theta,\phi)$$

其有限解（多项式解）尽在
$E = l(l+1)\hbar^2$
成立时存在，为

$$Y_{lm}(\theta,\phi) = (-1)^m\sqrt{\frac{(l-m)!}{(l+m)!}}\sqrt{
    \frac{2l+1}{4\pi}
}
P^m_l(\cos\theta)e^{im\phi},-l\le m\le m
$$

这里的l是总角动量量子数，而且这个狗比函数也是
$\hat L_z$
的本征函数

本征值m被称为磁量子数

然后这个函数族正交归一的，谁爱证谁证吧


## 同一Hilbert空间的基底变换

- 一个给定的量子力学体系的状态应由与之相对应的Hilbert空间L2中函数给出。而任何一个力学量则由定义在这一空间上的一个厄密算符表示。
- 在选取一组确定的基底后,总可以写出该算符的一个矩阵。

用不同的基底构造出来的矩阵表示是如何联系在一起的。

**正交归一基底：**

$$\int_\Omega\overline{\psi_m(r)}\psi_n(r) dr = \delta_{mn}$$

有无穷个，是完备的

基底可以通过正交矩阵联系起来

{%raw%}
$$
\begin{pmatrix}
e_1'\\e_2'
\end{pmatrix}
=\begin{pmatrix}
U_{11}&U_{12}\\U_{21}&U_{22}
\end{pmatrix}
\begin{pmatrix}
e_1\\e_2
\end{pmatrix}
$$
{%endraw%}


[酉正性](https://baike.baidu.com/item/%E5%B9%BA%E6%AD%A3%E7%9F%A9%E9%98%B5/1651000?fromtitle=%E9%85%89%E7%9F%A9%E9%98%B5&fromid=2967660&fr=aladdin)
$$U^\dagger U=UU^\dagger=I$$


**基底联系：**

{%raw%}

$$U=\begin{pmatrix}
U_{11}&U_{12}&...&...\\
U_{21}&U_{22}&...&...\\
...&...&...&...\\
\end{pmatrix}=
\begin{pmatrix}
(\psi_1,\psi_1')&(\psi_2,\psi_1')&...&...\\
(\psi_1,\psi_2')&(\psi_2,\psi_2')&...&...\\
...&...&...&...\\
\end{pmatrix}
$$

{%endraw%}

## 力学量的矩阵表示

如何构造算符的矩阵表示

假设有一组完备基底
$\{\psi_n\}$
，取
$\psi_1$
，将算符作用其上，得到新的态
$\tilde\psi_1=\hat O \psi_1=O_{11}\psi_1+O_{21}\psi_2+...$

同理其他基函数也有。

然后就可以了

{%raw%}

$$\underline O=\begin{pmatrix}
O_{11}&O_{12}&...&...\\
O_{21}&O_{22}&...&...\\
...&...&...&...\\
\end{pmatrix},O_{ij}=(\psi_i,\tilde{\psi}_j)=(\psi_i,\hat O\psi_j)
$$

{%endraw%}

### 一维谐振子的力学量矩阵

$$E\psi(x) = -\frac{\hbar^2}{2m}\frac{d^2\psi(x)}{dx^2}+\frac{1}{2}m\omega_0^2x^2\psi(x)$$

的解为

$$\psi_n(x)=(\frac{\alpha}{\sqrt{\pi}2^nn!})^{1/2}e^{-\frac{1}{2}\alpha^2x^2}H_n(\alpha x),\alpha = \sqrt{\frac{m\omega_0}{\hbar}}$$

任取一个函数然后将算符
$\hat x$
作用其上，得到新的波函数，经过神奇展开，有

$$\tilde{\psi_n}(x)=\frac{1}{\alpha}(\sqrt{\frac{n}{2}}\psi_{n-1}+\sqrt\frac{n+1}{2}\psi_{n+1})$$

比较系数有

{%raw%}

$$\underline x=\frac{1}{\alpha}\begin{pmatrix}
0&\frac{1}{\sqrt 2}&0&0&...\\
\frac{1}{\sqrt{ 2}}&0&\sqrt{\frac{2}{2}}&0&...\\
0&\sqrt{\frac{2}{2}}&0&0&...\\
...&...&...&...&...
\end{pmatrix}
$$

{%endraw%}

## 不同希尔伯特空间中的变换——表象变换

假设有两个空间
$L^2(\Omega)$
和
$L^2(\Omega')$
，其线性变换
$\hat S:L^2(\Omega)\to L^2(\Omega')$
是酉正的。

若

$$(\phi_i,\phi_j)_{\Omega'}=(\hat S \psi_i,\hat S \psi_j)_{\Omega'}=(\psi_i,\psi_j)_\Omega$$

对任意一对态

$$(\phi_i,\phi_j)_{\Omega'}=(\psi_i,\psi_j)_\Omega=\delta_{ij}$$

则称为表象变换
如Ω是实空间，Ω'是动量空间时，这就是从坐标空间到动量空间的表象变换，其实也是傅里叶变换

$$\Phi(p) = \frac{1}{(2\pi\hbar)^{d/2}}\int dr \Phi(r)e^{-\frac{i}{\hbar}p\cdot r}$$

### 狄拉克记号
我们可以在不同的表象中研究同一个量子力学体系。这就使得我们有可能引入一套不依赖于具体表象的抽象符号,以突出该量子力学体系的内涵。

Dirac引入了下面的称之为左矢(bra)和右矢(ket)的记号。
他用
$|\psi>$
表示给定的量子力学体系Hilbert 空间中的一个态,而用
$<\psi|$
表示其复共扼这样,两个态的内积就可记作

$$(\phi,\psi)=<\phi|\psi>$$

$$\overline{<\phi|\psi>} = <\psi|\phi>$$

特例：

$|r>$
为特定坐标r的态，
$|p>$
为给定动量的态，有

$$<r|r'> = \delta(r-r'),<p|p'>=\delta(p-p')$$

~~划重点！！！~~

Dirac规定

$$<r|\Psi> = \Psi(r)$$

是
$|\psi>$
在坐标表象中的波函数
而

$$<p|\Psi> = \Psi(p)$$

是其在动量表象中的波函数。

#### 例：<x|p>的具体表达式

$|p>$
是动量为p的例子态，
$<x|p>$
则应该是其在坐标表象的波函数。

（这个答案我也不知道咋出来的啊）

$$<x|p> = \frac{1}{\sqrt{2\pi\hbar}}exp(\frac{i}{\hbar}px)$$

??????

三维下

$$<r|p> =\frac{1}{({2\pi\hbar})^{3/2}}exp(\frac{i}{\hbar}px)$$


***！！！！！！！！加强理解！！！！！！！！***
p91p85