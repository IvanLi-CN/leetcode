function coinChange(coins: number[], amount: number): number {
    if (amount === 0) {
        return 0;
    }
    if (amount < 0) {
        return -1;
    }
    coins.sort((a, b) => a - b);
    const map = new Map<number, number>();
    for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {
        let currentMinCount = Number.POSITIVE_INFINITY;
        for (const coin of coins) {
            if (currentAmount === coin) {
                currentMinCount = 1;
                continue;
            }
            if (map.has(currentAmount - coin)) {
                currentMinCount = Math.min(currentMinCount, 1 + map.get(currentAmount - coin)!);
            }
        }
        if (currentMinCount !== Number.POSITIVE_INFINITY) {
            map.set(currentAmount, currentMinCount);
        }
    }
    return map.get(amount) || -1;
};


console.log(coinChange([474,83,404,3], 264));