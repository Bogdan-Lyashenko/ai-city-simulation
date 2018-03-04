import { DEVICE_TYPES } from '../../../../utils/constants';
import { createTempCanvas,getCanvasHandlers } from '../../../../utils/canvas';

const Camera = ({ targetView, helperView, car }) => {
    const { cgToRear, position } = car.getVisualData();

    const rSideBack = 3 * cgToRear,
        rSideForward = 2 * rSideBack;

    const tmpCanvas = createTempCanvas(rSideForward, rSideForward);
    const {ctx, clear} = getCanvasHandlers(tmpCanvas)

    return {
        highlightPhotoArea() {
            const { x, y } = position;

            return helperView.highlightArea(
                x - rSideBack,
                y - rSideBack,
                rSideForward,
                rSideForward
            );
        },

        takePhoto() {
            const { x, y } = position;

            const imageData = targetView.getImageData(
                x - rSideBack,
                y - rSideBack,
                rSideForward,
                rSideForward
            );

            clear();
            ctx.putImageData(imageData, 0, 0);

            //add
            return ctx.canvas;
        }
    };
};

export const createCamera = ({ targetView, helperView, equipmentBus }) => {
    return Camera({ targetView, helperView, car: equipmentBus.accessCar() });
};
