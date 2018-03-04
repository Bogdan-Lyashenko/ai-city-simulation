const RoadMap = {
    id: 'RoadMap',
    src: '/image/map.png',
    type: 'img'
};

const Car = {
    id: 'Car',
    src: '/image/car.png',
    type: 'img'
};

export default () => {
    return {
        getInitialDataConfig() {
            return [RoadMap, Car];
        },

        getVisualData() {
            return {
                RoadMap,
                Car
            };
        }
    };
};
