import { sendData } from '../adapter';
import { on } from '../maintainer';

let waitForResponse = {};

on('was_predicted_by_model_one', ({ steering, id }) => {
    if (id === waitForResponse.id) {
        return waitForResponse.resolve(steering);
    }

    waitForResponse.reject();
    console.log('MISMATCH')
});

export const predictSteeringByRoadPhoto = image => {
    const id = Date.now();

    sendData('predict_by_model_one', {
        id,
        image
    });

    return new Promise((resolve, reject) => {
        waitForResponse = {resolve, reject, id};
    });
};
