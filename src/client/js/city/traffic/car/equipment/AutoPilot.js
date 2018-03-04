import { DEVICE_TYPES } from '../../../../utils/constants';

export const createAutoPilot = () => {
    const state = {};

    return {
        type: DEVICE_TYPES.AUTOPILOT
    };
};
