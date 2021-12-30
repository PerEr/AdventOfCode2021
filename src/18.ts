export { };

const values = `
[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]
`
    .split('\n')
    .filter((v) => v)
    .map((v): Symbol[] => {
        const rc: Symbol[] = [];
        v.split('').forEach((c) => {
            if ("[],".indexOf(c) >= 0) {
                rc.push(c as Symbol);
            } else {
                rc.push(+c);
            }
        });
        return rc;
    });

type Token = '[' | ']' | ',';
type Symbol = Token | number;

const addTokens = (t1: Symbol[], t2: Symbol[]): Symbol[] => {
    return ['[', ...t1, ',', ...t2, ']'];
};

const explodeToken = (t: Symbol[]): Symbol[] | undefined => {
    const next: Symbol[] = [];
    let depth = 0;
    let lastNumIx = -1;
    let carryRight = -1;
    let copyAsIs = false;
    let modified = false;
    for (let ix = 0 ; ix<t.length ; ++ix) {
        let s = t[ix];
        if (copyAsIs) {
            // Nuthing
        } else if (s === ']') {
            --depth;
        } else if (depth === 5 && !modified) {
            const l = s as number;
            carryRight = t[ix+2] as number;
            ix += 3;
            s = 0;
            depth -= 1;
            next.pop();
            if (lastNumIx >= 0) {
                next[lastNumIx] = l + (next[lastNumIx] as number);
            }
            modified = true;
        } else if (typeof s === 'number') {
            if (carryRight >= 0) {
                s = carryRight + s;
                carryRight = -1;
                copyAsIs = true;
            }
            lastNumIx = next.length;
        } else if (s === '[') {
            ++depth;
        } 
        next.push(s);
    }
    return modified ? next : undefined;
}

const splitToken = (t: Symbol[]): Symbol[] | undefined => {
    const next: Symbol[] = [];
    let modified = false;

    for (let ix = 0 ; ix<t.length ; ++ix) {
        let s = t[ix];
        let copyAsIs = false;
        if (modified) {
            // Nuthing
        } else if (typeof s === 'number') {
            if (s >= 10) {
                next.push('[');
                next.push(Math.floor(s/2));
                next.push(',');
                next.push(Math.ceil(s/2));
                s = ']';
                modified = true;
            }
        }
        next.push(s);
    }

    return modified ? next : undefined;
}
const toString = (t: Symbol[]): string => {
    return t.join('');
}

const reduceToken = (t: Symbol[]): Symbol[] => {
    let syms: Symbol[] | undefined = t;
    let reply: typeof t;
    do {
        reply = syms;
        // console.log(toString(syms));
        const tmp = explodeToken(syms);
        syms = !tmp ? splitToken(syms) : tmp;
    } while (syms);
    return reply;
}

const res = values.reduce((a,b) => reduceToken(addTokens(a, b)));
console.log(toString(res));
/*
let syms: Symbol[] | undefined = t3;
do {
    console.log(toString(syms));
    const next = explodeToken(syms);
    syms = !next ? splitToken(syms) : next;
} while (syms);

*/


/*

type Pair = [Pair | number, Pair | number];

interface Tree {
    parent: Tree | undefined;
    left: Tree | number;
    right: Tree | number;
}

const isnum = (pon: Tree | Pair | number) => {
    return typeof pon === 'number';
}

const makeTree = (p: Pair, parent: Tree | undefined = undefined): Tree => {
    const t: Tree = {
        parent,
        left: 0,
        right: 0,
    };
    t.left = isnum(p[0]) ? p[0] as number : makeTree(p[0] as Pair, t);
    t.right = isnum(p[1]) ? p[1] as number : makeTree(p[1] as Pair, t);
    return t;
}

const addTrees = (a: Tree, b: Tree): Tree => {
    const t: Tree = {
        left: a,
        right: b,
        parent: undefined,
    };
    a.parent = t;
    b.parent = t;
    return t;
}


const toPair = (t: Tree): Pair => {
    const _toPair = (tn: Tree | number): Pair | number => {
        if (isnum(tn)) {
            return tn as number;
        } else {
            const t = tn as Tree;
            return [_toPair(t.left), _toPair(t.right)]
        }
    }
    return [_toPair(t.left), _toPair(t.right)];
}

const explodeTree = (t: Tree): Tree => {
    const _explodeTree = (d: number, tn: Tree | number): Tree | number => {
        if (isnum(tn)) {
            return tn;
        }
        const t = tn as Tree;
        if (d < 3) {
            return {
                left: isnum(t.left) ? t.left : _explodeTree(d+1, t.left as Tree),
                right: isnum(t.right) ? t.right : _explodeTree(d+1, t.right as Tree),
                parent: t.parent,
            }
        } else {
            return 0;
        }
    }
    return t;
}

const p0: Pair = [[[[4,3],4],4],[7,[[8,4],9]]];
const p1: Pair = [1,1];

const t0 = makeTree(p0);
const t1 = makeTree(p1);

const t2 = addTrees(t0, t1);

const p2 = toPair(t2);

console.log(JSON.stringify(p2));

const t3 = explodeTree(t2);
const p3 = toPair(t3);
console.log(JSON.stringify(p3));


const explorePair = (p: Pair) => {
    p.forEach((d) => {
        if (typeof d === 'number') {
            console.log('num', d);
        } else {
            explorePair(d);
        }
    });
}
explorePair(p);

interface Res {
    left: number | undefined;
    right: number | undefined;
    modified: boolean | undefined;
}

const explodePair = (p: Pair): Res => {
    p.forEach((d) => {
        if (typeof d === 'number') {
            console.log('num', d);
        } else {
            explorePair(d);
        }
    });
}
const res = explodePair(p);
*/