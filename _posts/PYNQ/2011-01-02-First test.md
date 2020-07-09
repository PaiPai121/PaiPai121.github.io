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
点击File >> Launch SDK，并在弹出的对话框中点击OK，启动SDK工具
