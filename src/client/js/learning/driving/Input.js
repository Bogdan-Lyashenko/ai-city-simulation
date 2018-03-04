const preventDefaultList = [32, 37, 38, 39, 40];
export const createInput = (document = document) => {
    return {
        onKeyDown(fn) {
            this.keyDownFn = e => {
                preventDefaultList.includes(e.keyCode) && e.preventDefault();
                fn(e.keyCode);
            };
            document.addEventListener('keydown', this.keyDownFn);
        },

        onKeyUp(fn) {
            this.keyUpFn = e => fn(e.keyCode);
            document.addEventListener('keyup', this.keyUpFn);
        },

        removeListeners() {
            this.keyDownFn &&
                document.removeEventListener('keydown', this.keyDownFn);
            this.keyUpFn && document.removeEventListener('keyup', this.keyUpFn);
        }
    };
};

const input = createInput(document);
export default input;
