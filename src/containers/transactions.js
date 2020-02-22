import React from 'react';
import { connect } from 'react-redux';
import { getUserTransactions } from './../actions/actionCreators';
import { Redirect } from 'react-router-dom';

class Transactions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {}
        }
    }
    componentDidMount() {
        if (this.props.loggedUser) {
            this.props.getUserTransactions(this.props.loggedUser.id);
        }
    }
    render() {
        const { transactions, isAuthenticated, location } = this.props;

        if (!isAuthenticated) {
            return <Redirect to={{
                        pathname: '/login',
                        state: { from: location }
                    }} />
        }
        let transactionsHtml = '';
        let credits = [];
        let debits = [];
        if (transactions.length) {
            transactionsHtml = transactions.map(transaction => {
                if (transaction.type == 'Dr') {
                    debits.push(transaction.amount);
                } else {
                    credits.push(transaction.amount);
                }
                return (
                    <tr key={transaction.id}>
                        <td>Transaction #{transaction.id}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.type}</td>
                    </tr>
                )
            });
        }
        let totalCredits = credits.reduce((credit, total) => parseInt(credit) + parseInt(total), 0);
        let totalDebits = debits.reduce((debit, total) => parseInt(debit) + parseInt(total), 0);
        let availableBalance = parseInt(totalCredits) - parseInt(totalDebits);
        console.log(availableBalance);
        return (
            <React.Fragment>
                <div style={{fontWeight: 'bold', padding: "10px"}}>Transactions</div>
                <div className="compute">
                    <div><b>Total credits</b> : {totalCredits}</div>
                    <div><b>Total debits</b> : {totalDebits}</div>
                    <div><b>Available</b> : {availableBalance}</div>
                </div>
                <div className="transactions">
                    <table>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Tranaction Type</th>
                        </tr>
                        {transactions.length ? (
                            transactionsHtml
                        ) : (
                            <tr><td colSpan="3">No transactions found</td></tr>
                        )}
                    </table>
                </div>
                <button onClick={this.props.logout}>Logout</button>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedUser: state.loggedUser,
        transactions: state.transactions,
        isAuthenticated: state.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserTransactions: (userId) => dispatch(getUserTransactions(userId)),
        logout: () => dispatch({type: 'LOGOUT_SUCCESS'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Transactions);