function _getXY(point, format) {
    if (!format) {
        return point;
    }

    return [point[format[0]], point[format[1]]];
}

function _setXY(point, xy, format) {
    if (!format) {
        return xy;
    }

    point[format[0]] = xy[0];
    point[format[1]] = xy[1];
    return point;
}

const formatUtil = {
    toXy(pointset, format) {
        if (!format) {
            return pointset;
        }

        return pointset.map(function(point) {
            return _getXY(point, format);
        });
    },

    fromXy(pointset, format) {
        if (!format) {
            return pointset;
        }

        return pointset.map(function(point) {
            return _setXY({}, point, format);
        });
    }
};

export {formatUtil};
