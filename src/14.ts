export { };

// https://adventofcode.com/2021/day/13

const [seed, ruleData] = `BCHCKFFHSKPBSNVVKVSK

OV -> V
CO -> V
CS -> O
NP -> H
HH -> P
KO -> F
VO -> B
SP -> O
CB -> N
SB -> F
CF -> S
KS -> P
OH -> H
NN -> O
SF -> K
FH -> F
VV -> B
VH -> O
BV -> V
KF -> K
CC -> F
NF -> H
VS -> O
SK -> K
HV -> O
CK -> K
VP -> F
HP -> S
CN -> K
OB -> H
NS -> F
PS -> S
KB -> S
VF -> S
FP -> H
BB -> N
HF -> V
CH -> N
BH -> F
KK -> B
OO -> N
NO -> K
BP -> K
KH -> P
KN -> P
OF -> B
VC -> F
NK -> F
ON -> O
OC -> P
VK -> O
SH -> C
NH -> C
FB -> B
FC -> K
OP -> O
PV -> V
BN -> V
PC -> K
PK -> S
FF -> C
SV -> S
HK -> H
NB -> C
OK -> C
PH -> B
SO -> O
PP -> F
KV -> V
FO -> B
FN -> H
HN -> C
VB -> K
CV -> O
BC -> C
CP -> S
FS -> S
KP -> V
BS -> V
BK -> B
PN -> C
PF -> S
HO -> V
NC -> N
SS -> N
BO -> P
BF -> N
NV -> P
PB -> K
HB -> H
VN -> H
FV -> B
FK -> K
PO -> S
SC -> S
HS -> S
KC -> F
HC -> S
OS -> K
SN -> N`
    .split('\n\n');

const rulez = new Map<string, string>(ruleData
    .split('\n')
    .filter((v) => v)
    .map((v) => {
        const p = v.split(' -> ');
        return [p[0], p[1]]
    }));

const toPairs = (s: string): string[] => {
    return s
        .split('').map((v, i, a) => {
            return i < a.length - 1 ? a[i]+a[i+1] : '';
        })
        .filter((v) => v.length);
};

const applyRulez = (pair: string): string => {
    const insert = rulez.get(pair);
    return insert ? pair[0] + insert + pair[1] : pair
}
const evolve = (s: string): string => {
    return toPairs(s)
        .map(applyRulez)
        .map((v, i) => i == 0 ? v : v.substring(1))
        .join('');
};

let workSeed = seed;
for (let i=0 ; i<=10 ; ++i) {
    const m = new Map<string, number>();
    workSeed.split('').forEach((c) => m.set(c, 1 + (m.get(c) || 0)));
    const sm = [...m.values()].sort((a, b) => b - a);
    console.log(i, sm[0] - sm[sm.length-1]);
    workSeed = evolve(workSeed);
}

// const seed2 = evolve(seed);