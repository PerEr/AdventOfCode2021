export { };

// https://adventofcode.com/2021/day/15
// A twist https://en.wikipedia.org/wiki/Dijkstra's_algorithm

const values = `
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581
`
    .split('\n')
    .filter((v) => v)
    .map((l) => l.split('').map((e) => +e));

const height = values.length;
const width = values[0].length;

const cost = values.map((l) => l.map((v) => undefined)) as (number|undefined)[][];
const visited = values.map((l) => l.map((v) => false));

cost[0][0] = 0;

let xmin = undefined as undefined | number;
let ymin = undefined as undefined | number;
let costmin = 1 as undefined | number;

while (costmin !== undefined && !(xmin === width - 1 && ymin === height - 1)) {
    xmin = ymin = costmin = undefined;

    for (let y=0 ; y<height ; y++) {
        for (let x=0 ; x<width ; x++) {
            if (!visited[y][x]) {
                if (cost[y][x] !== undefined && (costmin === undefined || cost[y][x]! < costmin!)) {
                    costmin = cost[y][x]!;
                    xmin = x;
                    ymin = y;
                }
            }
        }
    }

    if (costmin !== undefined) {
        visited[ymin!][xmin!] = true;
        [[-1,0], [1,0], [0,-1], [0, 1]].forEach(([dy, dx]) => {
            const xp = xmin! + dx;
            const yp = ymin! + dy;
            if (xp >= 0 && xp < width && yp >= 0 && yp < height) {
                if (!visited[yp][xp]) {
                    const alt = costmin! + values[yp][xp];
                    cost[yp][xp] = cost[yp][xp] ? Math.min(cost[yp][xp]!, alt) : alt;
                }
            }
        });
    }
}

console.log(cost[height-1][width-1]);
