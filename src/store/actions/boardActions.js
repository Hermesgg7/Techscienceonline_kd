import {
  ADD_SHAPE,
  DELETE_SHAPE,
  UPDATE_SHAPE,
  SELECT_SHAPE,
  CLEAR_SHAPES,
  ADD_SHAPE_GROUP,
  UPDATE_SHAPE_GROUPS,
  SELECT_SHAPE_GROUP,
  CLEAR_ALL, UPDATE_SHAPES,
  UPDATE_SHAPE_GROUP
} from "../actionTypes/boardActionTypes";

export const clearAll = () => {
  return {
    type: CLEAR_ALL
  }
};

export const addShape = (shape) => {
  return {
    type: ADD_SHAPE,
    payload: shape
  }
};

export const deleteShape = (shape) => {
  return {
    type: DELETE_SHAPE,
    payload: shape
  }
};

export const updateShape = (shape) => {
  return {
    type: UPDATE_SHAPE,
    payload: shape
  }
};

export const selectShape = (shape) => {
  return {
    type: SELECT_SHAPE,
    payload: shape
  }
};

export const clearShapes = () => {
  return {
    type: CLEAR_SHAPES
  }
};

export const updateShapes = (shapes) => {
  return {
    type: UPDATE_SHAPES,
    payload: shapes
  }
};

export const addShapeGroup = (shapeGroup) => {
  return {
    type: ADD_SHAPE_GROUP,
    payload: shapeGroup
  }
};

export const updateShapeGroup = (shapeGroup) => {
  return {
    type: UPDATE_SHAPE_GROUP,
    payload: shapeGroup
  }
};

export const selectShapeGroup = (shapeGroup) => {
  return {
    type: SELECT_SHAPE_GROUP,
    payload: shapeGroup
  }
};

export const updateShapeGroups = (shapeGroups) => {
  return {
    type: UPDATE_SHAPE_GROUPS,
    payload: shapeGroups
  }
};

