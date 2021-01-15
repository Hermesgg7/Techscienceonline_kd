import React from "react";
import { Button, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { v1 as uuIdv1 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import { addShapeGroup, clearAll, clearShapes, deleteShape, updateShapes } from "../../store/actions/boardActions";
import CONSTANT from "../../constants/constants";

const Toolbar = (props) => {
  const { scale, onChangeScale } = props;
  const [shapes, selectedShape, shapeHistories] =
    useSelector(({ board }) => [board.shapes || [], board.selectedShape, board.shapeHistories || []]);
  const dispatch = useDispatch();

  const onClickZoomOut = () => {
    let newR = scale;
    newR += CONSTANT.ZOOM_IN_OUT.INCREMENT_SCALE;

    if (newR > 2) return;
    onChangeScale && onChangeScale(newR);
  };

  const onClickZoomIn = () => {
    let newR = scale;
    newR -= CONSTANT.ZOOM_IN_OUT.INCREMENT_SCALE;

    if (newR < 0.1) return;
    onChangeScale && onChangeScale(newR);
  };

  const onClickDelete = () => {
    dispatch(deleteShape(selectedShape));
  };

  const onClickClearAll = () => {
    dispatch(clearAll());
  };

  const onMakeWord = (e) => {
    e.preventDefault();

    if (shapes && shapes.length === 0) {
      return;
    }

    const id = uuIdv1();
    const group = {
      id: id,
      groupItems: [],
      x: shapes[0].props.x,
      y: shapes[0].props.y
    };

    let count = 0;
    for (let shape of shapes) {
      const tempShape = { ...shape };
      tempShape.props = { ...tempShape.props, x: 80 * count, y: 0 };

      group.groupItems.push(tempShape);
      count++;
    }

    dispatch(clearShapes());
    dispatch(addShapeGroup(group));
  };

  const onClickUndo = () => {
    const lastId = shapeHistories[shapeHistories.length - 1];
    let index = shapes.findIndex(c => c.id === lastId);

    if (index !== -1) {
      shapes.splice(index, 1);
      shapeHistories.pop();
      dispatch(updateShapes(shapes));
    }
  };

  const calculateScalePercentage = () => {
    const totalPercentage = (scale || CONSTANT.ZOOM_IN_OUT.DEFAULT_SCALE) * 100;

    return parseInt(totalPercentage.toString());
  };

  return (
    <Media className="flex-wrap align-items-center py-1 px-3">
      <Media.Body className="d-flex flex-wrap flex-basis-100 flex-basis-sm-auto">
        <OverlayTrigger overlay={<Tooltip id="zoomPercentage">Scale Percentage</Tooltip>}>
          <Button variant="default borderless md-btn-flat icon-btn text-muted">
            {calculateScalePercentage()}%
          </Button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="zoomOut">Zoom out</Tooltip>}>
          <Button variant="default borderless md-btn-flat icon-btn text-muted" onClick={onClickZoomOut}>
            <i className="fas fa-search-plus"/>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="zoomIn">Zoom in</Tooltip>}>
          <Button variant="default borderless md-btn-flat icon-btn text-muted" onClick={onClickZoomIn}>
            <i className="fas fa-search-minus"/>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="undo">Undo</Tooltip>}>
          <Button variant="default borderless md-btn-flat icon-btn text-muted" onClick={onClickUndo}>
            <i className="fas fa-undo-alt"/>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="delete">Delete</Tooltip>}>
          <Button variant="default borderless md-btn-flat icon-btn text-muted" onClick={onClickDelete}>
            <i className="fas fa-trash"/>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="clear-all">Clear All</Tooltip>}>
          <Button variant="default borderless md-btn-flat icon-btn text-muted" onClick={onClickClearAll}>
            <i className="fas fa-times"/>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="arrange">Arrange</Tooltip>}>
          <Button variant="default borderless md-btn-flat icon-btn text-muted" onClick={onMakeWord}>
            <i className="fas fa-bookmark"/>
          </Button>
        </OverlayTrigger>
      </Media.Body>
    </Media>
  );
};

export default Toolbar;
