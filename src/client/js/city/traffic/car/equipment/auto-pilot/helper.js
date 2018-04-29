import { createCanvasForImageTransfer } from '../../../../../utils/canvas';
import { ROAD_PHOTO_CONFIG } from '../../../../../utils/constants';
import { predictSteeringByRoadPhoto } from '../../../../../connection/models/predicting';

const canvasForImageTransfer = createCanvasForImageTransfer({
    size: ROAD_PHOTO_CONFIG.CAMERA_SIZE,
    imageType: ROAD_PHOTO_CONFIG.IMAGE_TYPE,
    scale: ROAD_PHOTO_CONFIG.ROAD_IMAGE_SCALE
});

export const predictSteering = roadPhoto => {
    const data = canvasForImageTransfer.covertImageDataToBase64(roadPhoto);

    return predictSteeringByRoadPhoto(data.image);
};
