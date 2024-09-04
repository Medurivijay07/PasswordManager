import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

class App extends Component {
  state = {
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    showpassword: false,
    searchInput: '',
  }

  onChangingWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangingUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangingPassword = event => {
    this.setState({password: event.target.value})
  }

  onAddingNewpassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  onToggleShowPassword = () => {
    this.setState(prevState => ({showpassword: !prevState.showpassword}))
  }

  onChangingSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  deletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(item => item.id !== id),
    }))
  }

  renderPasswordItems = () => {
    const {passwordsList, showpassword, searchInput} = this.state

    const filteredPasswordList = passwordsList.filter(item =>
      item.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (filteredPasswordList.length === 0) {
      return (
        <div className="nopasswords-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="nopasswords-image"
          />
          <p className="no-passwords">No Passwords</p>
        </div>
      )
    }
    return (
      <ul className="password-list">
        {filteredPasswordList.map(item => (
          <li key={item.id} className="password-item">
            <div className="password-card">
              <div className="password-logo">
                <span>{item.website.charAt(0).toUpperCase()}</span>
              </div>
              <div className="password-details">
                <p className="website">{item.website}</p>
                <p className="username">{item.username}</p>
                <p className="password">
                  {showpassword ? (
                    item.password
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      alt="stars"
                      className="stars-image"
                    />
                  )}
                </p>
              </div>
              <button
                type="button"
                className="delete-button"
                onClick={() => this.deletePassword(item.id)}
                data-testid="delete"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                  alt="delete"
                  className="del-image"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {
      website,
      username,
      password,
      showpassword,
      searchInput,
      passwordsList,
    } = this.state
    const filteredPasswords = passwordsList.filter(item =>
      item.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="password-manager">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="top-container">
          <div className="add-newpassword">
            <h1 className="new-password-heading">Add New Password</h1>
            <form onSubmit={this.onAddingNewpassword}>
              <div className="website-input-container">
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="website-logo"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="website-input-style"
                  onChange={this.onChangingWebsite}
                  value={website}
                />
              </div>
              <div className="website-input-container">
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="website-logo"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="website-input-style"
                  onChange={this.onChangingUsername}
                  value={username}
                />
              </div>
              <div className="website-input-container">
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="website-logo"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="website-input-style"
                  onChange={this.onChangingPassword}
                  value={password}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img"
          />
        </div>
        <div className="bottom-container">
          <div className="password-search-container">
            <div className="passwords-count-length">
              <h1 className="passwords-count">Your Passwords</h1>
              <p>{filteredPasswords.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onChangingSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="showpasswords-cont">
            <input
              type="checkbox"
              id="showPassword"
              checked={showpassword}
              onChange={this.onToggleShowPassword}
            />
            <label htmlFor="showPassword" className="show-password">
              Show Passwords
            </label>
          </div>
          <div>{this.renderPasswordItems()}</div>
        </div>
      </div>
    )
  }
}

export default App
