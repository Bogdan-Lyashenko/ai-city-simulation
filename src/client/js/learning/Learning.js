import { slowDown } from '../utils/animation';
import { startDriving } from './driving/Driving';

import { createCar } from '../city/traffic/car/Car';
import { createStatsCollector } from './stats/Stats';
import { isStatsValid } from './stats/statsValidation';

const SLOW_WORLD = 50;

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

                    const carStats = learningCar.getStatsData();
                    if (isStatsValid(carStats)) {
                        console.log('collect...');
                        learningStatsCollector.collect({
                            carStats,
                            roadPhoto: roadCamera.takePhoto()
                        });
                    }
                }, SLOW_WORLD)
            );
        },

        stop() {
            Number.isInteger(this.listenerID) &&
                world.removeListener(this.listenerID);
        }
    };
};
