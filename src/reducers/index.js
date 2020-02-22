const initialState = {
    usersAdded: false,
    loggedUser: {},
    isAuthenticated: false,
    loginFailed: false,
    transactions: []
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case 'USERS_ADDED':
            return Object.assign({}, state, {
                usersAdded: action.payload
            })
        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, {
                loggedUser: action.payload,
                isAuthenticated: true
            })
        case 'LOGOUT_SUCCESS':
            return Object.assign({}, state, {
                loggedUser: {},
                isAuthenticated: false
            })
        case 'LOGIN_FAILED':
            return Object.assign({}, state, {
                loginFailed: action.payload,
                isAuthenticated: false
            })
        case 'TRANSACTION_SUCCESS':
            return Object.assign({}, state, {
                transactions: action.payload
            })
        default:
            return state
    }
}