import { getCanvasHandlers, drawFillRect } from '../utils/canvas';

const getView2D = () => {
    //TODO: IDs to config
    const roadCanvas = document.getElementById('static-stage');
    const helperCanvas = document.getElementById('helper-stage');

    return {
        getRoadView() {
            const roadStage = getCanvasHandlers(roadCanvas);

            return {
                getImageData(x, y, w, h) {
                    return roadStage.ctx.getImageData(x, y, w, h);
                }
            };
        },

        getHelperView() {
            const helperStage = getCanvasHandlers(helperCanvas);

            return {
                highlightArea(x, y, w, h) {
                    helperStage.clear();
                    drawFillRect(helperStage.ctx, { x, y, w, h });
                }
            };
        }
    };
};

export const ViewMap = {
    view2D: getView2D()
};

//TODO: config
const CurrentView = ViewMap.view2D;

export const createWorldView = () => CurrentView;
