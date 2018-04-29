import { createCamera } from './Camera';
import { createNavigator } from './Navigator';
import { createAutoPilot } from './auto-pilot/AutoPilot';

const EquipmentBus = (world, car, devices = {}) => ({
    accessCar() {
        return car;
    },

    getAutoPilot() {
        return devices.autoPilot;
    },

    getRoadCamera() {
        return devices.roadCamera;
    },

    connectDevice({ type, device }) {
        devices[type] = device;
    },

    setup() {
        const equipmentBus = this;
        const worldView = world.getView();

        this.connectDevice({
            type: 'roadCamera',
            device: createCamera({
                equipmentBus,
                targetView: worldView.getRoadView(),
                helperView: worldView.getHelperView()
            })
        });

        this.connectDevice({
            type: 'navigator',
            device: createNavigator({
                equipmentBus
            })
        });

        this.connectDevice({
            type: 'autoPilot',
            device: createAutoPilot({
                equipmentBus
            })
        });
    }
});

export const createEquipmentBus = (world, car) => {
    const equipmentBus = EquipmentBus(world, car);

    equipmentBus.setup();

    return equipmentBus;
};
