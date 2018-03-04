import pandas as pd
import base64
import os

def store_stats(stats, stats_csv_file, images_folder):
    write_stats_to_csv(stats_csv_file, stats["stats"])
    write_images_to_fs(images_folder, stats["images"])


def write_stats_to_csv(filename, data):
	df = pd.DataFrame(data)
	if not os.path.isfile(filename):
		df.to_csv(filename, sep=',', index=False)
	else:
		df.to_csv(filename, sep=',', index=False, mode='a', header=False)

	return


def write_images_to_fs(folder, images):
	for image in images:
		create_image(folder + image["name"], image["base64"])


def create_image(filename, imgstring):
	imgdata = base64.b64decode(imgstring)

	with open(filename, 'wb') as f:
		f.write(imgdata)