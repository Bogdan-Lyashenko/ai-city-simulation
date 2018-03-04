import { DEVICE_TYPES } from '../../../../utils/constants';

export const createNavigator = () => {
    return {
        type: DEVICE_TYPES.NAVIGATOR,

        getCurrentPosition() {
            return {};
        }
    };
};
