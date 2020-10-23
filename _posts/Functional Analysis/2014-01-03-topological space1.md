---
layout: post
title: "Topological Space 拓扑空间（一） 基本概念"
tag: "泛函分析"
date: 2014-01-01
categories: 数理基础
---


- [1. 拓扑空间](#1-拓扑空间)
  - [1.1. **开集和闭集**](#11-开集和闭集)
  - [1.2. **通常拓扑**](#12-通常拓扑)
  - [1.3. 一些基本概念](#13-一些基本概念)


# 1. 拓扑空间

拓扑空间指一对 $(X,\mathcal{O})$ ，其中X是一个集合， $\mathcal{O}$ 是 $\mathcal{P}(X)$ 的一个子集，并需要满足以下条件。

- 对任何一族 $(O_i)_{i\in I}$ ，其中 $O_i\in \mathcal{O}$ 其并集 $\cup _{i\in I}O_i\in \mathcal{O}$ (集合I可以是有限集也可以是无限集)；对任何有限个 $(O_j)^n_{j=1}$ ，其中 $O_j\in\mathcal{O}$ ，其交集 $\cap_{j=1}^n O_j \in \mathcal{O}$ ；集合X和空集属于 $\mathcal{O}$
  - 这里的 $O_i$ 都是 $\mathcal{O}$ 的一个个元素（参见之前选择公理前的元素族），那么由于 $\mathcal{O}$是 $\mathcal{P}(X)$ 的子集，而 $\mathcal{P}(X)$ 是 X的子集的集合，那么 $\mathcal{O}$ 自然也是集合的集合，它的元素都是 $X$ 的子集，对任何一个 $I$ 为指标的元素族 $(O_i)_{i\in I}$ ，它的并集根据定义就是存在 $i\in I$ 使 $o \in O_i$ 的元素 $o$ 的集合。 换句话讲，就是每个根据 i 从 $O_i$ 里抽出来的小元素 o 的集合。
  - $(O_j)^n_{j=1}$ 则是一个n维元，其指标集为 $I = \{1,\dots,n\}$ ，所以其实就是 $(O_1,O_2,......,O_n)$ ，没错和向量长得贼像。它的交集也是一个集合，是对所有的i，都能找到对应的 $O_i$ 的元素组成的集合

有的地方说，拓扑空间就是一个集合和其上定义的拓扑结构构成的二元组 $(X,\mathcal{O})$ ，X的元素x 通常就是拓扑空间 $(X,\mathcal{O})$ 上的点。好像和上面的定义蛮接近的嗷，按这个说法来讲， $\mathcal{O}$ 就是一个拓扑结构了。

所以我又找了一个根据拓扑结构来定义拓扑空间的定义，符号还用 $X,\mathcal{O}$
 - 若 $X$ 是非空集合，若它的一个子集族(这个子集族就是 $\mathcal{P}(X)$ 的子集了呗) 满足：
   - 1. $\{X,\emptyset\} \subset \mathcal O$ 
   - 2. $\mathcal O$ 中任意多个成员的并集都在 $\mathcal O$ 中
   - 3. $\mathcal O$ 中两个成员的交集仍然在 $\mathcal O$ 中
    则称 $\mathcal{ O}$ 为X的一个拓扑，称 $\{X,\mathcal{ O}\}$ 为一个拓扑空间，称 $\mathcal{O}$ 中的成员为这个拓扑空间的 $\mathcal{O}$ 开集，简称开集。

这个定义和最开始书上给的定义几乎是一样的，那个对 $\mathcal{O}$ 的限制条件其实就是拓扑的条件嘛。

## 1.1. **开集和闭集**

- 如果 $(X,\mathcal{O})$ ，是一个拓扑空间，称集合 $X$ 被赋予一个拓扑(对应于 $\mathcal{P}(X)$ 的子集 $\mathcal{O}$ ) （欸！和我刚才说的一毛一样！）， $X$ 中属于 $\mathcal{O}$ 的子集称为开集；设 $F$ 是 $X$ 的子集，若 $X - F$ 是开集，则 $F$ 是闭集。
  - 再来默叨一边， $\mathcal{O}$ 是X的子集族的子集，它定义了一个拓扑结构，它的子集都是开集。后半句的意思是，如果 $X-F$ 是 $\mathcal{O}$ 的子集，那么F就是闭集。 总而言之， $X$ 的子集里面如果在 $\mathcal{O}$ 中，那就是开集，如果不在那就是闭集。
- 给定任何一个闭集族 $(F_i)_{i \in I}$ ，其交集 $\cap_{i\in I}F_i$ 是闭集；给定任意有限个闭集 $(F_j)^n_{j=1}$ ，其并集 $U_{j=1}^nF_j$ 是闭集；集合 $X$ 和空集是闭集。  （可由De Morgan定律计算）
  - 交并运算不改变闭集嘛

- 在拓扑空间 $(X,\mathcal{O})$ 中，点 $x\in X$ 的邻域是X的包含由点x的某开子集的任何子集，点 $x \in X$ 的所有邻域组成的集合记作 $\nu(x)$

## 1.2. **通常拓扑**
$\mathbb R^n$ 中按欧几里得空间的度量确定的拓扑在X上的相对拓扑称为X上的通常拓扑。
这话还挺不是人话的。
按书上的话，有例子，就是比如 $a,b\in\mathbb R$ ，满足  $a<b$ ，即 $]a,b[:=\{y\in \mathbb{R},a<y<b\}$ ，拓扑空间 $(\mathbb{R},\mathcal{O})$ ，那么 $O\in\mathcal{O}$ 的充要条件就是对任何 $x\in O$ ，存在 $a<b$  ，使得 $x\in]a,b[$ ，而且 $]a,b[\subset O$ 。
说的也不太清楚。
先简单按照区间那样理解好了。

**定理** 设 $\mathbb{ R}$ 赋予通常拓扑，则其中的任何非空开子集都可以表示为有限个或可数无限个互不相交的有界或无界的开区间的并集。

~~就是能用不重叠的区间拼起来呗？~~

## 1.3. 一些基本概念

若 $(X,\mathcal{O})$ 是一个拓扑空间，A是X的子集

**内部:** 含于A的所有开集的并集是A的内部，记作 $\mathring A ~~ or ~~ int A$ ,有
$$\mathring{A} = int A:=\{x\in X;A\in \nu(x)\}$$

**闭包:** 包含A的所有闭子集的交集，记作 $\overline{ A}$ ，有
$$\overline{A}:=\{x\in X;\forall V\in \nu(x) ,V\cap A\not ={\emptyset} \} = X-\{int(X-A)\}$$

**边界:** A的边界为 $\overline{A}$ 和 $\overline{X-A}$ 的交集，记作 $\partial A$ ，即
$$\partial A := \{x\in X;\forall V\in \nu(x), V\cap A \not ={\emptyset} ,V\cap(X-A)\not ={\emptyset}\}$$

**支集:** $f:X\to K$ 的支集是指集合 $supp f:=\overline{\{x\in X;f(x)\not ={0}\}}$

**稠集:** 若 $\overline{A} = X$ 则称 $A$ 在 $X$ 中稠密

**可分:** 包含一个有限可数无限的稠密子集，即存在 $x_n \in X,n\ge 0$ 使得 $\overline{\cup_{n=0}^\infty\{x_n\}} = X$

**Hausdorff:** 如果对任意两个不同的点，存在x的邻域V和y的邻域W，使得 $V\cap W=\emptyset$ ，那么称 X 为 Hausdorff 空间或具有 Hausdorff 拓扑。（就是有两个不相交的邻域嘛？）

**正规:** 对X中任意给定的两个互不相交的闭子集 $F_1$ 和 $F_2$ ，存在互不相交的开子集 $O_1$ 和 $O_2$ ，使得 $F_1\subset Q_1$ ， $F_2\subset Q_2$ 。正规空间是Hausdorff空间。（比Hausdorff空间的条件更强）

**极限:** 若X为拓扑空间， $x_n \in X,n\ge 0$ ，若存在 $x\in X$ ，对x的任意邻域V，存在整数 $n_0 = n_0(V)\ge 0$ ，使得当 $n\ge 0$ 时 $x_n\in V$ ，则称x为序列 $(x_n)_{n=0}^\infty$ 的极限，记作
$$x = \lim_{n\to\infty}x_n ~~ or ~~ x_n \mathop{\rightarrow}\limits_{n\to\infty} x ~~or~~ x(n\to \infty)$$
表示 $x$ 为 收敛序列 $(x_n)_{n=0}^\infty$ 的极限

**映射收敛:** $f_n:X\to Y$ 的序列 $(f_n)_{n=0}^\infty$ 点态收敛于映射 $f:X\to Y$ 是指对每个 $x\in X$ ,当 $n\to \infty$ 时吗， $f_n(x)\to f(x)$

**乘积拓扑:** 对任意一族拓扑空间 $(X_i,\mathcal{O}_i)，i\in I$ ，乘积集合 $X=\Pi_{i\in I}X_i$ 上的乘积拓扑定义为：在此拓扑下子集 $O\subset X$ 称为开集是指对任何 $x\in O$ ，存在开集 $O_i\in\mathcal{O}_i$ 的有限族 $(O_i)_{i\in J(x)}$ ，使得
$$x\in(\mathop{\Pi}\limits_{i\in J(x)} O_i) \times (\mathop{\Pi}\limits_{i\in I(x)} X_i)$$ 且 $$(\mathop{\Pi}\limits_{i\in J(x)} O_i) \times (\mathop{\Pi}\limits_{i\in I(x)} X_i) \subset O$$
其中 $I(x) = I-J(x)$


