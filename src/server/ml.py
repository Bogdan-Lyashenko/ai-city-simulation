import warnings
warnings.filterwarnings(action="ignore", module="scipy", message="^internal gelsd")

from sklearn import datasets
from sklearn import metrics
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

#
features = [[140, 1], [130, 1], [150, 0], [170, 0]]
labels = [0, 0, 1, 1]

model = LinearRegression()
model.fit(features, labels)

predictions = model.predict([[120, 1]])
print(predictions)
#coefficient of determination
#print(model.score(X_test, y_test))