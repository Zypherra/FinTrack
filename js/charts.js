function renderPieChart() {
    const transactions = getTransactions();

    const expenseData = {};
    transactions.forEach(t => {

        if (t.type.toLowerCase() === "expense") {
            if (!expenseData[t.category]) {
                expenseData[t.category] = 0;
            }
            expenseData[t.category] += Number(t.amount);
        }
    });

    const labels = Object.keys(expenseData);
    const data = Object.values(expenseData);

    const ctx = document.getElementById("expensePieChart");

    if (!ctx) return;

    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    "#f97316",
                    "#06b6d4",
                    "#7c3aed",
                    "#eab308",
                    "#d946ef",
                    "#6b7280",
                    "#3b82f6",
                    "#8b5cf6",
                    "#14b8a6",
                    "#ec4899"
                ]
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Category Wise Monthly Expense',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

function renderBarChart() {
    const transactions = getTransactions();

    let income = 0;
    let expense = 0;
    let savings = 0;

    transactions.forEach(t => {
        if (t.type.toLowerCase() === "income") {
            income += Number(t.amount);
        }
        if (t.type.toLowerCase() === "expense") {
            expense += Number(t.amount);
        }
        if (t.type.toLowerCase() === "savings") {
            savings += Number(t.amount);
        }
    });

    const ctx = document.getElementById("incomeExpenseBarChart");

    if (!ctx) return;

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: [""],
            datasets: [
                {
                    label: "Income",
                    data: [income],
                    backgroundColor: "#22c55e",
                },
                {
                    label: "Expense",
                    data: [expense],
                    backgroundColor: "#ef4444",
                },
                {
                    label: "Savings",
                    data: [savings],
                    backgroundColor: "#06b6d4",
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Financial Summary',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("expensePieChart")) {
        renderPieChart();
        renderBarChart();
    }
});