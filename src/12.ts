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

type Visited = {
    [key: string]: number,
}
const paths = (d: number, from: string, to: string, visited: Visited, edges: readonly string[][]): string[][] => {
    const solution = edges.find((e) => e.indexOf(from) >= 0 && e.indexOf(to) >= 0) || [];
    const isConsumable = from === from.toLowerCase();
    const nvisited = isConsumable ? {
        ...visited,
        [from]: (visited[from] || 0) + 1,
    } : visited;
    const maxVisit = Object.keys(nvisited).some((k) => nvisited[k] === 2) ? 0 : 1;
    const next: string[] = edges
        .filter((e) => e.indexOf(to) < 0)
        .map((e) => {
            const ix = e.indexOf(from);
            return ix >= 0 ? e[1-ix] : '';
        })
        .filter((v) => v.length)
        .filter((v) => nvisited[v] === undefined || nvisited[v] <= maxVisit)
        .filter((v) => v !== 'start')
        .sort();
    
    // console.log(new Array(d+1).join('  '), from, to, maxVisit, next, visited, nvisited);
    const f = (a: string[]) => {
        const hasExpired = a.some((e) => visited[e] === 0);
        return !hasExpired;
    };
    const r = next.map((n: string) => {
        return paths(d+1, n, to, nvisited, edges)
            .map((p: string[]) => [from, ...p]);
    }).filter((p) => p.length);
    if (solution.length) {
        r.push([solution]);
    }
    return r.flatMap((l) => l);
}

const res = paths(0, 'start', 'end', {
    start: 0,
    end: 0,
}, values).map((l) => l.join(','));

res.forEach((s) => console.log(s));
console.log(res.length);