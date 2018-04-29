import { sendData } from '../adapter';

const STEERING_MAP = {
    LEFT: 'L',
    RIGHT: 'R',
    NONE: 'N'
};

const getSteeringLabel = carStats => {
    if (carStats.left) return STEERING_MAP.LEFT;
    if (carStats.right) return STEERING_MAP.RIGHT;
    return STEERING_MAP.NONE;
};

const prepareData = data => ({
    stats: data.map(({ id, carStats }) => ({
        i:id,
        id,
        steering: getSteeringLabel(carStats)
    })),
    images: data.map(({ id, roadPhoto }) => ({
        name: id + '.' + roadPhoto.type,
        base64: roadPhoto.image
    }))
});

export const sendLearningModelOneData = data => {
    return sendData('learning_model_one_data', prepareData(data));
};
