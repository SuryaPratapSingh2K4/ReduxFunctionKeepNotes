    export const calculateBalances = (members, expenses) => {
    const balanceMap = {};
    members.forEach((m) => (balanceMap[m.id] = 0));

    expenses.forEach((expense) => {
        const share = expense.amount / expense.sharedWith.length;
        expense.sharedWith.forEach((memberId) => {
        if (memberId !== expense.payerId) {
            balanceMap[memberId] -= share;
            balanceMap[expense.payerId] += share;
        }
        });
    });

    return balanceMap;
    };
