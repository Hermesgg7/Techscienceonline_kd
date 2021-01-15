import React, { Component } from 'react';
import AppContext from './AppContext';
import GLOBAL from "../global";

class AppProvider extends Component {
  state = {
    authenticated: false,
    userInfo: null,
    boardItems: []
  };

  componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      GLOBAL.USER_INFO = userInfo;
      this.authenticate(true);
      this.storeUserInfo(userInfo);
    }
  }

  authenticate = (authenticated) => {
    this.setState({ authenticated: authenticated });
  };

  deAuthenticate = () => {
    this.authenticate(false);
    this.storeUserInfo(null);
    GLOBAL.USER_INFO = null;
    localStorage.removeItem("userInfo");
    window.location.href = '/';
  };

  storeUserInfo = (userInfo) => {
    this.setState({ userInfo: userInfo });
  };

  storeUserInfoToLocalStorage = () => {
    localStorage.removeItem("userInfo");
    localStorage.setItem("userInfo", JSON.stringify(GLOBAL.USER_INFO));
  };

  storeBoardItem = (boardItem) => {
    const { boardItems } = this.state;
    boardItems.push(boardItem);

    this.setState({ boardItems: boardItems });
  };

  render() {
    const { children } = this.props;
    return (
      <AppContext.Provider value={{
        ...this.state,
        authenticate: this.authenticate,
        deAuthenticate: this.deAuthenticate,
        storeUserInfo: this.storeUserInfo,
        storeUserInfoToLocalStorage: this.storeUserInfoToLocalStorage,
        storeBoardItem: this.storeBoardItem
      }}>
        {children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
