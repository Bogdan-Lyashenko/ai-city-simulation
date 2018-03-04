import { h, app } from 'hyperapp';
import { Table } from './components/Table';
import { Canvas, putImageData, clearRect } from './components/Canvas';
import { state } from './state';
import { uiActions, linkActionsCopy } from './actions';
import { STATS_CONFIG } from '../utils/constants';

const SIZE = STATS_CONFIG.CAMERA_SIZE;

const onCanvasUpdate = (el, oldAttributes, state) => {
    const subState = state.learning.cameraMonitor;
    if (
        oldAttributes.imageData !== subState.imageData &&
        subState.context &&
        subState.imageData
    ) {
        clearRect(subState.context, SIZE);
        putImageData(subState.context, subState.imageData);
    }
};

const view = (state, actions) => (
    <div>
        <Table
            className="stats"
            head={state.learning.stats.tableHead}
            rows={state.learning.stats.tableRows}
        />
        <Canvas
            width={SIZE}
            height={SIZE}
            className="camera-monitor"
            onCreate={el => actions.learning.cameraMonitor.setContext(el)}
            onUpdate={(el, oldAttr) => onCanvasUpdate(el, oldAttr, state)}
        />
    </div>
);

export const createUiLayer = node => {
    const actionsCopy = app(state, uiActions, view, node);
    linkActionsCopy(actionsCopy);
};
