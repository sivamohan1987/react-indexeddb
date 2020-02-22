import { useIndexedDB } from 'react-indexed-db';

export function addUserData() {
    return dispatch => {
        const { add } = useIndexedDB('user');
        add({ username: 'mohan', password: '123456' }).then(
            event => {
                dispatch({type: 'USERS_ADDED', payload: true});
            },
            error => {
                dispatch({type: 'USERS_ADDED', payload: false});
            }
        );
    }
}

export function addTransactionData() {
    return dispatch => {
        const { add } = useIndexedDB('transactions');
        add({ userid: 1, type: 'Cr', amount: '1500' });
        add({ userid: 1, type: 'Dr', amount: '1000' });
        add({ userid: 1, type: 'Dr', amount: '100' });
    }
}

export function loginUser(username) {
    return dispatch => {
        dispatch({type: 'LOGIN_SUCCESS', payload: {}});
        dispatch({type: 'LOGIN_FAILED', payload: false});

        const { getByIndex } = useIndexedDB('user');
        getByIndex('username', username).then(
            userInfo => {
                console.log(userInfo);
                if (userInfo) {
                    dispatch({type: 'LOGIN_SUCCESS', payload: userInfo});
                } else {
                    dispatch({type: 'LOGIN_FAILED', payload: true});
                }
            },
            error => {
                console.log(error);
            }
        );
    }
}

export function getUserTransactions(userId) {
    console.log("userID >> ", userId);
    return dispatch => {
        const { getAll } = useIndexedDB('transactions');
        getAll().then(transactions => {
            let userTransactions = transactions.filter(transaction => userId == transaction.userid);
            dispatch({type: 'TRANSACTION_SUCCESS', payload: userTransactions});
        });
    }
}