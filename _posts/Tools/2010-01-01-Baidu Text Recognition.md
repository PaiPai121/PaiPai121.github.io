---
layout: post
title: "利用百度api和python实现文字识别小工具"
tag: "Little Tools"
date: 2010-01-01
categories: 工具
---
<!-- TOC -->

- [1. 准备工作](#1-准备工作)
  - [1.1. 注册和申请](#11-注册和申请)
  - [1.2. python 的库](#12-python-的库)
- [2. 小工具的开发](#2-小工具的开发)
  - [2.1. 截图功能](#21-截图功能)
  - [2.2. 保存到剪贴板](#22-保存到剪贴板)
  - [2.3. 连接到文本识别](#23-连接到文本识别)
  - [2.4. 简单的界面](#24-简单的界面)
  - [2.5. 高分辨率屏幕修正](#25-高分辨率屏幕修正)
- [3. 看看结果](#3-看看结果)
- [4. 打包](#4-打包)
- [5. 完整代码](#5-完整代码)

<!-- /TOC -->

# 1. 准备工作
## 1.1. 注册和申请

我们不是自己要写一套智能识别文字的工具 ~~（那工作量也太大了）~~
因此不得不借助百度的力量。
首先就是注册账号和申请api了。

百度AI开放平台有好多好多功能可以用，我贴了几个。

[百度AI开放平台](https://ai.baidu.com/)
[百度文字识别服务](https://ai.baidu.com/tech/ocr?track=cp:ainsem|pf:pc|pp:chanpin-wenzishibie|pu:wenzishibie-baiduocr|ci:|kw:10002846 )
[百度语音识别服务](https://ai.baidu.com/tech/speech?track=cp:ainsem|pf:pc|pp:chanpin-yuyin|pu:yuyin-yuyinshibie-API|ci:|kw:10003615)
[百度人脸识别服务](https://ai.baidu.com/tech/face?track=cp:ainsem|pf:pc|pp:chanpin-renlianshibie|pu:renlianshibie-APIjiekou|ci:|kw:10002057)

点哪个无所谓，反正我们注册之后来到百度智能云的管理中心，鼠标放到产品服务上。

![](/pics/Tools/TextRecognition/apps.png)

就选文字识别吧（当然了要做别的就选别的，都差不多啦!| ू•ૅω•́)ᵎᵎᵎ）

然后咱们创建个新应用
![](/pics/Tools/TextRecognition/application0.png)

ok，一个无比简易的应用创建完成了。

![](/pics/Tools/TextRecognition/appapplication.png)

费用嘛，每天有50000次至少够我挥霍了哈哈哈哈

![](/pics/Tools/TextRecognition/feiyong.png)

[费用说明](https://ai.baidu.com/ai-doc/OCR/9k3h7xuv6)

## 1.2. python 的库
众所周期遇事不决先装库，对于这个应用要安装的是baidu-api，可以在cmd输入

```bash
pip install baidu-aip
```

或者你用pycharm装之类的都可以了。

用简单的代码来验证一下它的功能吧

```python
from aip import AipOcr ## 引用OCR识别的api

class TextRecognition:
    def __init__(self,app_id,api_key,secret_key):
        ## 用自己申请到的app id等内容初始化AipOcr
        self.aipOcr = AipOcr(app_id,api_key,secret_key)

        """ 读取图片 """
    def get_file_content(self,filePath):
        with open(filePath, 'rb') as fp:
            return fp.read()


    def imageToText(self,path):
        ## 将path对应的图片转换为文字
        image = self.get_file_content(path)
        
        ### 可选参数
        options = {}
        options["language_type"] = "CHN_ENG"
        options["detect_direction"] = "true"
        options["detect_language"] = "true"
        options["probability"] = "true"
        result = self.aipOcr.webImage(image, options)
        self.result = result
        return result

    def SplicingText(self):
        text = ""
        for res in self.result['words_result']:
            text += res['words']
        print (text)
        return text

### 都换成你自己的
App_id = "*******"
Api_key = "*****************"
Secret_key = "*******************"

T = TextRecognition(App_id,Api_key,Secret_key)
path = r"D:\GH\ToolsBasedOnBaidu\TextTest.png"
## 显示结果
print(T.imageToText(path))
## 显示拼接后的文本
T.SplicingText()
```

其中的可选参数等内容来自于[官方文档](https://cloud.baidu.com/doc/OCR/s/3k3h7yeqa)

选用图片

![](/pics/Tools/TextRecognition/TextTest.png)

来观察一下返回结果的内容吧

![](/pics/Tools/TextRecognition/res.png)

result内容包括log_id,direction,words_result_num以及wrods_result几个内容。
其中direction是图像的方向，而words_resulf则是最重要的输出结果，是一个list。

![](/pics/Tools/TextRecognition/res.png)

其中每个元素都是一个字典，包括words和probability两个keys，words是我们想要转化成的文字，而probability则是概率(包括方差、正确率、最小值)

把列表里每个字典的words的内容拼接起来可以得到完整的文本。

![](/pics/Tools/TextRecognition/totalres.png)

OK大功告成，接下来来做真正的工具吧！

# 2. 小工具的开发

每次都运行个.py岂不是太麻烦了，还是整成一个带快捷键的工具比较合适。

## 2.1. 截图功能
此段主要参考csdn的大佬[虾米小飞](https://blog.csdn.net/FengKuangXiaoZuo/article/details/105425459)
涉及到截图就又需要调包了(没有的库就麻烦pip install ****一下了)

```python
import time
from PIL import ImageGrab
import tkinter as tk
import os
import win32clipboard
from PIL import Image
from io import BytesIO
```

首先要把整个屏幕截下来，然后再去细分截图
```python
def screenShot():
    root.state('icon')
    time.sleep(0.1)
    im = ImageGrab.grab(None)
    im.save('temp.png')
    im.close()
    w=FreeScreenShot(root,'temp.png')
    button_screenShot.wait_window(w.top)
    root.state('normal')
    os.remove('temp.png')
```

接下来实现类似QQ微信截图的点击、拖拽、松开截图

```python
class FreeScreenShot():
    def __init__(self,root,img):
        
        """保存鼠标左键点击位置（一会要赋值的）"""
        self.X = tk.IntVar(value = 0)
        self.Y = tk.IntVar(value = 0)

        """获取屏幕尺寸"""
        screenWidth = root.winfo_screenwidth()
        screenHeight = root.winfo_screenheight()

        ### 顶级组件容器

        self.top = tk.Toplevel(root,width=screenWidth,height = screenHeight)

        ### 隐藏顶条
        self.top.overrideredirect(True)
        self.canvas = tk.Canvas(self.top,bg = 'white',width = screenWidth,height = screenHeight)

        ### 显示全屏截图，然后进行区域截图
        self.image = tk.PhotoImage(file = img)
        self.canvas.create_image(screenWidth//2,screenHeight//2,image = self.image)

        self.lastDraw = None

        """更新鼠标左键按下位置"""
        def onLeftButtonDown(event):
            self.X.set(event.x)
            self.Y.set(event.y)
            # 开始截图
            self.begin = True

        self.canvas.bind('<Button-1>',onLeftButtonDown)# 绑定按键和事件

        """鼠标移动选取区域"""
        def onLeftButtonMove(event):
            #鼠标左键移动，显示选取的区域
            if not self.begin:
                return
            try: #删除刚画完的图形，要不然鼠标移动的时候是黑乎乎的一片矩形
                self.canvas.delete(self.lastDraw)
            except Exception as e:
                pass
            self.lastDraw = self.canvas.create_rectangle(self.X.get(), self.Y.get(), event.x, event.y, outline='green')

        """鼠标左键抬起，完成截图"""
        def onLeftButtonUp(event):
            #获取鼠标左键抬起的位置，保存区域截图
            self.begin = False
            try:
                self.canvas.delete(self.lastDraw)
            except Exception as e:
                pass

            time.sleep(0.1)
            #考虑鼠标左键从右下方按下而从左上方抬起的截图
            left, right = sorted([self.X.get(), event.x])
            top, bottom = sorted([self.Y.get(), event.y])
            pic = ImageGrab.grab((left+1, top+1, right, bottom))
            self.pic = pic  ## 存下图片
            
            #self.paste_img(pic)
            #self.send_msg_to_clip(win32clipboard.CF_UNICODETEXT,"啊啊啊啊啊啊啊八八八八八八八啊啊")
            #关闭当前窗口
            self.top.destroy()
            
        self.canvas.bind('<B1-Motion>', onLeftButtonMove) # 按下左键
        self.canvas.bind('<ButtonRelease-1>', onLeftButtonUp) # 抬起左键
        #让canvas充满窗口，并随窗口自动适应大小
        self.canvas.pack(fill=tk.BOTH, expand=tk.YES)
```



## 2.2. 保存到剪贴板
此处参考[另一位大佬](https://www.cnblogs.com/enumx/p/12359863.html)
你可以选择把截下来的图片保存入剪贴板，也可以选择把转换后的文字保存到剪贴板

```python
    """将图片保存入剪贴板"""
    def send_msg_to_clip(self,type_data, msg):
        """
        操作剪贴板分四步：
        1. 打开剪贴板：OpenClipboard()
        2. 清空剪贴板，新的数据才好写进去：EmptyClipboard()
        3. 往剪贴板写入数据：SetClipboardData()
        4. 关闭剪贴板：CloseClipboard()

        :param type_data: 数据的格式，
        unicode字符通常是传 win32con.CF_UNICODETEXT
        :param msg: 要写入剪贴板的数据
        """
        win32clipboard.OpenClipboard()
        win32clipboard.EmptyClipboard()
        win32clipboard.SetClipboardData(type_data, msg)
        win32clipboard.CloseClipboard()

    
    def paste_img(self,image):
        """
        图片转换成二进制字符串，然后以位图的格式写入剪贴板

        主要思路是用Image模块打开图片，
        用BytesIO存储图片转换之后的二进制字符串

        :param file_img: 图片的路径
        """

        # 声明output字节对象
        output = BytesIO()

        # 用BMP (Bitmap) 格式存储
        # 这里是位图，然后用output字节对象来存储
        image.save(output, 'BMP')

        # BMP图片有14字节的header，需要额外去除
        data = output.getvalue()[14:]

        # 关闭
        output.close()

        # DIB: 设备无关位图(device-independent bitmap)，名如其意
        # BMP的图片有时也会以.DIB和.RLE作扩展名
        # 设置好剪贴板的数据格式，再传入对应格式的数据，才能正确向剪贴板写入数据
        self.send_msg_to_clip(win32clipboard.CF_DIB, data)
```

## 2.3. 连接到文本识别

对最开始的截图部分稍加修改，引入我们之前的文本识别

```python
import TextRecognize
```

在鼠标抬起的函数里添加转换文字的功能

```python
            self.pic = pic  ## 存下图片
            pic.save("temp2.png")
            I2T = TextRecognize.TextRecognition(app_id = "21139457",api_key = "PbyNrvXkrnwYtbqnODiOmvH8",\
                secret_key = "WcXA0he5d0PalmqBPrmzTrmGrW52gDNy")
            I2T.imageToText("temp2.png")
            self.Text = I2T.SplicingText()
            #self.paste_img(pic)
            self.send_msg_to_clip(win32clipboard.CF_UNICODETEXT,self.Text)
```

## 2.4. 简单的界面
emmm，我们就放一个截屏按钮以及一个显示文本的文本框
```python
root = tk.Tk()
root.title("ScreenShot")
root.geometry('500x500')
root.resizable(True,True)

text = tk.Text(root)
text.pack()

def screenShot():
    root.state('icon')
    time.sleep(0.2)
    im = ImageGrab.grab(None)
    im.save('temp.png')
    im.close()
    w=FreeScreenShot(root,'temp.png')
    button_screenShot.wait_window(w.top)
    root.state('normal')
    os.remove('temp.png')
    text.insert("end",w.Text)


button_screenShot = tk.Button(root,text='Shot',command = screenShot)
button_screenShot.place(relx=0.5, rely=0.75, relwidth=0.2, relheight=0.2)




try:
    root.mainloop()
except:
    root.destroy()
```

## 2.5. 高分辨率屏幕修正
由于我用的是Surface Book 2，高分辨率屏幕下开了屏幕缩放200%，因此ImageGrab抓取的屏幕只有左上角。可以参考下面的方法把python注册成高DPI。

[参考资料](https://stackoverflow.com/questions/25467288/pils-imagegrab-is-capturing-at-the-wrong-resolution)

```
I manage to overcome this issue by adding registry key at

HKEY_CURRENT_USER\Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers

add a key with the path to your python.exe and pythonw.exe and in value set HIGHDPIAWARE

like so:

"C:\Users\Greg\Anaconda3\python.exe"="HIGHDPIAWARE" "C:\Users\Greg\Anaconda3\pythonw.exe"="HIGHDPIAWARE"

then everythings should be ok :)
```

# 3. 看看结果

框住一段文字看看

![试试看](/pics/Tools/TextRecognition/finaltest1.png)

文本框中出现文本，剪贴板上也有了，可以直接复制。

![试试看](/pics/Tools/TextRecognition/finaltest2.png)

# 4. 打包
打包成exe啊!!!
pyinstaller老把一堆没用的库一起打包进来，不如勇哥虚拟环境

```bash
pip install virtualenv

virtualenv Name
```

然后cd进入虚拟环境（name你自己起）里面的Scripts文件夹中，输入activate激活虚拟环境

然后安装必要模块，比如本篇用到的
```bash
baidu-aip
pillow
pywin32  (里面有win32clipboard)
pyinstaller
```

都安装好后把我们的文件放到这个虚拟环境的目录下，进入文件夹，输入

```bash
pyinstaller -F main.py
```

其常见参数列表有
|参数|效果|
|:-:|:-:|
|-F，-onefile|	产生单个的可执行文件|
|-D，--onedir	|产生一个目录（包含多个文件）作为可执行程序|
|-a，--ascii	|不包含 Unicode 字符集支持|
|-d，--debug	|产生 debug 版本的可执行文件|
|-w，--windowed，--noconsolc	|指定程序运行时不显示命令行窗口（仅对 Windows 有效）|
|-c，--nowindowed，--console	|指定使用命令行窗口运行程序（仅对 Windows 有效）|
|-o DIR，--out=DIR	|指定 spec 文件的生成目录。如果没有指定，则默认使用当前目录来生成 spec 文件|
|-p DIR，--path=DIR	|设置 Python 导入模块的路径（和设置 PYTHONPATH 环境变量的作用相似）。也可使用路径分隔符（Windows 使用分号，Linux 使用冒号）来分隔多个路径|
|-n NAME，--name=NAME	|指定项目（产生的 spec）名字。如果省略该选项，那么第一个脚本的主文件名将作为 spec 的名字|

即可获得我们的exe可执行文件，齐活！！！

# 5. 完整代码


[CSDN](https://download.csdn.net/download/kzz6991/12581758)

[Github](https://github.com/PaiPai121/ToolsBasedOnBaidu)