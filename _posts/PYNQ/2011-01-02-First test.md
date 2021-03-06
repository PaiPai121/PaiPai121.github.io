---
layout: post
title: "第一个简易实验"
tag: "PYNQ"
date: 2011-01-02
categories: PYNQ
---

# 工程创建
创建RTL类型的工程并在board选项中选择PYNQ-Z2
（不必添加源文件和约束）

![](/pics/PYNQ/lab1/project.png)

进入后创建block design

![](/pics/PYNQ/lab1/create%20block%20design.png)

然后在diagram窗口创建名字里包含ZYNQ的IP核
并在创建完成后点击Run Block Automation，使其自动完成预设电路配置。

![](/pics/PYNQ/lab1/runblock.png)

# ZYNQ
双击ZYNQ模块打开可配置模块窗口。

![](/pics/PYNQ/lab1/ZYNQcore.png)

其中绿色高亮模块为可更改模块，将IO模块中除UART0之外的框框全部去掉。

- 点击Diagram中的加号，选择search，找到AXI GPIO并添加，命名为Buttons

双击打开，将Board interface中的GPIO修改为btns 4bits

![](/pics/PYNQ/lab1/btns.png)

点击Run Connection Automation，并勾选所有选项，使其自动连接。

![妈个鸡什么鬼畜](/pics/PYNQ/lab1/mgj.png)

- 再添加一个GPIO，命名为Leds，同样将Board interface中的GPIO修改为leds 4bits

- 再添加一个GPIO，命名为Switchs，同样将Board interface中的GPIO修改为sws 2bits

继续Run Connection Automation，并勾选所有选项，使其自动连接。

![也太jb乱了，还是看官方图吧](/pics/PYNQ/lab1/hft.png)

## 生成输出文件
右键sources里面的system（也可能是你起的别的什么鬼东西），选Generate output Products

![](/pics/PYNQ/lab1/Gout.png)

在弹出的对话框勾选Out of context per IP

同样右键选择Create HDL Wrapper生成顶层文件（在弹出窗口中选第二项 let vivado manage wrapper and auto-update）

## 生成bit文件

![](/pics.pics/PYNQ/lab1/gebit.png)

选择generate bitstream

## 导出SDK
在File>>Export>>Export Hardware将其导出，勾选include bitsteam


# SDK

## 板级支持包

点击File >> Launch SDK，并在弹出的对话框中点击OK，启动SDK工具
（这里发现一个问题，就是如果你的工程名字中有空格，会出现奇怪的错误）

点击File >> New >> Board Support Package 创建板级支持包

![](/pics/PYNQ/lab1/board.png)

然后果断finish

## 新工程

点击File >> New >> Application Project 创建新工程，命名为lab1，点击Next
（板级支持包别让他新建，选use existing）

选择Empty Application，然后再Finish

右键Lab1里面的src文件，选择import

选择 General>>file System 
选择铱元素科技提供的source文件，并finish

不过有个问题嗷，就是我这咋报错了呢？？？

![](/pics/PYNQ/lab1/deviceid.png)

一番研究之后发现是我和教程给那两个AXIGPIO模块命名不一样，所以打开头文件
xparameters.h
可以找到现在的命名

![](/pics/PYNQ/lab1/deviceid2.png)

对应的改一下就可以咯。

点击加号进行下载检测

![](/pics/PYNQ/lab1/com.png)

点击上方的Program FPGA按键
搞他！



（两个开关要置0，跳线接在JTAG上）