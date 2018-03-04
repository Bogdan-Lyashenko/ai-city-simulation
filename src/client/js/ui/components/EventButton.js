import { h } from 'hyperapp';

export const EventButton = ({ title, eventName, onClick }) => (
    <button onclick={data => onClick(eventName, data)} title={eventName}>
        {title}
    </button>
);
