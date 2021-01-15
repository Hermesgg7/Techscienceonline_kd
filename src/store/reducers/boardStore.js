import {
  ADD_SHAPE,
  UPDATE_SHAPE,
  SELECT_SHAPE,
  CLEAR_SHAPES,
  UPDATE_SHAPES,
  ADD_SHAPE_GROUP,
  UPDATE_SHAPE_GROUPS,
  SELECT_SHAPE_GROUP,
  CLEAR_ALL,
  DELETE_SHAPE,
  UPDATE_SHAPE_GROUP
} from "../actionTypes/boardActionTypes";

const initialState = {
  shapeHistories: [],
  shapes: [],
  selectedShape: {},
  shapeGroups: [],
  selectedShapeGroup: {},
};

const BoardStore = (state = initialState, action = {}) => {
  switch (action.type) {
    case CLEAR_ALL: {
      return {
        ...initialState
      };
    }

    case ADD_SHAPE: {
      return {
        ...state,
        shapes: [...state.shapes, action.payload],
        shapeHistories: [...state.shapeHistories, action.payload.id]
      };
    }

    case UPDATE_SHAPE: {
      const index = state.shapes.findIndex(item => item.id === action.payload.id);

      if (index > -1) {
        state.shapes[index] = { ...action.payload };
      }

      return {
        ...state,
        shapes: state.shapes
      };
    }

    case DELETE_SHAPE: {
      const index = state.shapes.findIndex(i => i.id === action.payload.id);

      if (index !== -1) {
        state.shapes.splice(index, 1);
      }

      return {
        ...state,
        selectedShape: {},
        shapes: state.shapes
      };
    }

    case SELECT_SHAPE: {
      return {
        ...state,
        selectedShape: action.payload
      };
    }

    case CLEAR_SHAPES: {
      return {
        ...state,
        shapes: [],
        selectedShape: {}
      };
    }

    case UPDATE_SHAPES: {
      return {
        ...state,
        shapes: [...action.payload]
      };
    }

    case ADD_SHAPE_GROUP: {
      return {
        ...state,
        shapeGroups: [...state.shapeGroups, action.payload]
      };
    }

    case UPDATE_SHAPE_GROUP: {
      const index = state.shapeGroups.findIndex(item => item.id === action.payload.id);

      if (index > -1) {
        state.shapeGroups[index] = { ...action.payload };
      }

      return {
        ...state,
        shapeGroups: state.shapeGroups
      };
    }

    case SELECT_SHAPE_GROUP: {
      return {
        ...state,
        selectedShapeGroup: action.payload
      };
    }

    case UPDATE_SHAPE_GROUPS: {
      return {
        ...state,
        shapeGroups: [...action.payload]
      };
    }

    default:
      return state;
  }
}

export default BoardStore;
