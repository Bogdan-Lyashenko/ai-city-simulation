import { DEVICE_TYPES } from '../../../../utils/constants';
import { createTempCanvas, getCanvasHandlers } from '../../../../utils/canvas';

const addCarHeading = (
    ctx,
    rSideBack,
    heading,
    cgToRear,
    halfWidth,
    twoCgToRear
) => {
    ctx.save();
    ctx.translate(rSideBack, rSideBack);
    ctx.rotate(heading);
    ctx.fillRect(-cgToRear, -halfWidth, twoCgToRear, cgToRear);
    ctx.restore();
};

const Camera = ({ targetView, helperView, car }) => {
    const { cgToRear, halfWidth, position } = car.getVisualData();

    const twoCgToRear = 2 * cgToRear,
        rSideBack = 3 * cgToRear,
        rSideForward = 2 * rSideBack;

    const tmpCanvas = createTempCanvas(rSideForward, rSideForward);
    const { ctx, clear } = getCanvasHandlers(tmpCanvas);

    //TODO: theme
    ctx.fillStyle = 'red';

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
            const { heading } = car.getCarPhysData();

            const imageData = targetView.getImageData(
                x - rSideBack,
                y - rSideBack,
                rSideForward,
                rSideForward
            );

            clear();
            ctx.putImageData(imageData, 0, 0);

            //draw car rectangle
            addCarHeading(
                ctx,
                rSideBack,
                heading,
                cgToRear,
                halfWidth,
                twoCgToRear
            );

            return ctx.canvas;
        }
    };
};

export const createCamera = ({ targetView, helperView, equipmentBus }) => {
    return Camera({ targetView, helperView, car: equipmentBus.accessCar() });
};
