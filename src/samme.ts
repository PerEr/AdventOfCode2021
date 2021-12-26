export { };


const fakultet = (n: number): number => {
    if (n == 0) {
        return 1;
    } else {
        return n * fakultet(n-1);
    }
}


console.log(fakultet(6));
