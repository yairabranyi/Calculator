class Calculator {
    constructor(previusOperandTextElement, currentOperandTextElement) {
        this.previusOperandTextElement = previusOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previusOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previusOperand !== '') {        // compute result in case previuse operand isn't empty
            this.compute()
        }
        this.operation = operation
        this.previusOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute() {
        let computationRes
        const prevNumber = parseFloat(this.previusOperand)
        const currentNumber = parseFloat(this.currentOperand)
        if (isNaN(prevNumber) || isNaN(currentNumber)) return
        switch (this.operation) {
            case '+':
                computationRes = prevNumber + currentNumber

                break
            case '-':
                computationRes = prevNumber - currentNumber
                break
            case 'x':
                computationRes = prevNumber * currentNumber
                break
            case '÷':
                computationRes = prevNumber / currentNumber
                break
            default:
                return
        }
        this.currentOperand = computationRes
        this.operation = undefined
        this.previusOperand = ''

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previusOperandTextElement.innerText = this.previusOperand
        if (this.operation != null) {
            this.previusOperandTextElement.innerText =
                `${this.previusOperand} ${this.operation}`
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
console.log("numberButtons:: ", numberButtons)
const operetionButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previusOperandTextElement = document.querySelector('[data-first-operand]')
const currentOperandTextElement = document.querySelector('[data-second-operand]')

const calculator = new Calculator(previusOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Num clicked")
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operetionButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("Operation clicked")
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    console.log("Equals clicked")
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    console.log("Equals clicked")
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    console.log("Delete clicked")
    calculator.delete()
    calculator.updateDisplay()
})
