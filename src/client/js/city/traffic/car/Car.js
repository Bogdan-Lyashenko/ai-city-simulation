import { ObjectsTypeMap } from '../../../utils/constants';
import { slowDown } from '../../../utils/animation';
import { mergeObjectStructures } from '../../../utils/composition';
import { createCarPhysics } from './physics/CarPhysics';
import { createEquipmentBus } from './equipment/EquipmentBus';

const DefaultCarState = {
    type: ObjectsTypeMap.CAR,
    isVisible: true,
    initialPhysics: {
        x: 50,
        y: 50,
        smoothSteer: true,
        safeSteer: true,
        config: { maxSteer: 0.5, maxSpeed: 10 }
    }
};

const Car = (world, state) => ({
    setup() {
        this.physicalInstance = createCarPhysics(state.initialPhysics);
        this.equipmentBus = createEquipmentBus(world, this);

        world.addDynamicEntry(this);
        world.onTick(ts => this.physicalInstance.update(ts, 2, 0.6));

        const autoPilot = this.equipmentBus.getAutoPilot();
        world.onTick(
            slowDown(() => {
                if (state.autoPilotEnabled) {
                    autoPilot.drive();
                }
            }, 50)
        );
    },

    hasVisualView() {
        return state.isVisible;
    },

    getType() {
        return state.type;
    },

    getCarPhysData() {
        const { position, heading } = this.physicalInstance;

        return {
            position,
            heading
        };
    },

    getVisualData() {
        const scale = 12;
        const { config, position, heading } = this.physicalInstance;

        return {
            cgToRear: scale * config.cgToRear,
            halfWidth: scale * config.halfWidth,

            position,
            heading
        };
    },

    getStatsData() {
        const { velocity_c, steerAngle, inputs } = this.physicalInstance;

        return {
            speed: (velocity_c.x / 2 * 3.6).toFixed(1),
            steerAngle: steerAngle.toFixed(3),

            left: inputs.left,
            right: inputs.right,
            throttle: inputs.throttle,
            brake: inputs.brake
        };
    },

    setDrivingInput(input) {
        return this.physicalInstance.setInput(input);
    },

    accessRoadCamera() {
        return this.equipmentBus.getRoadCamera();
    }
});

export const createCar = (world, state = {}) => {
    const car = Car(world, {
        ...mergeObjectStructures(DefaultCarState, state)
    });

    car.setup();

    return car;
};
