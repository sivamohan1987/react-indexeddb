import React from 'react';
import { connect } from 'react-redux';
import { addUserData, addTransactionData, loginUser } from './../actions/actionCreators';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usersImported: false,
            username: '',
            password: ''
        }
    }
    componentDidMount() {
        this.props.addUserData();
        this.props.addTransactionData();
    }
    componentDidUpdate(prevProp, prevState) {
        console.log(this.props);
        if (!prevProp.isAuthenticated && this.props.isAuthenticated) {
            this.props.history.push('/transactions');
        }
    }
    handleLogin(e) {
        console.log("handle login >> ", this.state);
        this.props.loginUser(this.state.username);
    }
    render() {
        const {username, password} = this.state;
        return (
            <div className="login-form" style={{display: 'flex', flexDirection: 'column'}}>
                {this.props.loginFailed && 
                    <div style={{color: "red"}}>Invalid username</div>
                }
                <div className="element">
                    <label style={{marginRight: '5px'}}>Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => { this.setState({username: e.target.value}) }}/>
                </div>
                <div className="element">
                    <label style={{marginRight: '5px'}}>Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => { this.setState({password: e.target.value}) }}/>
                </div>
                <div><button onClick={this.handleLogin.bind(this)}>Login</button></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        usersAdded: state.usersAdded,
        loginFailed: state.loginFailed,
        isAuthenticated: state.isAuthenticated,
        loggedUser: state.loggedUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUserData: () => dispatch(addUserData()),
        addTransactionData: () => dispatch(addTransactionData()),
        loginUser: (username) => dispatch(loginUser(username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login);