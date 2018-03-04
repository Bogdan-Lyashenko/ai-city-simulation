import { ObjectsTypeMap } from '../../utils/constants';

export const createMap = world => {
    const map = {
        hasVisualView() {
            return true;
        },
        getVisualData() {
            return {
                pt: {
                    x: 0,
                    y: 0
                }
            };
        },
        getType() {
            return ObjectsTypeMap.ROAD_MAP;
        }
    };

    world.addStaticEntry(map);

    return map;
};
