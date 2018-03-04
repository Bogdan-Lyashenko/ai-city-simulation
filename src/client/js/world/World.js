import { initRequestAnimationFrameLoop } from '../utils/animation';
import { createWorldView } from '../render/View';

const worldConfig = {
    TICK_TIME: 10 //5000
};

export const createWorld = config => {
    const worldView = createWorldView();

    let previousTs = 0,
        isWorldStarted = false;

    const listeners = [];

    const dynamicEntries = [];
    const staticEntries = [];

    return {
        startTime() {
            if (isWorldStarted) return;
            isWorldStarted = true;

            initRequestAnimationFrameLoop(currentTs => {
                const delta = currentTs - previousTs;

                if (delta >= config.TICK_TIME) {
                    listeners.forEach(l => l(delta));
                    previousTs = currentTs;
                }
            });
        },

        onTick(fn) {
            listeners.push(fn);
            return listeners.length - 1;
        },

        addDynamicEntry(entry) {
            dynamicEntries.push(entry);
        },

        getDynamicEntries() {
            return dynamicEntries;
        },

        addStaticEntry(entry) {
            staticEntries.push(entry);
        },

        getStaticEntries() {
            return staticEntries;
        },

        getView() {
            return worldView;
        }
    };
};

const world = createWorld(worldConfig);
export default world;
