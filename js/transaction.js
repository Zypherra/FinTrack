const type = document.getElementById("type");
const category = document.getElementById("category");

const incomeCategories = ["Salary", "Freelance", "Investment", "Gift", "Other"];
const expenseCategories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

if (type && category) {
    type.addEventListener("change", function () {

        category.innerHTML = "";

        if (this.value.toLowerCase() === "savings") {
            category.disabled = true;
            let option = document.createElement("option");
            option.textContent = "Savings";
            category.appendChild(option);
            return;
        }

        category.disabled = false;

        let categories = this.value.toLowerCase() === "income" ? incomeCategories : expenseCategories;

        categories.forEach(cat => {
            let option = document.createElement("option");
            option.textContent = cat;
            category.appendChild(option);
        });
    });
}

function addTransaction(event) {
    event.preventDefault();
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;

    if (!type || !category || !amount || !date) {
        alert("Please fill all required fields");
        return;
    }

    const editIdInput = document.getElementById("editId");
    const editId = editIdInput ? editIdInput.value : null;

    const transaction = {
        id: editId || Date.now().toString(),
        type,
        category,
        amount,
        date,
        description
    };

    if (editId) {
        if (typeof updateTransaction === 'function') {
            updateTransaction(editId, transaction);
            alert("Transaction Updated Successfully!");
            window.location.href = "transactions.html";
        }
    } else {
        if (typeof saveTransaction === 'function') {
            saveTransaction(transaction);
            alert("Transaction Added Successfully!");
            document.querySelector("form").reset();
            category.innerHTML = "";
            category.disabled = false;
        }
    }
}

function displayTransactions() {
    const table = document.getElementById("transaction-table");
    if (!table) return;

    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";

    const transactions = getTransactions();

    transactions.forEach(transaction => {

        if (!transaction || !transaction.date || !transaction.type) return;

        const row = tbody.insertRow();

        const typeClass = transaction.type.toLowerCase();

        const categoryClass = transaction.category ? "category-" + transaction.category.toLowerCase() : "";

        row.innerHTML = `
        <td>${transaction.date}</td>
        <td class="${typeClass}"><div class="type ${typeClass}">${transaction.type}</div></td>
        <td><div class="category ${categoryClass}">${transaction.category}</div></td>
        <td class="${typeClass}"><div class="amount ${typeClass}">₹${transaction.amount}</div></td>
        <td class="action-btn">
            <button class="edit-btn" onclick="editTransaction('${transaction.id}')">Edit</button>
            <button class="delete-btn" onclick="deleteThisTransaction('${transaction.id}')">Delete</button>
        </td>
    `;
    });
}

function deleteThisTransaction(id) {
    if (typeof deleteTransaction === 'function') {
        deleteTransaction(id);
        displayTransactions();
    }
}

function editTransaction(id) {
    window.location.href = `add.html?edit=${id}`;
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("transaction-table")) {
        displayTransactions();
    }

    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    if (editId && document.getElementById("type")) {
        const transactions = typeof getTransactions === 'function' ? getTransactions() : [];
        const transaction = transactions.find(t => t.id === editId);
        if (transaction) {
            document.getElementById("transaction-title").textContent = "Edit Transaction";
            const capType = transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1).toLowerCase();
            document.getElementById("type").value = capType;
            const event = new Event('change');
            document.getElementById("type").dispatchEvent(event);

            document.getElementById("category").value = transaction.category;
            document.getElementById("amount").value = transaction.amount;
            document.getElementById("date").value = transaction.date;
            document.getElementById("description").value = transaction.description;

            let hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.id = "editId";
            hiddenInput.value = editId;
            document.querySelector("form").appendChild(hiddenInput);

            document.querySelector("button[type='submit']").textContent = "Update Transaction";
        }
    }
});