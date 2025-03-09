const calculation = document.getElementById("calc");

const buttons = document.querySelectorAll(".buttons");

let expression = "";

//Now add EventListner to those buttons:
buttons.forEach(button => {
    button.addEventListener("click", function () {
        let buttonText = button.textContent;
        if (buttonText === "=") {
            if (expression.trim() === "" || /[+\-*/]$/.test(expression.trim())) {
                calculation.textContent = "Syntax Error";
                expression = "";
            }
            else {
                try {
                    // Evaluate the expression safely
                    const result = eval(expression.trim());
                    calculation.textContent = expression.trim() + " = " + result;
                    expression = ""; // Reset expression after calculating
                } catch (error) {
                    // Handle other errors in evaluation
                    calculation.textContent = "Syntax Error";
                    expression = ""; // Reset expression after error
                }
            }
        }
        else if (buttonText === "AC") {
            expression = "";
            calculation.textContent = "";
        }
        else if (buttonText === "DE") {
            expression = expression.trim().slice(0, -1);
            calculation.textContent = expression;
        }
        else {
            if (buttonText === "." && expression.trim().split(/[+\-*/]/).pop().includes(".")) {
                return; // Prevent appending another decimal point
            }
            if (/[+\-*/]$/.test(expression.trim()) && /[+\-*/]/.test(buttonText)) {
                return; // Don't append if the last character is already an operator
            }
            expression += buttonText;
            calculation.textContent = expression.trim();
        }

    })
})
