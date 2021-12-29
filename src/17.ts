export { };

// https://adventofcode.com/2021/day/17

const target = {
    x0: 288, y0: -96,
    x1: 330, y1: -50,
}

const simulateShot = (dx: number, dy: number): number | undefined => {
    let x = 0;
    let y = 0;
    let maxY = y;
    do {
        maxY = Math.max(y, maxY);
        if (x >= target.x0 && x <= target.x1 && y <= target.y1 && y >= target.y0) {
            // Hit
            return maxY;
        } else if (y < target.y0) {
            return;
        }
        x += dx;
        y += dy;

        dx = dx === 0 ? 0 : dx > 0 ? dx - 1 : dx + 1;
        dy -= 1;
    } while (true);
}

const MAX = 512;
let count = 0;

for (let dx = 0 ; dx<MAX ; ++dx) {

    for (let dy = -MAX ; dy<MAX ; ++dy) {
        const res = simulateShot(dx, dy);
        if (res !== undefined) {
            ++count;
        }
    }
}

console.log('Count:', count);
