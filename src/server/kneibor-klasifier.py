import warnings
warnings.filterwarnings(action="ignore", module="scipy", message="^internal gelsd")

from sklearn import neighbors

X = [[60, 1], [55, 1], [40, 1], [70, 1], [80, 1], [65, 1]]
y = [5, 6, 8, 4, 3, 6]

model = neighbors.KNeighborsClassifier(n_neighbors=3)
model.fit(X, y)

predictions = model.predict([[65,1]])

print(predictions);