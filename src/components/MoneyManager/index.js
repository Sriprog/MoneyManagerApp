import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]
class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    expenseType: transactionTypeOptions[0].optionId,
    historyList: [],
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onSelectType = event => {
    this.setState({expenseType: event.target.value})
  }

  onClickAdd = event => {
    event.preventDefault()
    const {title, amount, expenseType} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === expenseType,
    )

    const {displayText} = typeOption

    const newTransaction = {
      id: v4(),
      title,
      amount: parseInt(amount),
      expenseType: displayText,
    }

    this.setState(prevState => ({
      historyList: [...prevState.historyList, newTransaction],
      amount: '',
      title: '',
      expenseType: transactionTypeOptions[0].optionId,
    }))
  }

  deleteTransaction = id => {
    const {historyList} = this.state
    const updatedList = historyList.filter(eachItem => eachItem.id !== id)
    this.setState({
      historyList: updatedList,
    })
  }

  calculateIncome = () => {
    const {historyList} = this.state
    let incomeAmount = 0
    historyList.forEach(eachTransaction => {
      if (
        eachTransaction.expenseType === transactionTypeOptions[0].displayText
      ) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  calculateExpenses = () => {
    const {historyList} = this.state
    let ExpensesAmount = 0
    historyList.forEach(eachTransaction => {
      if (
        eachTransaction.expenseType === transactionTypeOptions[1].displayText
      ) {
        ExpensesAmount += eachTransaction.amount
      }
    })
    return ExpensesAmount
  }

  calculateBalance = () => {
    const {historyList} = this.state
    let incomeAmount = 0

    let expensesAmount = 0
    let balanceAmount = 0

    historyList.forEach(eachTransaction => {
      if (
        eachTransaction.expenseType === transactionTypeOptions[0].displayText
      ) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
      balanceAmount = incomeAmount - expensesAmount
    })
    return balanceAmount
  }

  render() {
    const {title, amount, expenseType, historyList} = this.state
    const totalIncome = this.calculateIncome()
    const totalExpenses = this.calculateExpenses()
    const totalBalance = this.calculateBalance()
    return (
      <div className="money-app">
        <div className="header-part">
          <h1 className="heading">Hi,Srinivas</h1>
          <p className="para">
            Welcome back to your<span className="money"> Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          totalIncome={totalIncome}
          totalBalance={totalBalance}
          totalExpenses={totalExpenses}
        />
        <div className="down-con">
          <div className="AddMoney-con">
            <h1 className="heading1">Add Transaction</h1>
            <div className="upper-con">
              <form className="form-con">
                <label htmlFor="title" className="label">
                  TITLE
                </label>
                <input
                  placeholder="Title"
                  className="label-con"
                  type="text"
                  id="title"
                  onChange={this.onChangeTitle}
                  value={title}
                  autoComplete="OFF"
                />

                <label htmlFor="date" className="label">
                  AMOUNT
                </label>
                <input
                  placeholder="AMOUNT"
                  className="label-con"
                  type="text"
                  id="date"
                  onChange={this.onChangeAmount}
                  value={amount}
                />
                <label htmlFor="type" className="label">
                  TYPE
                </label>
                <select
                  id="type"
                  className="label-con"
                  onChange={this.onSelectType}
                  value={expenseType}
                >
                  {transactionTypeOptions.map(eachItem => (
                    <option value={eachItem.optionId} key={eachItem.optionId}>
                      {eachItem.displayText}
                    </option>
                  ))}
                </select>
                <button
                  onClick={this.onClickAdd}
                  className="add-btn"
                  type="submit"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
          <div className="addHistory">
            <h1 className="heading1">History</h1>
            <div className="transactions-table-container">
              <ul className="transactions-table">
                <li className="table-header">
                  <p className="table-header-cell">Title</p>
                  <p className="table-header-cell">Amount</p>
                  <p className="table-header-cell">Type</p>
                </li>
                {historyList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transactionDetails={eachTransaction}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
