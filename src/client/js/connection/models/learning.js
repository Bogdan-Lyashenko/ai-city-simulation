import { sendData } from '../adapter';

const prepareData = data => ({
    stats: data.map(({ id, carStats }) => ({ id, ...carStats })),
    images: data.map(({ id, roadPhoto }) => ({
        name: id + '.' + roadPhoto.type,
        base64: roadPhoto.image
    }))
});

export const sendLearningModelOneData = data => {
    return sendData('learning_model_one_data', prepareData(data));
};
