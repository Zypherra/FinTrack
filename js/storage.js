function saveTransaction(transaction) {
    let transactions = getTransactions();
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function getTransactions() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    return transactions.filter(t => t !== null);
}

function deleteTransaction(id) {
    let transactions = getTransactions();
    transactions = transactions.filter(transaction => transaction && transaction.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateTransaction(id, updatedTransaction) {
    let transactions = getTransactions();
    transactions = transactions.map(transaction => transaction.id === id ? updatedTransaction : transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger-menu");
    const sidebar = document.querySelector(".sidebar");
    if (hamburger && sidebar) {

        hamburger.addEventListener("click", (e) => {
            sidebar.classList.toggle("active");
            e.stopPropagation(); 
        });

        document.addEventListener("click", (e) => {
            if (sidebar.classList.contains("active") && !sidebar.contains(e.target)) {
                sidebar.classList.remove("active");
            }
        });
    }
});
