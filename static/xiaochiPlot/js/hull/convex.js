function _cross(o, a, b) {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

function convexHull(points) {
    if (points.length <= 1) {
        return points.slice();
    }

    const sorted = points.slice().sort(function(a, b) {
        return (a[0] - b[0]) || (a[1] - b[1]);
    });

    const lower = [];
    for (let i = 0; i < sorted.length; i++) {
        while (lower.length >= 2 && _cross(lower[lower.length - 2], lower[lower.length - 1], sorted[i]) <= 0) {
            lower.pop();
        }
        lower.push(sorted[i]);
    }

    const upper = [];
    for (let i = sorted.length - 1; i >= 0; i--) {
        while (upper.length >= 2 && _cross(upper[upper.length - 2], upper[upper.length - 1], sorted[i]) <= 0) {
            upper.pop();
        }
        upper.push(sorted[i]);
    }

    upper.pop();
    lower.pop();

    const hull = lower.concat(upper);
    if (hull.length > 0) {
        hull.push(hull[0]);
    }

    return hull;
}

export {convexHull};
