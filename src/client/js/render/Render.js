/**
 *
 * It should be easy to switch to 3d render, etc
 */

import setup2dRender from './canvas-2d/Canvas2dRender';
import setup2dVisual from './canvas-2d/VisualConfig';

export const RenderMap = {
    render2D: {
        createRender(id, visual) {
            const canvas = document.getElementById(id);
            return setup2dRender(canvas, visual);
        },

        visual() {
            return setup2dVisual();
        }
    }
};

//TODO: config
const CurrentRender = RenderMap.render2D;

export const createRender = world => {
    const visual = CurrentRender.visual();
    //TODO: IDs move to config
    const dRender = CurrentRender.createRender('dynamic-stage', visual);
    const sRender = CurrentRender.createRender('static-stage', visual);

    return {
        start() {
            this.renderDynamics();
            this.renderStatics();
        },

        renderDynamics() {
            const visualEntries = world
                .getDynamicEntries()
                .filter(e => e.hasVisualView && e.hasVisualView()); //TODO: think how it will be dynamically updated if some of entries get view

            world.onTick(() => {
                dRender.clear();
                visualEntries.forEach(e =>
                    dRender.renderEntry(e.getType(), e.getVisualData())
                );
            });
        },

        renderStatics() {
            const visualEntries = world
                .getStaticEntries()
                .filter(e => e.hasVisualView && e.hasVisualView());

            visualEntries.forEach(e =>
                sRender.renderEntry(e.getType(), e.getVisualData())
            );
        },

        getInitialVisualData() {
            return visual.getInitialDataConfig();
        }
    };
};
