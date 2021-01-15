import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { isEmpty } from 'ramda';

import { ColorPicker } from "./ColorPicker";
import CONSTANT from "../../constants/constants";

export function PropertiesPanel(props) {
  const { selectedShape, onChangeColor, gridLine, onChangeGridLine } = props;

  const onChangeColorPlate = (colorProperty) => (colorHexCode) => {
    const properties = {
      [colorProperty]: colorHexCode
    };

    onChangeColor && onChangeColor(properties);
  };

  const onChangeGridLabel = () => {
    onChangeGridLine && onChangeGridLine();
  };

  return (
    <Card className="w-100 h-100 border-top-0 border-radius-0 border-left">
      <Card.Header as="h5">Properties</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group>
            <Form.Check
              custom type="checkbox"
              label="Grid"
              name="grid-line-checkbox"
              id="grid-line-checkbox"
              checked={!!gridLine}
              onChange={onChangeGridLabel}/>
          </Form.Group>
          <hr className="border-light"/>
          {selectedShape && selectedShape.boardItem && (
            <>
              <Form.Group as={Row} className="mb-0">
                <Form.Label column sm={5}>Name</Form.Label>
                <Col sm={7}>
                  <Form.Control plaintext readOnly defaultValue={selectedShape.boardItem.categoryName}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-0">
                <Form.Label column sm={5}>Background</Form.Label>
                <Col sm={7}>
                  <ColorPicker
                    selectedColor={selectedShape.backgroundColor}
                    onChange={onChangeColorPlate(CONSTANT.SHAPE_COLOR_PROPERTIES.BACKGROUND)}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={5}>Stroke</Form.Label>
                <Col sm={7}>
                  <ColorPicker
                    selectedColor={selectedShape.strokeColor}
                    onChange={onChangeColorPlate(CONSTANT.SHAPE_COLOR_PROPERTIES.STROKE)}/>
                </Col>
              </Form.Group>
            </>
          )}
        </Form>
        {isEmpty(selectedShape) && (
          <>
            <Card.Title as="h6">Nothing is selected</Card.Title>
            <Card.Text>You can change the background and stroke color easily by selecting the any shape</Card.Text>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
