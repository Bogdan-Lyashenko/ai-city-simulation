import { h } from 'hyperapp';

export const Table = ({ head, rows, className }) => (
    <table className={className}>
        <thead>{head.map(column => <th>{column}</th>)}</thead>

        <tbody>
            {rows.map(row => <tr>{row.map(value => <td>{value}</td>)}</tr>)}
        </tbody>
    </table>
);
