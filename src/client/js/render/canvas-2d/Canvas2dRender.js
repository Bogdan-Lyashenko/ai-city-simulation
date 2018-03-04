import { getCanvasHandlers } from '../../utils/canvas';
import { ObjectsTypeMap } from '../../utils/constants';

export const EntriesRenders = {
    [ObjectsTypeMap.CAR](ctx, state, visualModel) {
        ctx.save();

        ctx.translate(state.position.x, state.position.y);
        ctx.rotate(state.heading);

        ctx.drawImage(visualModel.data, -state.cgToRear, -state.halfWidth);

        ctx.restore();
    },

    [ObjectsTypeMap.ROAD_MAP](ctx, state, visualModel) {
        ctx.drawImage(visualModel.data, state.pt.x, state.pt.y);
    }
};

export const getEntryRenderMethod = type => {
    if (!EntriesRenders[type]) {
        return () => {
            //TODO: add logger
            console.log('Opps, got lost by type' + type);
        };
    }

    return EntriesRenders[type];
};

export default (canvas, visual) => {
    const { ctx, clear } = getCanvasHandlers(canvas);

    return {
        clear,

        renderEntry(type, visualState) {
            const render = getEntryRenderMethod(type),
                visualData = visual.getVisualData();

            render(ctx, visualState, visualData[type]);
        }
    };
};
