import React from "react";

const BalanceSummary = ({ group }) => {
    if (group.members.length === 0 || group.expenses.length === 0) {
        return <p className="text-gray-500">No balances to show yet.</p>;
    }

    // Step 1: Calculate total spent
    const totalSpent = group.expenses.reduce((sum, e) => sum + e.amount, 0);

    // Step 2: Calculate each member's total paid
    const paidMap = {};
    group.members.forEach((m) => {
        paidMap[m.id] = 0;
    });

    group.expenses.forEach((e) => {
        paidMap[e.payerId] += e.amount;
    });

    // Step 3: Calculate share per member
    const sharePerMember = totalSpent / group.members.length;

    // Step 4: Calculate balances
    const balances = group.members.map((m) => ({
        name: m.name,
        balance: paidMap[m.id] - sharePerMember,
    }));

    // Step 5: Format positive/negative balances
    return (
        <div className="mt-6 p-4 border rounded bg-gray-50">
            <h3 className="text-xl font-semibold mb-3">Balance Summary</h3>
            <ul className="space-y-1">
                {balances.map((b, idx) => (
                    <li key={idx} className="flex justify-between">
                        <span>{b.name}</span>
                        <span
                            className={b.balance > 0 ? "text-green-600" : b.balance < 0 ? "text-red-600" : ""}
                        >
                            {b.balance > 0
                                ? `Gets ₹${b.balance.toFixed(2)}`
                                : b.balance < 0
                                    ? `Owes ₹${Math.abs(b.balance).toFixed(2)}`
                                    : "Settled up"}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BalanceSummary;
