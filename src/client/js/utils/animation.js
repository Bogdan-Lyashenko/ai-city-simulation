export const initRequestAnimationFrameLoop = animateFn => {
    function helperFn(ts) {
        animateFn(ts);
        window.requestAnimationFrame(helperFn);
    }

    window.requestAnimationFrame(helperFn);
};

const stopAnimationFrameLoop = id => window.cancelAnimationFrame(id);

export const slowDown = (fn, delay = 250, prevTime = 0) => () => {
    const newTime = Date.now();

    if (newTime - prevTime > delay) {
        fn();

        prevTime = newTime;
    }
};
