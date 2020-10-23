---
layout: post
title: "Installation of GPAW"
tag: "密度泛函仿真"
date: 2014-01-02
categories: 仿真
---

# 安装
## 直接安装
GPAW在[Python Package Index](https://pypi.org/)中有项目记录，可以直接

```bash
pip install gpaw --user
```

但这种安装方式不容易控制和自定义外部库的链接

## 手动安装
### Numpy

```bash
pip install numpy
```

### ASE

```bash
pip install ase --user
```