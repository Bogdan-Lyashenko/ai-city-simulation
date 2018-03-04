import { createCar } from './car/Car';

const DefaultTrafficState = {
    cars: [],
    TRAFFIC_LIGHTS: true
};

const Traffic = (world, state) => ({
    init() {
        this.createCars();
    },

    createCars() {
        const myCar = createCar(world, {
            registrationNumber: '1',
            model: 'Volvo XC90'
        });

        this.addCar(myCar);
    },

    addCar(car) {
        state.cars.push(car);
    }
});

export const createTraffic = (world, state = {}) => {
    return Traffic(world, {
        ...DefaultTrafficState,
        ...state
    });
};
