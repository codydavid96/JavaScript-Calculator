class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = '0'
        this.previousOperand = ''
        this.operation = undefined
    }
    
    delete() {
        this.currentOperand = this.currentOperand.slice(0, this.currentOperand.length - 1)
    }

    deleteTwo() {
        this.previousOperand = this.previousOperand.slice(0, this.previousOperand.length - 2)
    }
   
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        if (number === '0' && this.currentOperand === '0') return
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = ''
        }
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        this.previousOperand = this.previousOperand.concat(this.currentOperand)
        
        if (isNaN(this.previousOperand[this.previousOperand.length - 1]) && operation !== '-') {
        this.previousOperand = this.previousOperand.replace(/[-+*/]+$/, operation)
        } else {
            this.previousOperand = this.previousOperand.concat(operation)
        }
        
        this.operation = operation
        this.currentOperand = ''
    }

    compute() {
        this.previousOperand = this.previousOperand.concat(this.currentOperand)
        this.currentOperand = eval(this.previousOperand)
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
        calculator.compute()
        calculator.updateDisplay()
    })

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})