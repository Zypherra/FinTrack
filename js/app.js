function displayCard() {
    const transactions = getTransactions();

    const income = document.getElementById("income");
    const expense = document.getElementById("expense");
    const balance = document.getElementById("balance");
    const savings = document.getElementById("savings");

    let incomeAmount = 0;
    let expenseAmount = 0;
    let savingsAmount = 0;

    transactions.forEach(t => {

        if (!t) return;

        const amount = Number(t.amount);

        if (t.type === "income" || t.type === "Income") {
            incomeAmount += amount;
        }
        if (t.type === "expense" || t.type === "Expense") {
            expenseAmount += amount;
        }
        if (t.type === "savings" || t.type === "Savings") {
            savingsAmount += amount;
        }
    });

    let balanceAmount = incomeAmount - expenseAmount;

    income.textContent = "₹" + incomeAmount;
    expense.textContent = "₹" + expenseAmount;
    balance.textContent = "₹" + balanceAmount;
    savings.textContent = "₹" + savingsAmount;
}

function displayRecentTransactions() {
    const tableBody = document.querySelector("#transaction-table-body");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    const transactions = getTransactions();

    const lastThree = transactions.slice(-3).reverse();

    lastThree.forEach(transaction => {
        if (!transaction) return;

        const row = document.createElement("tr");

        const typeClass = (transaction.type || "").toLowerCase();
        const categoryClass = "category-" + (transaction.category || "").toLowerCase();

        row.innerHTML = `
            <td>${transaction.date}</td>
            <td class="${typeClass}"><div class="type ${typeClass}">${transaction.type}</div></td>
            <td><div class="category ${categoryClass}">${transaction.category}</div></td>
            <td class="${typeClass}"><div class="amount ${typeClass}">₹${transaction.amount}</div></td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    displayCard();
    displayRecentTransactions();
    console.log(getTransactions());
    //localStorage.removeItem("transactions");
});