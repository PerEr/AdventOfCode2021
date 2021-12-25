export { };

// https://adventofcode.com/2021/day/12


const values: string[][] = `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`
    .split('\n')
    .filter((v) => v)
    .map((l) => l.split('-'));

type Visited = {
    [key: string]: number,
}
const paths = (d: number, from: string, to: string, visited: Visited, edges: readonly string[][]): string[][] => {
    const solution = edges.find((e) => e.indexOf(from) >= 0 && e.indexOf(to) >= 0) || [];
    const maxVisit = Object.keys(visited).some((k) => visited[k] === 2) ? 0 : 1;
    const next: string[] = edges
        .filter((e) => e.indexOf(to) < 0)
        .map((e) => {
            const ix = e.indexOf(from);
            return ix >= 0 ? e[1-ix] : '';
        })
        .filter((v) => v.length)
        .filter((v) => visited[v] === undefined || visited[v] <= maxVisit)
        .filter((v) => v !== 'start')
        .sort();
    const isConsumable = from === from.toLowerCase();
    const nvisited = isConsumable ? {
        ...visited,
        [from]: (visited[from] || 0) + 1,
    } : visited;
    
    console.log(new Array(d+1).join('  '), from, to, maxVisit, next, visited, nvisited);
    // console.log(new Array(d).join('    '), from, to, next, edges, visited, nvisited);
    const f = (a: string[]) => {
        const hasExpired = a.some((e) => visited[e] === 0);
        //const x = a.some((e) => e === from);
        return !hasExpired;
    };
    const r = next.map((n: string) => {
        // const other = edges.filter(f);
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