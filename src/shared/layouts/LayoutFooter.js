import React, { Component } from 'react'
import { connect } from 'react-redux'

class LayoutFooter extends Component {
  prevent(e) {
    e.preventDefault()
  }

  render() {
    return (
      <nav className={`layout-footer footer bg-${this.props.footerBg}`}>
        <div className="container-fluid d-flex flex-wrap justify-content-between text-center container-p-x pb-3">
          <div className="pt-3">
            <span className="footer-text font-weight-bolder">TechScienceOnline</span> ©
          </div>
          <div>
            <a rel="noopener noreferrer" href="http://techscienceonline.com/" target="_blank" onClick={this.prevent}
               className="footer-link pt-3">About
              Us</a>
            <a rel="noopener noreferrer" href="http://techscienceonline.com/" target="_blank" onClick={this.prevent}
               className="footer-link pt-3 ml-4">Help</a>
            <a rel="noopener noreferrer" href="http://techscienceonline.com/" target="_blank" onClick={this.prevent}
               className="footer-link pt-3 ml-4">Contact</a>
            <a rel="noopener noreferrer" href="http://techscienceonline.com/" target="_blank" onClick={this.prevent}
               className="footer-link pt-3 ml-4">Terms &amp; Conditions</a>
          </div>
        </div>
      </nav>
    )
  }
}

export default connect(store => ({
  footerBg: store.theme.footerBg
}))(LayoutFooter)
