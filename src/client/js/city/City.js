import { createTraffic } from './traffic/Traffic';
import { createMap } from './map/Map';

const City = (world, state) => ({
    init() {
        //TODO: now is learning
        const traffic = createTraffic(world);
        //traffic.init();
        const map = createMap(world);
    }
});

export const createCity = (world, state = {}) => {
    return City(world, {
        ...state
    });
};
