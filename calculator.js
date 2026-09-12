const currentOperand = document.querySelector("#current-operand");
const previousOperand = document.querySelector("#previous-operand");
const buttons = document.querySelector(".buttons");

function clearCalculator() {
    currentOperand.textContent = "0";
    previousOperand.textContent = "";
}

function deleteNumber() {
    if (currentOperand.textContent === "خطأ") {
        clearCalculator();
        return;
    }

    const value = currentOperand.textContent;
    currentOperand.textContent = value.length > 1 ? value.slice(0, -1) : "0";
}

function appendValue(value) {
    if (currentOperand.textContent === "خطأ") {
        currentOperand.textContent = "0";
    }

    const current = currentOperand.textContent;
    if (value === "." && current.split(/[+\-*/]/).pop().includes(".")) {
        return;
    }

    if (current === "0" && value !== ".") {
        currentOperand.textContent = value;
    } else {
        currentOperand.textContent += value;
    }
}

function calculate() {
    const expression = currentOperand.textContent;

    if (!/[0-9]/.test(expression)) {
        return;
    }

    try {
        const result = Function(`"use strict"; return (${expression})`)();
        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        previousOperand.textContent = `${expression.replace("*", "×").replace("/", "÷")} =`;
        currentOperand.textContent = String(result);
    } catch (error) {
        currentOperand.textContent = "خطأ";
    }
}

buttons.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) {
        return;
    }

    const { action, value } = button.dataset;
    if (action === "clear") {
        clearCalculator();
    } else if (action === "delete") {
        deleteNumber();
    } else if (action === "calculate") {
        calculate();
    } else if (value) {
        appendValue(value);
    }
});
