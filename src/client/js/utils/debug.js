import { getCanvasHandlers } from './canvas';

const { ctx, clear } = getCanvasHandlers(
    document.getElementById('debug-stage')
);

export const debugCtx = ctx;
export const clearDebugCtx = clear;
