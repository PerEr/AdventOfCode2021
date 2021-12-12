export { };

// https://adventofcode.com/2021/day/7

const values = '1101,1,29,67,1102,0,1,65,1008,65,35,66,1005,66,28,1,67,65,20,4,0,1001,65,1,65,1106,0,8,99,35,67,101,99,105,32,110,39,101,115,116,32,112,97,115,32,117,110,101,32,105,110,116,99,111,100,101,32,112,114,111,103,114,97,109,10,859,34,1186,541,484,1318,263,74,1188,164,802,924,48,851,107,20,437,163,482,1334,457,405,487,1951,141,89,722,359,51,926,750,97,779,1153,338,131,192,120,319,432,305,1202,59,671,144,236,165,1235,666,5,603,1421,428,295,1089,1464,194,661,188,359,65,270,486,21,164,403,857,4,311,222,676,665,658,452,205,693,113,8,667,1357,1401,251,659,775,48,872,610,974,900,1289,836,0,32,8,102,437,827,100,107,390,574,311,1283,973,12,944,836,21,759,151,94,2,391,24,515,21,832,1027,90,281,348,291,188,61,63,1056,676,45,537,497,80,1394,466,431,18,197,1315,1149,651,1329,205,504,984,73,567,367,229,486,11,1206,499,304,609,657,276,1126,612,51,615,638,22,49,572,66,686,658,944,275,197,713,1257,393,144,234,910,396,412,637,1077,22,286,128,713,1489,38,57,215,252,285,33,245,735,411,1,911,858,252,796,501,346,813,94,147,1201,731,1197,124,506,400,767,98,622,460,151,1342,30,204,187,399,489,1253,452,508,55,56,994,4,488,342,247,1037,246,31,3,10,1442,616,1015,658,896,675,165,53,172,5,595,802,118,1194,114,1100,635,87,385,44,117,3,867,950,1581,304,527,349,340,960,947,100,56,605,699,206,320,1127,199,1012,1775,893,582,16,318,130,339,171,179,311,1926,1124,52,460,278,887,754,533,9,1551,307,506,1217,158,55,657,93,1,307,368,251,35,756,1817,0,1329,284,235,193,1188,1182,126,17,1010,142,1108,348,40,762,516,201,51,1400,185,829,3,120,95,92,166,112,624,1648,52,20,24,113,1262,1322,2,36,762,983,305,72,774,527,325,1304,816,486,197,1584,280,302,425,814,73,124,835,21,717,394,631,784,1633,743,504,1308,1149,7,691,580,192,400,4,1241,29,1290,170,4,123,92,255,201,332,129,92,18,213,682,1022,904,0,922,370,258,1240,126,3,716,59,210,946,512,209,24,60,474,100,227,851,1096,65,343,551,176,442,1164,1133,493,1,197,122,80,1761,731,32,674,136,1234,956,690,1132,396,540,392,7,274,1252,25,238,185,791,1461,392,1467,169,343,806,615,577,384,475,181,9,209,560,905,919,422,56,158,28,659,690,157,124,328,228,134,328,282,51,361,405,490,168,31,1103,481,550,9,816,986,1591,320,1007,688,103,700,240,811,80,682,189,126,108,542,1267,27,1420,121,594,493,188,560,710,1192,315,619,490,191,1296,849,1154,331,831,103,177,983,36,107,439,139,18,1357,511,245,135,260,90,15,130,90,610,73,1530,200,46,16,1220,787,465,72,879,553,465,530,751,1062,377,1,1202,344,1006,70,316,5,142,80,109,28,455,248,292,780,727,387,18,314,432,101,127,855,41,1189,658,928,384,244,426,521,160,8,195,1778,1492,1027,1338,370,8,331,75,91,147,1122,672,54,186,171,6,186,592,150,746,457,141,338,52,32,589,290,1020,1237,101,964,348,108,15,86,470,1789,159,181,1111,759,548,76,816,98,537,757,267,581,715,220,24,833,516,231,49,975,422,501,14,4,583,25,1571,1359,1295,600,519,1128,21,399,172,682,64,295,1041,1051,25,111,60,518,902,31,619,112,782,72,272,75,516,204,385,1852,1041,683,56,856,410,296,596,1269,76,653,733,654,291,1042,12,860,124,1043,444,43,241,18,1062,1048,869,552,585,400,1665,481,159,1099,1102,28,644,44,382,1798,280,218,585,1434,690,840,571,213,510,145,57,250,702,1794,514,237,128,947,587,272,1472,109,8,44,13,131,206,242,824,1578,1466,693,696,27,37,987,525,47,88,800,407,203,544,145,25,1426,388,359,91,100,147,1076,139,243,278,33,801,1739,1,1602,45,124,1501,1585,909,381,318,133,579,143,918,47,31,193,923,645,1687,1173,19,535,91,165,618,790,91,570,893,250,483,361,166,1206,236,551,203,1060,1065,180,727,136,644,94,580,110,1689,88,185,67,540,850,230,838,1171,729,849,795,169,157,80,156,626,1203,595,794,64,369,161,464,364,1081,857,227,128,711,1542,242,704,1298,343,130,1195,145,470,247,646,493,1194,607,94,148,153,20,92,831,1011,114,139,1097,19,113,452,170,1109,1280,162,1193,230,76,37,306,251,183,145,312,573,1272,1480,1606,6,1826,1114,588,960,784,967,107,272,321,358,761,622,11,99,579,80,511,111,2,1338,151,166,1050,111,79,229,307,74,429,343,464,187,426,272'
    .split(',')
    .map((v) => +v);

const range = Array.from(Array(Math.max(...values)).keys())

const distanceCost = (distance: number): number => {
    return (distance + 1) * distance / 2;
};
const fuelCost = (vs: number[], pos: number): number => {
    const costs = vs.map((v) => distanceCost(Math.abs(v - pos)));
    return costs.reduce((a, b) => a + b, 0);
};

const costs = range.map((_, pos) => fuelCost(values, pos));
const minCost = Math.min(...costs);
const pos = costs.indexOf(minCost);
console.log(pos, minCost);

