function coinChange(coins: number[], amount: number): number {
    coins = coins.sort((a, b) => a - b);
    console.log(coins);
    if (amount === 0) {
        return 0;
    }
    if (amount < 0) {
        return -1;
    }
    const countMap = new Map<number, number>();

    const getCount = (partAmount: number): number => {
        if (countMap.has(partAmount)) {
            return countMap.get(partAmount) as number;
        }
        if (coins.includes(partAmount)) {
            countMap.set(partAmount, 1);
            return 1;
        }
        
        // console.log('no match', partAmount);
        let tmpCount = Number.MAX_SAFE_INTEGER;
        for (const coin of coins) {
            if (partAmount < coin) {
                break;
            }
            const b = getCount(partAmount - coin);
            if (b === -1) {
                continue;
            }
            tmpCount = Math.min(tmpCount, 1 + b);
        }
        if (tmpCount === Number.MAX_SAFE_INTEGER) {
            tmpCount = -1;
        }
        
        // console.log('tmp', partAmount, tmpCount);
        countMap.set(partAmount, tmpCount);
        return tmpCount;
    }



    return getCount(amount);
};

console.log(coinChange([474,83,404,3], 264));