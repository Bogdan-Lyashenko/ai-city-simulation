export const getCanvasHandlers = canvas => {
    const ctx = canvas.getContext('2d');

    const canvasWidth = canvas.width,
        canvasHeight = canvas.height;

    return {
        canvas,
        canvasWidth,
        canvasHeight,
        ctx,
        clear() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        }
    };
};

export const drawFillRect = (ctx, { x, y, w, h }) => {
    ctx.fillStyle = 'rgba(255, 235, 59, 0.1)'; //TODO: config
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
};

export const createTempCanvas = (w = 500, h = 500) => {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;

    //document.body.appendChild(c)

    return c;
};

export const createCanvasForImageTransfer = ({ size, imageType, scale=0.5 }) => {
    const scaleSize = size * scale;
    const canvasForScale = createTempCanvas(scaleSize, scaleSize);
    const {ctx, clear} = getCanvasHandlers(canvasForScale);

    return {
        covertImageDataToBase64(img) {
            clear();
            ctx.drawImage(img, 0, 0, scaleSize, scaleSize);

            const b64str = canvasForScale.toDataURL(imageType);
            return {
                image: b64str.split('base64,')[1],
                type: imageType.split('image/')[1]
            };
        }
    };
};
