import world from './world/World';
import connection from './connection/connection';

import { createCity } from './city/City';
import { createRender } from './render/Render';
import { startLearningDriving } from './learning/Learning';

import { createStorage } from './utils/storage';
import { createUiLayer } from './ui/UiLayer';

export default {
    start(mountNode) {
        createUiLayer(mountNode);
        //connection.init(); //TODO: uncomment when need socket

        const city = createCity(world);
        const render = createRender(world);
        //TODO: moving this line breaks car rendering
        startLearningDriving(world);

        const storage = createStorage();
        storage.setData(render.getInitialVisualData());

        Promise.all([storage.load()]).then(() => {
            city.init();

            world.startTime();
            render.start();
        });
    }
};
