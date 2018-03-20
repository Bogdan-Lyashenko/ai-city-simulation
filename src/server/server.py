import asyncio
import websockets
import json
from fs.store_stats import store_stats
from fs.read_stats import get_data_for_model, convert_base64_to_grayscale_array
from model import train_model, get_trained_model

stats_csv_file = 'fs/store/car_stats.csv'
images_folder = 'fs/store/road_images/'
model_file = 'filename.pkl'

def get_response_for_msg(msg):
	return "{}"

ready_model = False
def predict_by_model_one(data):
	if ready_model == False:
		ready_model = get_trained_model(model_file)

	image = convert_base64_to_grayscale_array(data)
	return ready_model.predict([image])

def handle_request(msg):
	j = json.loads(msg)

	if j["type"] == 'learning_model_one_data':
		return store_stats(j["data"], stats_csv_file, images_folder)

	if j["type"] == 'train_model_one':
		data = get_data_for_model(stats_csv_file, images_folder)
		return train_model(data, model_file)

	if j["type"] == 'predict_by_model_one':
		return predict_by_model_one(j["data"])

	return

async def app(websocket, path):
    await websocket.send('{"type": "service", "data": {"message": "server started"}}')
    while True:
	    msg = await websocket.recv()
	    handle_request(msg)

	    answer = get_response_for_msg(msg)
	    await websocket.send(answer)

start_server = websockets.serve(app, 'localhost', 8765)
print("server: app started")

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()