import { STATS_CONFIG } from '../../utils/constants';
import { createCanvasForImageTransfer } from '../../utils/canvas';

import { sendLearningModelOneData } from '../../connection/models/learning';
import { defineTableModel, setTableRows, setImageData } from '../../ui/actions';

const TableModel = [
    'speed',
    'steerAngle',
    'left',
    'right',
    'throttle',
    'brake'
];

export const createStatsCollector = () => {
    const canvasForImageTransfer = createCanvasForImageTransfer({
        size: STATS_CONFIG.CAMERA_SIZE,
        imageType: STATS_CONFIG.IMAGE_TYPE,
        scale: STATS_CONFIG.ROAD_IMAGE_SCALE
    });

    const store = {
        limit: 10,
        data: []
    };

    defineTableModel(TableModel);

    return {
        manageStore(dataRecord) {
            if (store.data.length >= store.limit) {
                sendLearningModelOneData(store.data);
                store.data = [];
            }

            store.data.push(dataRecord);
        },

        visualize(carStats, photo) {
            const row = TableModel.map(field => carStats[field]);
            setTableRows([row]);
            setImageData(photo);
        },

        collect({ carStats, roadPhoto }) {
            this.manageStore({
                id: Date.now(),
                carStats,
                roadPhoto: {
                    ...canvasForImageTransfer.covertImageDataToBase64(roadPhoto)
                }
            });

            this.visualize(carStats, roadPhoto);
        }
    };
};
