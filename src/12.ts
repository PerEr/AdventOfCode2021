export { };

// https://adventofcode.com/2021/day/12


const values: string[][] = `
BC-gt
gt-zf
end-KH
end-BC
so-NL
so-ly
start-BC
NL-zf
end-LK
LK-so
ly-KH
NL-bt
gt-NL
start-zf
so-zf
ly-BC
BC-zf
zf-ly
ly-NL
ly-LK
IA-bt
bt-so
ui-KH
gt-start
KH-so
`
    .split('\n')
    .filter((v) => v)
    .map((l) => l.split('-'));

const paths = (from: string, to: string, visited: string[], edges: string[][]): string[][] => {
    const solution = edges.find((e) => e.indexOf(from) >= 0 && e.indexOf(to) >= 0) || [];
    const next: string[] = edges
        .filter((e) => e.indexOf(to) < 0)
        .map((e) => {
            const ix = e.indexOf(from);
            return ix >= 0 ? e[1-ix] : '';
        }).filter((v) => v.length);
    const isBig = from === from.toUpperCase();
    const nvisited = isBig ? visited : [from, ...visited];
    const r = next.map((n: string) => {
        const other = edges.filter((a) => !a.some((e) => visited.indexOf(e) >= 0));
        return paths(n, to, nvisited, other)
            .map((p: string[]) => [from, ...p]);
    }).filter((p) => p.length);
    if (solution.length) {
        r.push([solution]);
    }
    return r.flatMap((l) => l);
}

const res = paths('start', 'end', [], values)
    .map((l) => l.join(','));

console.log(res.length);