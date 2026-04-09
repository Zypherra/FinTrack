function renderExpenseCategorySummaryTable() {
    const transactions = getTransactions();
    const tableBody = document.getElementById("expense-category-summary");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    const categoryTotals = {};

    transactions.forEach(t => {
        if (!t) return;

        if (t.type.toLowerCase() === "expense") {
            if (!categoryTotals[t.category]) {
                categoryTotals[t.category] = 0;
            }
            categoryTotals[t.category] += Number(t.amount);
        }
    });

    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

    sortedCategories.forEach(([category, total]) => {
        const row = document.createElement("tr");

        const categoryClass = "category-" + category.toLowerCase();

        row.innerHTML = `
            <td><div class="category ${categoryClass}">${category}</div></td>
            <td class="expense"><div class="amount expense">₹${total}</div></td>
        `;
        tableBody.appendChild(row);
    });
}

function renderIncomeCategorySummaryTable() {
    const transactions = getTransactions();
    const tableBody = document.getElementById("income-category-summary");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    const categoryTotals = {};

    transactions.forEach((it) => {
        if (!it) return;

        if (it.type.toLowerCase() === "income") {
            if (!categoryTotals[it.category]) {
                categoryTotals[it.category] = 0;
            }
            categoryTotals[it.category] += Number(it.amount);
        }
    });

    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
    sortedCategories.forEach(([category, total]) => {
        const row = document.createElement("tr");
        const categoryClass = "category-" + category.toLowerCase();
        row.innerHTML = `
        <td><div class="category ${categoryClass}">${category}</div></td>
        <td class="income"><div class="amount income">₹${total}</div></td>
        `
        tableBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("expense-category-summary")) {
        renderExpenseCategorySummaryTable();
    }
    if (document.getElementById("income-category-summary")) {
        renderIncomeCategorySummaryTable();
    }
});
