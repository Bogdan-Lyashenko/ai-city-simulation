import { slowDown } from '../utils/animation';
import { startDriving } from './driving/Driving';

import { createCar } from '../city/traffic/car/Car';
import { createStatsCollector } from './stats/Stats';

const SLOW_WORLD = 250;

const CAR_POSITION = { x: 200, y: 60 };

export const setupLearningDriving = world => {
    const learningCar = createCar(world, {
        initialPhysics: { ...CAR_POSITION }
    });

    const roadCamera = learningCar.accessRoadCamera();
    const learningStatsCollector = createStatsCollector();

    startDriving(learningCar);

    return {
        start() {
            this.listenerID = world.onTick(
                slowDown(() => {
                    roadCamera.highlightPhotoArea();

                    learningStatsCollector.collect({
                        carStats: learningCar.getStatsData(),
                        roadPhoto: roadCamera.takePhoto()
                    });
                }, SLOW_WORLD)
            );
        },

        stop() {
            Number.isInteger(this.listenerID) &&
                world.removeListener(this.listenerID);
        }
    };
};
