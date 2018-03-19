import warnings
warnings.filterwarnings(action="ignore", module="scipy", message="^internal gelsd")

import pandas as pd
import numpy as np
from sklearn import neighbors
from sklearn.linear_model import LinearRegression

from read_stats import get_data_for_model

data = get_data_for_model()

X = data["X"]
y = data["y"]

print(y[25])

test = X.pop(25)
new_y = np.delete(y, [25])

model = LinearRegression()
model.fit(X, new_y)

print(model.predict([test]))