import pandas as pd
import base64
import os
import numpy as np
from io import BytesIO
from PIL import Image

stats_csv_file_d = 'store/car_stats.csv'
images_folder_d = 'store/road_images/'

def get_data_for_model(stats_csv_file=stats_csv_file_d, images_folder=images_folder_d):
    stats_table = read_stats_from_csv(stats_csv_file)
    
    ids = stats_table['id']
    images = read_images_from_fs(images_folder, ids)

    return {
    	"X": images,
    	"y": stats_table["steerAngle"].values
    }

def merge_speed_to_image(speeds, images):
	list = []
	for index in range(len(speeds)):
		list.append([*images[index]])
	
	return list

def read_stats_from_csv(filename):
	return pd.read_csv(filename, index_col=0)

def read_images_from_fs(images_folder, ids):
	images = []
	for id in ids:
		image = get_image_grayscale(images_folder + str(id) + '.jpeg')
		images.append(image)
	
	return images

def get_image_grayscale(filename):
	img = Image.open(filename).convert('L')
	return np.array(img).flatten()

#use for ai driving (pass b64 here)
def convert_base64_to_grayscale_array(bs):
	return get_image_grayscale(BytesIO(base64.b64decode(bs)))

#start for learning
#stats = read_stats(stats_csv_file, images_folder)

#when received photo from client for model
#np.set_printoptions(threshold=np.nan)
#bs = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCABIAEgDASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAYHAQQFAgn/xAA6EAAABAMDCQQHCQAAAAAAAAAAAQIDBAUGERIhBxMUFRYXMZPSUlVh0SIzQUWBkZRRVGJjcXKhssL/xAAaAQEAAgMBAAAAAAAAAAAAAAAAAwcBBAYI/8QALREAAQMBBgMHBQAAAAAAAAAAAAECEQMEBQYSEzEHFDIVFiEiUZHRM0JxgsH/2gAMAwEAAhEDEQA/APmDD0hU0SVrckii/ei5/awbiMnlWqK05YlP6vt9QuUABTu7mrPuDfPR5jG7qre70c9HmLjAAU3u7q3u1HPb8xjd3V3diee31C5QAFMnk9q/uovqG+oYPJ/V5e6D57XULnAAUsdBVaXGTr+DrfUAukAAAdpidyOFlkzlyKOgIl2McM4WOjImJVEwLduCUE2420tVnFS21FidhFhYiapciIKVQSZFJGNVKJZOtQKSciTKz16jtzhYcDw44YmAOKAku3kftHtNqCms9mczoupIbQ7LLL2j3M3e/FZaPLE6ncPL5pLk01LFomqzccdXJ2lusGeNjDhpvMl4IMiEb6tOlGdyJPqpt2WwWq2zy1Jz43ytVYnaYTwkjgCQRU8m8TLZZK3adliG5WslocblLTbz/g84lJKdLwUZjaVWEx2jKpDo+niWTOZ0PUzZQdnazNl2948RhK9JdnJ7oSPuq30+qg9P1d8EVAdqGqdyGlszluopK6mZrNZvOwKVPQ5/Yyvi2XgWAxEVKURLZbLTp6TNlLV3zfbhTS9FY8Hl3vTL5CU0DjAJLtnDHUe0CqHppTWZzRy3R3igzwsvXSdJZK8SWAAjQDSjp3KJadkfModhXZW4RK+XEcpzKDSTZmnWt4y7LLh/zdAEiFhFgVgpcso9JkZHpzmH5C/Idkst8j9sU19M6OXxJdVpvPS5dE8szKxvHwXrwWx9cuBud7Xc5NXTy5W5unUmfTqQs8DwK0VmWW+n/bFN/Tu+QzvupsyMjiUY4epd8hy3da8k+1PdC+U484Lcn1np+abv4imyAjm8Kke9T5DnSMllApA/e5ch3pFonhHckQCPlXlJHwnCPi0sv8gAKXMzMzMzMzPEzMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/2Q=='
#print(convert_base64_to_grayscale_array(bs))