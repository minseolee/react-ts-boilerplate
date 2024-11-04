function sum(d: number[]): number {
    let sum = 0;
    d.forEach((d) => { sum += d; });
    return sum;
}

function cloneDeep<T>(o: T): T {
    return JSON.parse(JSON.stringify(o));
}

function CN(...args: string[]): string {
    return args.join(' ');
}

export { sum, cloneDeep, CN };
