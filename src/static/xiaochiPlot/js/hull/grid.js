function _pointKey(point) {
    return point[0] + "," + point[1];
}

function grid(points, cellSize) {
    const cells = new Map();
    const safeCellSize = Math.max(cellSize || 1, 1);

    function pointToCell(point) {
        return [
            Math.floor(point[0] / safeCellSize),
            Math.floor(point[1] / safeCellSize)
        ];
    }

    function cellKey(x, y) {
        return x + "," + y;
    }

    function addPoint(point) {
        const cell = pointToCell(point);
        const key = cellKey(cell[0], cell[1]);
        if (!cells.has(key)) {
            cells.set(key, []);
        }
        cells.get(key).push(point);
    }

    points.forEach(addPoint);

    return {
        rangePoints(bbox) {
            const tlCell = pointToCell([bbox[0], bbox[1]]);
            const brCell = pointToCell([bbox[2], bbox[3]]);
            const result = [];

            for (let x = tlCell[0]; x <= brCell[0]; x++) {
                for (let y = tlCell[1]; y <= brCell[1]; y++) {
                    const cell = cells.get(cellKey(x, y));
                    if (!cell) {
                        continue;
                    }
                    for (let i = 0; i < cell.length; i++) {
                        const point = cell[i];
                        if (point[0] >= bbox[0] && point[0] <= bbox[2] && point[1] >= bbox[1] && point[1] <= bbox[3]) {
                            result.push(point);
                        }
                    }
                }
            }

            return result;
        },

        removePoint(point) {
            const cell = pointToCell(point);
            const key = cellKey(cell[0], cell[1]);
            const pointsInCell = cells.get(key);

            if (!pointsInCell) {
                return;
            }

            const pointKey = _pointKey(point);
            const index = pointsInCell.findIndex(function(candidate) {
                return _pointKey(candidate) === pointKey;
            });

            if (index >= 0) {
                pointsInCell.splice(index, 1);
            }
        },

        extendBbox(bbox, scaleFactor) {
            return [
                bbox[0] - scaleFactor * safeCellSize,
                bbox[1] - scaleFactor * safeCellSize,
                bbox[2] + scaleFactor * safeCellSize,
                bbox[3] + scaleFactor * safeCellSize
            ];
        }
    };
}

export {grid};
