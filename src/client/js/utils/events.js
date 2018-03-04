export const createPublishSubscriber = () => {
    const subscribersMap = {};

    return {
        publish(event, data) {
            const subscribers = subscribersMap[event] || [];
            subscribers.forEach(s => s(data));
        },

        subscribe(event, fn) {
            if (!subscribersMap[event]) {
                subscribersMap[event] = [];
            }

            subscribersMap[event].push(fn);
        }
    };
};
