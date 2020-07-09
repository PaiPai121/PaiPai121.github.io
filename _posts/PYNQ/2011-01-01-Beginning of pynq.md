---
layout: post
title: "PYNQ初上手"
tag: "PYNQ"
date: 2011-01-01
categories: PYNQ
---
<!-- TOC -->

- [1. 镜像烧录](#1-镜像烧录)
- [2. 启动PYNQ](#2-启动pynq)
  - [2.1. 初步设置](#21-初步设置)
  - [2.2. 网络连接](#22-网络连接)
    - [2.2.1. 链接windows](#221-链接windows)
    - [2.2.2. 连接至路由器](#222-连接至路由器)
- [3. 软件安装](#3-软件安装)
  - [3.1. PYNQ-Z2板卡支持文件](#31-pynq-z2板卡支持文件)
- [4. PYNQ-Z2相关资料下载](#4-pynq-z2相关资料下载)

<!-- /TOC -->
# 1. 镜像烧录

[镜像下载地址 v2.3](https://d2m32eurp10079.cloudfront.net/Download/pynq_z2_v2.3.zip)
[镜像下载地址 v2.2](http://www.tul.com.tw/download/pynq_z2_v2.2.img.zip)

下载好镜像后将其烧录入一张至少8G的sd卡中，由于我是把我之前用在树莓派上的SD卡拆下来了，所以还需要一个SD卡格式化的软件（之前烧录好镜像以后windows上就只能看到一个很小的叫boot的盘了。）

[镜像烧录软件](https://download.csdn.net/download/kzz6991/12595119)
[SD卡格式化软件](https://download.csdn.net/download/kzz6991/12595124)

先将下载下来的压缩包解压出镜像文件

![镜像文件](/pics/PYNQ/img.png)

如果sd卡需要格式化，打开格式化软件对其进行格式化

![SD卡格式化](/pics/PYNQ/sdformat.png)

然后对sd卡进行烧录

![SD卡烧录](/pics/PYNQ/shaolu.png)

# 2. 启动PYNQ

![PYNQ设置](/pics/PYNQ/PYNQsetup.png)

## 2.1. 初步设置

- 我们从SD卡引导启动，所以将boot跳线帽放在SD的位置。（图中1）

- 如果想用独立电源，可以通过图中的6给开发板供电（跳线帽放置在REG），不过我这里用micro USB供电(图中4)，因此将power跳线帽(图中2)放在USB上

- 将烧录好镜像的SD卡插入卡槽(图中3)

- 通过USB链接PC

![](/pics/PYNQ/pynqshiwu.jpg)

- 开机（将图6处的开关拨向ON）

电脑上显示有串口设备

![com7](/pics/PYNQ/COM.png)


## 2.2. 网络连接
(默认Hostname是 pynq，默认静态ip为192.168.2.99)
### 2.2.1. 链接windows
- 在控制面板找到以太网连接，设置为静态ip
- 通过以太网口链接开发板
- 打开http://192.168.2.99

### 2.2.2. 连接至路由器
- 通过以太网接口连接到路由器
- 电脑连接到同一wifi
- 打开http://<board IP adress>
- 可选:看下方的更改Hostname
- 可选:查看代理设置



# 3. 软件安装

选用2018版本的vivado
[百度网盘下载地址](https://pan.baidu.com/s/1qAud5NRx7Hl8ZokOE85aHg)  提取码: r91x
[官方下载地址](https://www.xilinx.com/support/download/index.html/content/xilinx/en/downloadNav/vivado-design-tools/2018-3.html)

安装免license的Vivado Webpack版本，其支持常用的中低端器件

![支持器件列表](/pics/PYNQ/devicelist.png)

安装时选择WebPACK版本，其余可不做改动。（注意中文路径可能出现bug）

## 3.1. PYNQ-Z2板卡支持文件

[board file 官方下载地址](https://www.xilinx.com/support/documentation/university/vivado/workshops/vivado-adv-embedded-design-zynq/materials/2018x/PYNQZ2/pynq-z2.zip)

[board file 下载地址 2（淘宝商家提供）](http://www.tul.com.tw/download/pynq-z2.zip)

将下载的压缩包解压缩后的pynq-z2文件夹拷贝到Vivado 安装目录Vivado\2018.3\data\boards \board files 目录下

![board files](/pics/PYNQ/boardfiles.png)

此时通过Vivado新建工程便可选择pynq-z2的board

![board files](/pics/PYNQ/newproject.png)


# 4. PYNQ-Z2相关资料下载
[PYNQ-Z2 用户手册](https://d2m32eurp10079.cloudfront.net/Download/pynqz2_user_manual_v1_0.pdf)

[PYNQ-Z2 电路图](http://www.tul.com.tw/download/TUL_PYNQ%20Schematic_R12.pdf)

[PYNQ-Z2 板卡文件](https://d2m32eurp10079.cloudfront.net/Download/pynq-z2.zip)

[PYNQ-Z2 约束文件](http://www.tul.com.tw/download/pynq-z2_v1.0.xdc.zip)