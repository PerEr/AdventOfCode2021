export { };

// https://adventofcode.com/2021/day/11

const values: readonly number[][] = `
8258741254
3335286211
8468661311
6164578353
2138414553
1785385447
3441133751
3586862837
7568272878
6833643144
`
    .split('\n')
    .filter((v) => v)
    .map((l) => l.split('').map((v) => +v));

const evolveFlash = (vs: readonly number[][]): number[][] => {
    const res: number[][] = [];
    vs.forEach((r) => res.push(Object.assign([], r)));

    const deltas = [
        { dc: -1, dr: -1},
        { dc: 0, dr: -1},
        { dc: 1, dr: -1},
        { dc: -1, dr: 0},
        { dc: 1, dr: 0},
        { dc: -1, dr: 1},
        { dc: 0, dr: 1},
        { dc: 1, dr: 1},
    ]

    const inrange = (r: number, c: number): boolean => r >= 0 && r < res.length && c >= 0 && c < res[r].length;

    let more = true;
    while (more) {
        more = false;
        res.map((r, rix) => {
            r.map((c, cix) => {
                if (c > 9) {
                    deltas.forEach((d) => {
                        const ri = rix + d.dr;
                        const ci = cix + d.dc;
                        if (inrange(ri, ci)) {
                            if (res[ri][ci] > 0) {
                                more = true;
                                res[ri][ci] += 1;
                            }
                        }
                    })
                    res[rix][cix] = 0;
                }
            })
        })
    }
    return res;
}
const evolveStep = (v: readonly number[][]): number[][] => {
    return evolveFlash(v.map((r) => r.map((c) => c+1)));
}

let v = values;
let allFlashing = false;
let generation = 0;
while (!allFlashing) {
    v = evolveStep(v);
    allFlashing = v.flatMap((v) => v).every((c) => c === 0);
    ++generation;
}

console.log(generation);