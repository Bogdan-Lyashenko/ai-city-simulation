import input from './Input';

const ActionMap = {
    39: 'left',
    37: 'right',
    38: 'throttle',
    40: 'brake',
    32: 'ebrake'
};

export const startDriving = car => {
    input.onKeyDown(code => {
        if (ActionMap[code]) car.setDrivingInput({ [ActionMap[code]]: 1 });
    });

    input.onKeyUp(code => {
        if (ActionMap[code]) car.setDrivingInput({ [ActionMap[code]]: 0 });
    });
};

export const stopDriving = () => {
    input.removeListeners();
};
