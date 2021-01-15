import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Badge } from 'react-bootstrap'
import layoutHelpers from './helpers'
import logo from '../../assets/img/logo/logo.png';
import user1 from '../../assets/img/avatars/1.png';

class LayoutNavbar extends Component {
  constructor(props) {
    super(props)
    this.isRTL = document.documentElement.getAttribute('dir') === 'rtl'
  }

  toggleSidenav(e) {
    e.preventDefault()
    layoutHelpers.toggleCollapsed()
  }

  render() {
    return (
      <Navbar bg={this.props.navbarBg} expand="lg" className="layout-navbar align-items-lg-center container-p-x">

        {/* Brand */}
        <Navbar.Brand as={NavLink} to="/" className="app-brand demo py-0 mr-4">
          <span className="app-brand-logo demo">
            <img src={logo} alt="tech science online" height="40"/>
          </span>
          <span className="app-brand-text demo font-weight-normal ml-2"/>
        </Navbar.Brand>

        {/* Sidenav toggle */}
        {this.props.sidenavToggle && (
          <Nav className="align-items-lg-center mr-auto mr-lg-4">
            <Nav.Item as="a" className="nav-item nav-link px-0 ml-2 ml-lg-0" href="#toggle"
                      onClick={this.toggleSidenav}>
              <i className="ion ion-md-menu text-large align-middle"/>
            </Nav.Item>
          </Nav>
        )}

        {/* Navbar toggle */}
        <Navbar.Toggle/>

        <Navbar.Collapse>
          <Nav className="align-items-lg-center">
          </Nav>

          <Nav className="align-items-lg-center ml-auto">
            <Dropdown as={Nav.Item} className="demo-navbar-notifications mr-lg-3" alignRight={!this.isRTL}>
              <Dropdown.Toggle as={Nav.Link} className="hide-arrow">
                <i className="ion ion-md-notifications-outline navbar-icon align-middle"/>
                <Badge variant="primary badge-dot indicator"/>
                <span className="d-lg-none align-middle">&nbsp; Notifications</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={Nav.Item} className="demo-navbar-messages mr-lg-3" alignRight={!this.isRTL}>
              <Dropdown.Toggle as={Nav.Link} className="hide-arrow">
                <i className="ion ion-ios-mail navbar-icon align-middle"/>
                <Badge variant="primary badge-dot indicator"/>
                <span className="d-lg-none align-middle">&nbsp; Messages</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
              </Dropdown.Menu>
            </Dropdown>

            {/* Divider */}
            <div
              className="nav-item d-none d-lg-block text-big font-weight-light line-height-1 opacity-25 mr-3 ml-1">|
            </div>

            <Dropdown as={Nav.Item} className="demo-navbar-user" alignRight={!this.isRTL}>
              <Dropdown.Toggle as={Nav.Link}>
                <span className="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
                  <img src={user1} className="d-block ui-w-30 rounded-circle"
                       alt="User"/>
                  <span className="px-1 mr-lg-2 ml-2 ml-lg-0">Mike Greene</span>
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item hred="#"><i className="ion ion-ios-person text-lightest"/> &nbsp; My
                  profile</Dropdown.Item>
                <Dropdown.Item hred="#"><i
                  className="ion ion-ios-mail text-lightest"/> &nbsp; Messages</Dropdown.Item>
                <Dropdown.Item hred="#"><i className="ion ion-md-settings text-lightest"/> &nbsp; Account
                  settings</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item hred="#"><i className="ion ion-ios-log-out text-danger"/> &nbsp; Log
                  Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    )
  }
}

LayoutNavbar.propTypes = {
  sidenavToggle: PropTypes.bool
}

LayoutNavbar.defaultProps = {
  sidenavToggle: true
}

export default connect(store => ({
  navbarBg: store.theme.navbarBg
}))(LayoutNavbar)
