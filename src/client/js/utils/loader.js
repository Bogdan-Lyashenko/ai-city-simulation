export const loadImage = path =>
    new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.src = path;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
