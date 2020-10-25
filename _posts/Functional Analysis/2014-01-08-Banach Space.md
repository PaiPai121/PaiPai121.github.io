

- [1. 赋范向量空间的连续线性算子](#1-赋范向量空间的连续线性算子)
  - [1.1. 初等性质](#11-初等性质)
  - [1.2. 线性算子的特征值和特征子空间](#12-线性算子的特征值和特征子空间)
  - [1.3. 空间 $\mathcal{L}(X;Y),\mathcal{L}(X) ,X^*$](#13-空间-mathcallxymathcallx-x)
- [2. 连续多重线性映射](#2-连续多重线性映射)
- [3. Banach 空间的基本性质](#3-banach-空间的基本性质)
  - [3.1. 唯一线性连续延拓](#31-唯一线性连续延拓)

# 1. 赋范向量空间的连续线性算子
设X和Y是同一个域 $\mathbb{K=R} ~~ or ~~ \mathbb{K=C}$ 上的向量空间，0表示他们中的零向量。
映射 $A:X\to Y$ 对所有 $x,y\in X , ~\alpha \in\mathbb{K}$ 有
$A(x+y)=A(x)+A(y),A(\alpha x) = \alpha A$
则称A为由X到Y的线性算子。
这个线性定义和之前学信号与系统里面的线性也是一模一样，叠加性齐次性啥的

如果 $Y=\mathbb{K}$ 则称之为线性泛函或者线性型。一般简记A(x) 为 Ax

**半线性** 如果 $\mathbb{K=C}$ 然后把那个乘法改成 $A(\alpha x) =\overline \alpha A(x)$ ，则A是半线性的。

**A的核** 如果A是线性算子，称X的子集 $Ker ~~ A:=\{x\in X;Ax = 0\}$ 为A的核。
称X在A作用下的直接像A(X) 是A的值域，记作 Im A，有 $Im ~~A:= A(X) = \{y\in Y; \exists x \in X , y = Ax \}$
所以说A的核心就是X里能够在运算后得到0的元素的集合。

## 1.1. 初等性质
- 仅当A的核只有一个0元素的时候，A是单射（很容易理解嘛，不然不就很多个元素都映射到0了么，只能有一个的话，那必然是只有0元素了）
- 如果线性算子是单射，那么他的逆映射是从Im A到X的线性算子(此处应有同理)

## 1.2. 线性算子的特征值和特征子空间
如果 $\exists p\in X,p\not ={0} , \lambda \in \mathbb{K} ,Ap = \lambda p$
则λ是A的一个特征值，非零向量p是A相对于特征值λ的一个特征向量。
X的子空间 $\{p\in X;Ap=\lambda p\} \not ={0}$ 是相对于特征值 λ 的特征子空间。



## 1.3. 空间 $\mathcal{L}(X;Y),\mathcal{L}(X) ,X^*$
设X和Y是同一个域 $\mathbb{K}$ 上的两个赋范线性空间，则将域 $\mathbb{K}$ 上由所有X到Y的连续线性算子组成的空间记作
$\mathcal{L}(X;Y) ~~ or ~~ Y=X时 \mathcal{L}(X)$

在 $Y = \mathbb{K}$ 这特殊情况下，空间 $X':=\mathcal{L}(X;\mathbb{K})$ 是X的对偶空间。 

# 2. 连续多重线性映射

乘积空间 $X_1\times X_2\times X_3\times \dotsb \times X_k (k\ge 2,k\in Z)$ 是所有形如 $(x_1,x_2,x_3,\dotsb,x_k)$ 的元素的集合。没错它长得和俺熟悉的向量一毛一样，所以定义好加法和乘法这就是一个 $\mathbb{K}$ 上的向量空间了。

我们称映射 $A: X_1\times X_2\times X_3\times \dotsb \times X_k \to Y$ 是由 $X_1\times X_2\times X_3\times \dotsb \times X_k$ 到 Y 的多重映射或k线性映射。
当k=2或k=3时候也可以叫双线性或三线性。如果 $Y = \mathbb{K}$ 也可以称为多重线性泛函或多线性型。

- 这里有个关键点是这个多重映射和 $X_1\times X_2\times X_3\times \dotsb \times X_k$ 到 Y 的线性映射是不一样的（书上不提估计我就以为一样了。）
区别可以由下面的例子看出
以k=2距离
线性映射应有 $A((x_1,x_2)+(y_1,y_2)) = A(x_1,x_2)+A(y_1,y_2),A(\alpha(x_1,x_2))=\alpha A(x_1,x_2)$
    
    而双线性映射满足的应该是
$A((x_1,x_2)+(y_1,y_2)) = A(x_1,x_2)+A(y_1,y_2)+A(x_1,y_2) + A(x_2,y_1),A(\alpha(x_1,x_2))=\alpha^2 A(x_1,x_2)$
区别还蛮大的。

- 所有的$X_1\times X_2\times X_3\times \dotsb \times X_k$ 到 Y 的多重线性映射组合也是 $\mathbb{K}$ 上的一个向量空间。

**对称和交错：**

- 置换：集合的置换是从集合映至自身的双射。比如 {1,2,3} 和 {2,1,3} 

$\mathcal{G}_k$ 表示由集合 {1,2,3,4,...,k} 的置换全体组成的集合，那么 $X\times X\times X\times \dotsb \times X$ 到 Y 的多重线性映射对一切 $x_l\in X_l$ 和所有的 $\sigma\in \mathcal{G}_k$ 有
$$A(x_{\sigma(1)},x_{\sigma(2)},\dotsb,x_{\sigma(k)}) = A(x_1,x_2,\dotsb,x_k)$$
那么A是对称的

从这个式子看，对称的意思应该就是A()括号里面的参数可以瞎换位置不影响结果嘛，在这些乘积的集合都是相同的X的情况下。

如果
$$A(x_{\sigma(1)},x_{\sigma(2)},\dotsb,x_{\sigma(k)}) = \epsilon(\sigma)A(x_1,x_2,\dotsb,x_k)$$
其中 $\epsilon(\sigma)$ 是$\sigma$ 的符号(只能是±1)，则称A是交错的。

这个和刚才的区别就是前面加了符号。也就是说交互位置只改变正负号。

这个特性和矩阵的行列式好像啊！！！！！！

所以书后也说，系数在 $\mathbb{K}$ 上的 k*k的矩阵的行列式，作为矩阵列向量的函数，就是一个 $X= \mathbb{K}^k$ 的交错多重泛函的例子。


# 3. Banach 空间的基本性质
赋范向量空间 $(X,||\cdot||)$ 称为 Banach 空间，是指距离空间 $(X,d)$ 是完备的，这里X是的距离d定义为 $d(x,y):=||x-y||$ 

## 3.1. 唯一线性连续延拓

设X为赋范向量空间 $\tilde{ X}$ 的稠密子空间，Y是Banach空间， $A: X\to Y$ 为连续线性算子，则存在唯一的连续线性算子 $\tilde{A}:\tilde{X}\to Y$ ,$\tilde{A}$是A的延拓，即党 $x\in X$ 时， $\tilde{A}x = Ax$ ，而且对任何 $\tilde{x}\in \tilde{X}$ 和元素 $x_n\in X$ 的任何序列 $(x_n)_{n=1}^\infty$ , 当它在 $\tilde{X}$ 中满足 $\lim_{n\to\infty} x_n = \tilde{x}$ 时

$$\tilde{A}\tilde{x} = \lim_{n\to\infty} Ax_n$$

$$||\tilde{A}||_{\mathcal{L}(\tilde{X};Y)} = ||A||_{\mathcal{L}(X;Y)}$$

