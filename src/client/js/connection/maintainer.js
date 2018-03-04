import { createPublishSubscriber } from '../utils/events';
import { parseReceivedData } from './adapter';

const publishSubscriber = createPublishSubscriber();

export const maintain = response => {
    const { type, data } = parseReceivedData(response);

    //TODO: smart handling blah-blah
    publishSubscriber.publish(type, data);
};

export const on = (event, fn) => {
    publishSubscriber.subscribe(event, fn);
};
