export function createShip(size) {
    let segmentHit = new Array(size).fill(false);
    return {
        size: size,
        getSize: function() {
            return size},
        hit: function(position) {
            segmentHit[position] = true;
        },
        isSunk: function() {
            return (segmentHit.every(val => val === true));
        }
    }
}