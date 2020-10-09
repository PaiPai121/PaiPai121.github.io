---
layout: post
title: "力学量的演化和对称性"
tag: "量子力学基础"
date: 2015-01-02
categories: 数理基础
---

# 1. 守恒量
一个力学量
$\hat A$
在一个量子力学体系中是守恒的，指对该体系中的任何一个允许态，有

$$\frac{d}{dt}<\Psi(t)|\hat A|\Psi(t)> \equiv 0$$

为了使其成立，要求

$$\frac{\partial \hat A}{\partial t} =0 ,[\hat A,\hat H]=0$$

要求A不显含时间，而且能量和力学量同时可测。
由上一章可知有一共同本征函数族

$$\hat H \psi_{nk} = E_n\psi_{nk},\hat A\psi_{nk} = A_k\psi_{nk}$$

体系任意一个态展开

$$\Psi(t) = \Sigma_{n,k}a_{nk}(t)\psi_{nk}$$

一通乱证有

$$\frac{d}{dt}|a_{nk}(t)|^2=0$$

**例：**氢原子中电子的哈密顿量

$$\hat{H} = \frac{\hat p^2}{2m}-\frac{e^2}{r}$$

角动量在中心力场是守恒量
而动量不是。

## 守恒量与对称性
### Noether定理
一个给定力学体系的守恒量是由体系的对称性决定的。

### 对称性
薛定谔方程有
$$i\hbar\frac{\partial}{\partial t}|\Psi>=\hat H|\Psi>$$

如果做一个平移或转动，有

$$\hat H\to\hat H',|\Psi>\to|\Psi'>$$

仍属于同一个希尔伯特空间，有一个酉正算符

$$|\Psi>\equiv \hat Q|\Psi'>$$

如果前后变换的哈密顿量相同，则成为是一个对称变换。
此时有

$$i\hbar\frac{\partial}{\partial t}|\Psi> = i\hbar\frac{\partial}{\partial t}\hat Q|\Psi>=\hat H'|\Psi'>=\hat H |\Psi'>=\hat H \hat Q|\Psi>$$

有

$$i\hbar\frac{\partial}{\partial t}|\Psi> = \hat Q^{-1}\hat H \hat Q|\Psi>$$

有

$$\hat Q^{-1}\hat H\hat Q = \hat H$$

即

$$[\hat Q,\hat H] = 0$$

这是Noether定理的量子力学表达形式。

### 平移不变性和动量守恒