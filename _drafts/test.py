import matplotlib.pyplot as plt
import numpy as np


x = np.linspace(-10,10,1000)

y1 = -x*x
y2 = -5*x
plt.plot(x,y1)
plt.plot(x,y2)
plt.plot(2.5,-2.5*5,"*")
plt.plot(2.5,-2.5*2.5,"*")
plt.show()