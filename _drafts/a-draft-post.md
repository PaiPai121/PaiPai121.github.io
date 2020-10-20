
$E$
是
$\mathbb{R}$
上的向量空间，泛函则是定义在E或E的子空间上的函数。

# Hahn-Banach Analytic form

如果 
$p:E \to \mathbb{R}$
是函数，且满足以下条件

$$
p(\lambda x) = \lambda p(x),\forall x \in E adn \forall \lambda > 0
$$


$$p(x+y)\le p(x)+p(y),\forall x,y \in E$$

而
$G\in E$
是一个线性子空间，而且
$g:G\to R$
是一个线性函数且满足

$$g(x)\le p(x),\forall x \in G$$


若满足假设，则
- 存在一个
$E$
上的线性函数
$f$
使得

$$g(x)=f(x),\forall x \in G$$

而且

$$f(x) \le p(x),\forall x \in E $$


_根据[百度百科](https://baike.baidu.com/item/%E5%93%88%E6%81%A9%E4%B8%80%E5%B7%B4%E6%8B%BF%E8%B5%AB%E5%AE%9A%E7%90%86/19003289?fr=aladdin),好像最后的那个小于等于号其实来源于前面那个小于等于_


其证明依赖于Zorn’s lemma 佐恩引理 ~~这都是啥啊woc~~


## 佐恩引理
任意非空的偏序集中，若任何链（全序的子集）都有上界，则此偏序集内比如存在至少一个极大元
