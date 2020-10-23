---
layout: post
title: "Set and Mapping 集合与映射"
tag: "泛函分析"
date: 2014-01-01
categories: 数理基础
---
- [1. 集合](#1-集合)
    - [1.1. ZF集合论](#11-zf集合论)
        - [1.1.1. ZF集合论的公理](#111-zf集合论的公理)
        - [1.1.2. ZF集合论的推论](#112-zf集合论的推论)

- [2. 映射](#2-映射)
  - [2.1. 特征函数](#21-特征函数)
  - [2.2. 映射的一些性质](#22-映射的一些性质)
# 1. 集合
---
## 1.1. ZF集合论
Zermelo-Fraenkel 集合论是数学中最常用的公理化集合论，含选择公理时常简写为ZFC，不含选择公里时则简写为ZF。
### 1.1.1. ZF集合论的公理
- 1. 同一律（外延公理）：两个集合相等的充分必要条件是它们具有相同的元素，即

$$\forall X \forall Y [X = Y\Leftrightarrow \forall z(z\in X\leftrightarrow z\in Y)] $$

- 2. 配对集公理：任给两个集合X和Y，都有一个恰好由它们组成的集合{X,Y}，即

$$\forall X \forall Y \exists Z(Z=\{X,Y\})$$

- 3. 并集公理：任给一个集合X，都有一个恰好由X的元素的元素之全体所组成的集合
$\cup X$
，即

$$\forall X \exists Y(Y = \cup X = \{a|\exists b(b\in X  \wedge a \in b  )\})$$

- 4. 幂集公理：任给一个集合X，都有一个恰好由它的子集合的全体组成的集合P(X)，即

$$\forall X \exists Y (Y = P(X) = \{A|A\in X\})$$

- 5. 无限集公理：存在一个满足如下两条要求（a）和（b）的集合X，
（a）X含一个元素；
（b）如果Y∈X，那么Y∪{Y}∈X。其中Y∪{Y}={Y,{Y}}，即

$$\exists X [(\exists a(a\in X))\wedge (\forall Y(Y\in X \to Y \cup {Y}\in X))]$$

- 6. 分解原理：分解公理又称概括公理，应当注意到这里的表达式并非朴素集合论的概括方式。设φ(x,y₁,…，y𝗇)（1≤n<∞）是集合论语言的一个表达式。任给集合X和p₁,…,p𝗇，集合X中的那些具有性质φ[u,y₁,…，y𝗇]的元素u构成一个集合Y，即

$$\forall X \forall p_1 \dots \forall p_n\exists Y (Y = {u\in X |\phi [u,p_1,\dots,p_n]})$$

这六条公里是Zermelo在1908年引入的
后来Fraenikel又引入了映像存在原理，冯诺依曼又引入了极小原理

### 1.1.2. ZF集合论的推论

- 子集
子集的每个元素都在原集合中，子集可以是空集合，用
<span id="P的定义">$\mathcal P (X)$</span>
表示以X的所有子集为元素的全体的集合。
- 余集
若X是集合
$A\subset X$
，则

$$X-A := \{x\in X;x\notin A\}$$

是A关于X的余集
- 乘积
若X，Y是两个集合，则由
$x\in X,y\in Y$
组成的有序对(x,y)全体组成的集合

$$X\times Y :=\{(x,y);x\in X,y\in Y\}$$

是X和Y的乘积。
- 集合X上的关系R是指乘积 X x X的任意子集，即R由一些特定的序对(x,y)组成，其中
$x\in X,y\in Y$

- 集合上的等价关系是X是满足以下关系的R，其中
$(x,y)\in R$
记作$x\sim y$

  - 自反性：对所有的
$x\in X$
有 
$x\sim x$

  - 对称性：当
$x\sim y$
时，有
$y\sim x$
  - 传递性：当
$x\sim y$
且
$y\sim z$
时，
$x\sim z$


# 2. 映射

若X和Y是两个非空集合，X到Y的映射或函数是指乘积 X x Y的一个子集f，满足对每一个x存在唯一的y使得(x,y)属于f。（欸，这个f不就是前面说的一个集合关系嘛嘿嘿）

$$f:X\to Y 或 X\stackrel{f}{\to} Y$$

或者我们常见的函数定义

$$f(x)\in Y$$

## 2.1. 特征函数
定义函数
$\chi_A:X\to \mathbb R$
为

$$\chi_A(x):=\begin{cases}
1,&x\in A \\ 0,&x\notin A
\end{cases}$$

其为A的特征函数

若
$f:X\to Y$
为一个映射，X的子集A在f下指向的便是Y的子集f(A),即

$$f(A):=\{y\in Y; \exists x\in A ,y=f(x)\}$$

同理，Y的子集B在f下的逆像是X的子集

$$f^{-1}(B):=\{x\in X;f(x)\in B\}$$

须知
$f不是\mathcal{P}(X)到\mathcal{P}(Y)的映射$



## 2.2. 映射的一些性质

A是X的子集,B是Y的子集

- 1. 逆像保持所有集合运算
  - 若
$B\subset \tilde{B}$
则
$f^{-1}(B)\subset f^{-1}(\tilde{B})$

  - $f^{-1}(B\cup\tilde{B})=f^{-1}(B)\cup f^{-1}(\tilde{B})$

  - $f^{-1}(B\cap\tilde{B})=f^{-1}(B)\cap f^{-1}(\tilde{B})$

  - $f^{-1}(Y-B) = X - f^{-1}(B)$
  但是直接像只满足
  - 若
$A\subset \tilde{A}$
则
$f(A)\subset f(\tilde{A})$
  - $f(A\cup\tilde{A})=f(A)\cup f(\tilde{A})$

  - $f(A\cap\tilde{A})=f(A)\cap f(\tilde{A})$

  相比而言少了最后一条.

- 2. 若对于每个
$y\in Y$
至少存在一个
$x\in X$
使
$y = f(x)$
则f是满射

- 3. 多对于每个
$y \in Y$
至多存在一个
$x\in X$
使得
$y =f(x)$ 
则称之为单射

- 4. 若
$f:X\to Y$
是满射且是单射,则称其为双射,此时可以定义逆映射.

- 5. 若
$f:X\to Y$
是一个映射,A是X的子集,对每个
$x\in A$ 
,令
$f_A(x) = f(x)$
这就定义了一个映射
$f_A:A\to Y$
,称之为f在A是的限制,记作
$f|_A$

- 6. 设
$g:A \to Y$
是一个映射,其中A是X的子集,如果映射
$f:X\to Y$
满足
$f|_A=g$
,则称f为g的一个延拓

- 7. 设
$f:X\to Y,g:Y\to Z$
是两个映射,映射
$h:X\to Z$
定义为对每个
$x\in X,h(x) = g(f(x))$
,称h为复合映射,记作
$h=g\circ f$
或
$h=gf$

- 8. 设
$f:X\times Y\to Z$
是一个映射,a是X的一个元素,定义映射
$f(a,\cdot):Y\to Z$
为
$$f(a,\cdot):y\in Y\to f(a,y)\in Z $$
称之为一个部分映射.

- 9. 对映射
$f:(x,y)\in X\times Y \to f(x,y)\in Z$
分别称两个元素为第一个变元和第二个变元.