import world from './world/World';
import connection from './connection/connection';

import { createCity } from './city/City';
import { createRender } from './render/Render';
import { setupLearningDriving, setupTestDriving } from './learning/Learning';

import { createStorage } from './utils/storage';
import { createUiLayer } from './ui/UiLayer';
import { onUiEvent, EVENTS } from './ui/events';

export default {
    start(mountNode) {
        createUiLayer(mountNode);
        connection.init(); //TODO: uncomment when need socket

        const city = createCity(world);
        const render = createRender(world);

        //TODO: moving this line breaks car rendering
        //also, it should init only if it's learning mode

        //const learningDriving = setupTestDriving(world);
        const learningDriving = setupLearningDriving(world);

        onUiEvent(EVENTS.START_LEARN, () => learningDriving.start());
        onUiEvent(EVENTS.STOP_LEARN, () => learningDriving.stop());

        const storage = createStorage();
        storage.setData(render.getInitialVisualData());

        Promise.all([storage.load()]).then(() => {
            city.init();

            world.startTime();
            render.start();
        });
    }
};
