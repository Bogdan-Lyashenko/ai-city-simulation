import asyncio
import websockets
import json
from fs.store_stats import store_stats

stats_csv_file = 'fs/store/car_stats.csv'
images_folder = 'fs/store/road_images/'

def get_response_for_msg(msg):
	return "{}"

def handle_request(msg):
	j = json.loads(msg)

	if j["type"] == 'learning_model_one_data':
		return store_stats(j["data"], stats_csv_file, images_folder)

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