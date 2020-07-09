---
layout: post
title: "利用谱方法逼近导数"
tag: "Little Tools"
date: 2010-01-02
categories: 工具
---

# 基本内容
## 傅里叶系数近似
周期函数傅里叶系数的计算

$$\hat f(k) = \frac{1}{2\pi}\int_0^{2\pi}f(y)e^{-iky}dy$$

将其进行等距剖分有

$$y_i = \frac{2\pi(j-1)}{N},j=1,2,...,N$$

可以用矩形公式或梯形公式进行数值离散

$$\frac{1}{N}\Sigma_{j=1}^Nf(y_j)e^{-iky_j}$$

## 导数近似
导数为

$$\frac{f(x_0+h) - f(x_0)}{h}$$

$$\frac{f(x_0+h) - f(x_0-h)}{2h}$$

这是局部的近似

### 谱方法近似

假定fx是
$2\pi$
周期的函数，在一个周期上有等距剖分

$$y_j=\frac{2\pi j-1}{N},j=1,...,N$$

这些点上的函数采样值为

$$X_j=f(y_j)$$

- 用X来构造f的逼近函数g
- 使用g的导数来作为f的导数的近似

#### 逼近函数g

f应有傅里叶级数展开

$$f(x)=\Sigma_{k=-\infty}^\infty \hat f(k)e^{ikx}$$

而FFT变是通过X计算了

$$\hat f(k),k=0,...,N/2,-N/2+1,...,-1$$

的近似值

将傅里叶展开截断，令

$$g(x) = \Sigma_{k=-\frac{N}{2}+1}^{\frac{N}{2}}\hat f(k)e^{ikx}$$

作为f的近似
其导数为

$$g'(x)=\Sigma_{k=-\frac{N}{2}+1}^{\frac{N}{2}}ik\hat f(k)e^{ikx}$$

而真正的f在xj上的导数为

$$g'(x_j)=\Sigma_{k=-\frac{N}{2}+1}^{\frac{N}{2}}ik\hat f(k)e^{ikx_j}$$

而ifft是

$$X_j = \frac{1}{N}\Sigma_{k=1}^NY_kexp(i(k-1)y)j),e^{iky_j}=e^{i(k+N)y_j}$$

有

$$\Sigma_{k=-\frac{N}{2}+1}^{\frac{N}{2}}ik\hat f(k)e^{ikx_j} = \Sigma_{k=0}^{\frac{N}{2}}ik\hat f(k)e^{ikx_j}+\Sigma_{k=-\frac{N}{2}+1}^{-1}ik\hat f(k)e^{i(k+N)x_j}$$

所以导数计算可以
- 计算采样点函数值
- fft计算傅里叶系数近似
- 乘ik
- 逆变换ifft

#### 实例

```python
def demo2():
    N = 100
    y = np.linspace(0,2*pi,N+1)
    y = y[:-1]
    x = np.exp(np.sin(y))
    Y = np.fft.fft(x)
    # 数值导数
    deri_Y = np.fft.ifft(Y*np.append(1j*np.arange(0,N/2+1),1j*np.arange(-N/2+1,0)))
    # 精确导数
    deri_exact = np.cos(y)*x

    plt.figure()
    plt.plot(y,deri_Y,'r-o')
    plt.plot(y,deri_exact,'b-.')
    plt.legend(["numerical","exact"])
    plt.show()

demo2()
```

# 能带计算

哈密尔顿量

$$H=-\frac{1}{2}\partial^2_x+V_\Gamma(x)$$

本征态

$$H\psi(x) = E_m\psi(x)$$

## 周期边界条件

$$
g(x) = \psi(x+2\pi)
$$

