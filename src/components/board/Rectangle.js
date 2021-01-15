import React, { useRef } from "react";
import { Rect, Transformer } from "react-konva";

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, draggable, fill, stroke }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  React.useEffect(() => {
    if (isSelected) {
      // noinspection JSUnresolvedFunction
      trRef.current.setNode(shapeRef.current);

      // noinspection JSUnresolvedFunction
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        onClick={onSelect}
        ref={shapeRef}
        stroke={stroke}
        fill={fill}
        width={128}
        height={128}
        x={shapeProps ? shapeProps.x : 30}
        y={shapeProps ? shapeProps.y : 50}
        offsetX={128 / 2}
        offsetY={128 / 2}
        draggable={draggable}
        onDragEnd={e => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          //here the transform will change the scale
          const node = shapeRef.current;

          // noinspection JSUnresolvedFunction
          const scaleX = node.scaleX();

          // noinspection JSUnresolvedFunction
          const scaleY = node.scaleY();

          // noinspection JSUnresolvedFunction
          node.scaleX(1);

          // noinspection JSUnresolvedFunction
          node.scaleY();

          // noinspection JSUnresolvedFunction
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
      />
      {isSelected && <Transformer ref={trRef}/>}
    </>
  );
};

export default Rectangle;
