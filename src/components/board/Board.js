import React, { Component } from 'react'
import Canvas from "./Canvas";
import { Col, Row } from "react-bootstrap";
import LeftMenu from "./LeftMenu";

class Board extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Board')
  }

  render() {
    return (
      <Row>
        <Col md={3} className="border-bottom border-right ps pr-0">
          <LeftMenu/>
        </Col>
        <Col md={9} className="h-100 p-0">
          <Canvas/>
        </Col>
      </Row>
    )
  }
}

export default Board
