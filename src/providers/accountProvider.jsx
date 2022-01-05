// src/providers/AccountProvider.js
import React from 'react'
// Set Up The Initial Context
const AccountContext = React.createContext()
// Create an exportable consumer that can be injected into components
export const AccountConsumer = AccountContext.Consumer
// Create the provider using a traditional React.Component class
class AccountProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: false,
      updateAccount: updatedAccount => this.updateAccount(updatedAccount)
    }
  }
  updateAccount = updatedAccount => {
    this.setState({
      currentUser: updatedAccount
    })
  }

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) 
      this.setState({currentUser})
  }
  render() {
    return (
      <AccountContext.Provider value={this.state}>
        {this.props.children}
      </AccountContext.Provider>
    )
  }
}
export default AccountProvider