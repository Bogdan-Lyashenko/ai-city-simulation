import warnings
warnings.filterwarnings(action="ignore", module="scipy", message="^internal gelsd")

import pandas as pd
import numpy as np
from sklearn import neighbors
from sklearn.linear_model import LinearRegression

from read_stats import read_images_from_fs


#start for learning
ids = [
	1,
	2,
	3,
	4,
	5,
	6,
	7
]

extra_data = []
X = read_images_from_fs('store/road_images/', ids)
y = [1.57, 1.3, 0.87, 0.61, 0.0, 0.09, 0.69]

model = LinearRegression()
model.fit(X, y)

test = read_images_from_fs('store/road_images/', ['test'])

print(model.predict([test[0]]))