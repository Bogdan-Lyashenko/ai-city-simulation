import { createPublishSubscriber } from '../utils/events';

const publishSubscriber = createPublishSubscriber();

export const triggerUiEvent = (type, data = {}) => {
    publishSubscriber.publish(type, data);
};

export const onUiEvent = (event, fn) => {
    publishSubscriber.subscribe(event, fn);
};

export const EVENTS = {
    START_LEARN: 'START_LEARN',
    STOP_LEARN: 'STOP_LEARN'
};
