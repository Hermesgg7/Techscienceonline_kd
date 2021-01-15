import React, { useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

const Img = ({ imageProps, isSelected, onSelect, onChange, imageUrl, draggable }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [image] = useImage(imageUrl);

  useEffect(() => {
    if (isSelected) {
      //we need to attach transformer to images manually
      // noinspection JSUnresolvedFunction
      trRef.current.setNode(shapeRef.current);

      // noinspection JSUnresolvedFunction
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        onClick={onSelect}
        image={image}
        ref={shapeRef}
        draggable={draggable}
        x={imageProps ? imageProps.x : 30}
        y={imageProps ? imageProps.y : 50}
        offsetX={128 / 2}
        offsetY={128 / 2}
        onDragEnd={e => {
          onChange({
            ...imageProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;

          // noinspection JSUnresolvedFunction
          const scaleX = node.scaleX();

          // noinspection JSUnresolvedFunction
          const scaleY = node.scaleY();

          // noinspection JSUnresolvedFunction
          onChange({
            ...imageProps,
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

export default Img;
