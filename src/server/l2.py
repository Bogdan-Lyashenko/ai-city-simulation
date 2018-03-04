import warnings
warnings.filterwarnings(action="ignore", module="scipy", message="^internal gelsd")

from sklearn.linear_model import LinearRegression

X = [[60, 1], [55, 1], [40, 1], [70, 1], [80, 1], [65, 1]]
y = [120, 110, 80, 140, 160, 130]

model = LinearRegression()
model.fit(X, y)

predictions = model.predict([[200,1]])#400

print(predictions);