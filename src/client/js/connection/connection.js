import { maintain } from './maintainer';

let isInit = false;

const createConnection = () => ({
    init(route = 'ws://127.0.0.1:8765/') {
        this.ws = new WebSocket(route);
        this.ws.onmessage = event => this.onMessage(event.data);

        isInit = true;
    },

    onMessage(msg) {
        try {
            this.safeCheck();
            maintain(msg);
        } catch (e) {}
    },

    sendMessage(msg) {
        try {
            this.safeCheck();
            this.ws.send(msg);
        } catch (e) {}
    },

    safeCheck() {
        if (!isInit) throw new Error('connection is not init');
    }
});

const connection = createConnection();
export default connection;
