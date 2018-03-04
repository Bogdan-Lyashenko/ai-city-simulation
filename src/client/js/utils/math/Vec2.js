/**
 * Code is heavily based on source from
 * https://github.com/spacejack/carphysics2d
 */

export const Vec2 = function(x, y) {
    this.x = x || 0.0;
    this.y = y || 0.0;
};

Vec2.prototype = {
    set(x, y) {
        this.x = x;
        this.y = y;
    },

    copy(v) {
        this.x = v.x;
        this.y = v.y;

        return this;
    },

    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    dot(v) {
        return this.x * v.x + this.y * v.y;
    },

    det(v) {
        return this.x * v.y - this.y * v.x;
    },

    rotate(r) {
        let x = this.x,
            y = this.y,
            c = Math.cos(r),
            s = Math.sin(r);
        this.x = x * c - y * s;
        this.y = x * s + y * c;
    },

    angle() {
        return Math.atan2(this.y, this.x);
    },

    setLen(l) {
        let s = this.len();

        if (s > 0.0) {
            s = l / s;
            this.x *= s;
            this.y *= s;
        } else {
            this.x = l;
            this.y = 0.0;
        }
    },

    normalize() {
        this.setLen(1.0);
    }
};
