import { h } from 'hyperapp';

export const Canvas = ({
    imageData,
    width,
    height,
    className,
    onCreate,
    onUpdate
}) => (
    <canvas
        oncreate={onCreate}
        onupdate={onUpdate}
        className={className}
        width={width}
        height={height}
    />
);

export const clearRect = (ctx, size) => {
    ctx.clearRect(0, 0, size, size);
};

export const putImageData = (ctx, imageData) => {
    ctx.drawImage(imageData, 0, 0);
};
