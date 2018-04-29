import { DEVICE_TYPES } from '../../../../../utils/constants';
import { predictSteering } from './helper';

export const createAutoPilot = ({ equipmentBus }) => {
    const state = {};

    return {
        type: DEVICE_TYPES.AUTOPILOT,

        drive() {
            this.grab()
                .then(info => this.decide(info))
                .then(inputs => this.applyToInputs(inputs));
        },

        grab() {
            const roadCamera = equipmentBus.getRoadCamera();

            const photo = roadCamera.takePhoto();
            return predictSteering(photo).then(steering => ({ steering }));
        },

        decide(info) {
            const steering = info.steering;

            const STEERING_MAP = {
                LEFT: 'L',
                RIGHT: 'R',
                NONE: 'N'
            };

            return {
                right: steering === STEERING_MAP.RIGHT ? 1 : 0,
                left: steering === STEERING_MAP.LEFT ? 1 : 0,
            };
        },

        applyToInputs(inputs) {
            equipmentBus.accessCar().setDrivingInput(inputs);
        }
    };
};
