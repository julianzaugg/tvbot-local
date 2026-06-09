function _ccw(a, b, c) {
    return (c[1] - a[1]) * (b[0] - a[0]) > (b[1] - a[1]) * (c[0] - a[0]);
}

function intersect(seg1, seg2) {
    const a = seg1[0];
    const b = seg1[1];
    const c = seg2[0];
    const d = seg2[1];

    return _ccw(a, c, d) !== _ccw(b, c, d) && _ccw(a, b, c) !== _ccw(a, b, d);
}

export {intersect};
