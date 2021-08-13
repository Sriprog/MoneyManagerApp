import './index.css'

const MoneyDetails = props => {
  const {totalIncome, totalBalance, totalExpenses} = props

  return (
    <div className="divison-blocks">
      <div className="bal-con">
        <img
          alt="balance"
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
        />
        <div>
          <p className="para">Your Balance</p>
          <p className="para2" testid="balanceAmount">
            Rs {totalBalance}
          </p>
        </div>
      </div>
      <div className="bal-con income">
        <img
          alt="income"
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
        />
        <div>
          <p className="para">Your Income</p>
          <p className="para2" testid="incomeAmount">
            Rs {totalIncome}
          </p>
        </div>
      </div>
      <div className="bal-con expense">
        <img
          alt="expenses"
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        />
        <div>
          <p className="para">Your Expenses</p>
          <p className="para2" testid="expensesAmount">
            Rs {totalExpenses}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
