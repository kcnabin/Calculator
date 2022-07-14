function operate(operator, firstNum, secondNum) {
	if (operator === "+") return (firstNum + secondNum);
	else if (operator === "-") return (firstNum - secondNum);
	else if (operator === "*") return (firstNum * secondNum);
	else if (operator === "/") return (firstNum / secondNum);
	else console.log("Invalid operator!")
}

const keys = document.querySelectorAll(".keypad div");
const displayArea = document.querySelector(".display-area");
let oldNum = 0;
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const operators = ["+", "-", "*", "/","="];
let clickedValues = [];
let clickedOperators = [];
let valueCount = 0;
let operatorCount = 0;
let operatorClicked = 0;

function display(value) {
	displayArea.textContent = value;
}

keys.forEach(key => {
	key.addEventListener("mouseover", hoverEffect);
	key.addEventListener("mouseout", removeHover);
	key.addEventListener("click", clickAction);
});

function hoverEffect(e) {
	e.target.style.backgroundColor = "#d15e7b";
	e.target.style.border = "1px solid white"
	console.log();
}

function removeHover(e) {
	e.target.style.backgroundColor = "#212121";
	e.target.style.border = "1px solid #212121"
}

function clickAction(e) {
	// extracts last character from classname of e.target
	let contentAll = e.target.classList[0];
	
	if (contentAll === "clear") {
		clearAll();
		display("cleared");
	}

	function clearAll() {
		enteredValue = 0;
		oldNum = 0;
		result = 0;
		clickedValues = [];
		clickedOperators = [];
		valueCount = 0;
		operatorCount = 0;
	}

	let clickedNum = contentAll[contentAll.length -1];

	// check for operator
	if (operators.includes(clickedNum)) {
		console.log("Operators clicked " + clickedNum);
		operatorClicked++;;
		if (operatorClicked == 1) {
			clickedValues[valueCount] = oldNum;
			clickedOperators[valueCount] = clickedNum;
			operatorCount++;
			valueCount++;
			oldNum = 0;
		}

		if (operatorCount == 2) {
			let result = operate(clickedOperators[0], clickedValues[0], clickedValues[1]);
			display(result);
			operatorCount = 1;
			valueCount = 1;
			clickedValues[0] = result;
			clickedOperators[0] = clickedNum;

			// check for equals sign
			if (clickedNum == "=") {
				clearAll();
				display(result);
			}
		}
	}

	// checks if clicked content is number
	// if it is a number display that number
	if (numbers.includes(clickedNum)) {
		operatorClicked = 0;
		console.log(clickedNum);
		let result = +oldNum * 10 + +clickedNum;
		oldNum = result;
		display(oldNum);
	}
}