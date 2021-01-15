export const DRAG_DATA_KEY = "__drag_data_payload__";

const ELEMENT_TYPE = Object.freeze({
  IMAGE: "IMAGE"
});

const COLORS = Object.freeze({
  YELLOW: "#FFFF00",
  RED: "#FF0000",
  GREEN: "#00FF00",
  BLUE: "#FFFF00",
  BLACK: "#000000"
});

const SHAPE_COLOR_PROPERTIES = {
  BACKGROUND: 'backgroundColor',
  STROKE: 'strokeColor',
};

const ZOOM_IN_OUT = {
  DEFAULT_SCALE: 1,
  INCREMENT_SCALE: 0.1
};

const CONSTANT = {
  ELEMENT_TYPE: ELEMENT_TYPE,
  COLORS: COLORS,
  SHAPE_COLOR_PROPERTIES: SHAPE_COLOR_PROPERTIES,
  ZOOM_IN_OUT: ZOOM_IN_OUT
}

export default CONSTANT;
