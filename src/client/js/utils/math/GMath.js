/**
 * Code is heavily based on source from
 * https://github.com/spacejack/carphysics2d
 */

export const GMath = {
    sign(n) {
        return typeof n === 'number'
            ? n ? (n < 0 ? -1 : 1) : n === n ? 0 : NaN
            : NaN;
    },

    clamp(n, min, max) {
        return Math.min(Math.max(n, min), max);
    },

    pmod(n, m) {
        return (n % m + m) % m;
    }
};
