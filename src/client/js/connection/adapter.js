import connection from './connection';

export const sendData = (type, data) => {
    const json = JSON.stringify({ type, data });
    return connection.sendMessage(json);
};

export const parseReceivedData = data => {
    return JSON.parse(data);
};
