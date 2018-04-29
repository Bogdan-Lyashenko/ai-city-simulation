import warnings
warnings.filterwarnings(action="ignore", module="scipy", message="^internal gelsd")

import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.externals import joblib
from sklearn import neighbors

def train_model(data, file):
	X = data["X"]
	y = data["y"]

	model = neighbors.KNeighborsClassifier(n_neighbors=3)
	model.fit(X, y)
	joblib.dump(model, file)

def get_trained_model(file):
    return joblib.load(file)