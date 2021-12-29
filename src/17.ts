export { };

// https://adventofcode.com/2021/day/17

const target = {
    x0: 288, y0: -96,
    x1: 330, y1: -50,
}

const target2 = {
    x0: 20, y0: -10,
    x1: 30, y1: -5,
}

type HitType = 'Over' | 'Under' | 'Hit' | 'ThroughX'| 'ThroughY';

interface Result {
    maxY: number;
    hit: HitType;
}

const simulateShot = (dx: number, dy: number): Result => {
    let oldX = 0;
    let x = 0;
    let oldY = 0;
    let y = 0;
    let maxY = y;
    do {
        maxY = Math.max(y, maxY);
        if (x >= target.x0 && x <= target.x1 && y <= target.y1 && y >= target.y0) {
            // Hit
            return {
                maxY,
                hit: 'Hit',
            };
        } else if (x > target.x1 && oldX < target.x0) {
            return {
                maxY,
                hit: 'ThroughX',
            };
        } else if (y < target.y0 && oldY > target.y1) {
            return {
                maxY,
                hit: 'ThroughY',
            };
        } else if (y < target.y0) {
            return {
                maxY,
                hit: x < target.x0 ? 'Under' : 'Over',
            };
        }
        oldX = x;
        oldY = y;
        x += dx;
        y += dy;

        dx = dx > 0 ? dx - 1 : dx + 1;
        dy -= 1;
    } while (true);
}

let dx = 17;
let dy = -4;

let best = -100;
let more = 100;

while (--more) {
    const res = simulateShot(dx, dy);
    console.log(dx, dy, res, best);
    switch (res.hit) {
        case 'ThroughX':
            dx -= 1;
            break;
        case 'ThroughY':
            dy -= 1;
            break;
        case 'Under':
            dx += 1;
        break;
        case 'Over':
            dy += 1;
            dx -= 1;
            break;
        case 'Hit':
            if (res.maxY > best) {
                best = res.maxY;
                more = 100;
            }
            dy += 1;
            break;
    }
}

console.log('Best:', best);

const MAX = 250;
best = 0;

for (let dx = 0 ; dx<MAX ; ++dx) {

    for (let dy = 0 ; dy<MAX ; ++dy) {
        const res = simulateShot(dx, dy);
        if (res.hit === 'Hit') {
            if (res.maxY > best) {
                console.log(dx, dy, res);
                best = res.maxY;
            }
        }
    }
}

console.log('Best2:', best);
