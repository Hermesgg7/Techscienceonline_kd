import React, { createRef, Fragment, useEffect, useRef, useState } from "react";
import { Group, Layer, Stage, Text } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { v1 as uuIdv1 } from 'uuid';
import { isEmpty } from 'ramda';

import BoardItems from "../../assets/data/boardItem.json";
import boardService from "../../services/BoardService";
import CONSTANT, { DRAG_DATA_KEY } from "../../constants/constants";
import { getSvgImageUrl, playAudio } from "../../utils/Utils";
import { getElementHeight, getElementWidth } from "../../utils/DomUtil";
import Img from "./Image";
import Rectangle from "./Rectangle";
import Toolbar from "./Toolbar";
import Portal from "./Portal";
import { PropertiesPanel } from "./PropertiesPanel";
import rightAnswer from "../../assets/sounds/right_answer.mp3";
import wrongAnswer from "../../assets/sounds/wrong_answer.mp3";

import {
  addShape,
  selectShape,
  updateShape,
  deleteShape,
  selectShapeGroup,
  updateShapeGroup
} from "../../store/actions/boardActions";

const DEFAULT_ANSWER_BOX_STYLE = {
  border: 'none',
  fontSize: '60px',
  textAlign: 'center',
  background: CONSTANT.COLORS.YELLOW,
  resize: "none",
  width: 120,
  height: 120,
  position: 'absolute',
  top: '0',
  left: '0'
};
const ANSWER_BOX_ID = "216";

const Canvas = () => {
  const [shapes, selectedShape, shapeGroups, selectedShapeGroup] = useSelector(({ board }) =>
    [board.shapes || [], board.selectedShape, board.shapeGroups || [], board.selectedShapeGroup]);
  const dispatch = useDispatch();

  const stageRef = useRef();
  const layerRef = createRef();
  const perfectScrollRef = useRef();
  const answersBoxRef = useRef({});

  const [scale, setScale] = useState(1);
  const [gridLine, setGridLine] = useState(true);
  const [answerValue, setAnswerValue] = useState('');
  const [showAnswerBox, setShowAnswerBox] = useState(false);
  const [answerBoxStyle, setAnswerBoxStyle] = useState(DEFAULT_ANSWER_BOX_STYLE);

  // eslint-disable-next-line
  const handleKeyDown = (event) => {
    if (event.code === "Delete") {
      dispatch(deleteShape(selectedShape));
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    perfectScrollRef.current.scrollLeft = getWidthScroll() - 150;

    return () => {
      // remove the event listener we had attached
      window.removeEventListener('keydown', handleKeyDown)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleKeyDown]);

  const onDropCanvas = async (event) => {
    const eventData = event.nativeEvent.dataTransfer.getData(DRAG_DATA_KEY);
    if (!eventData) return;

    const draggedData = JSON.parse(eventData);
    const item = (BoardItems || []).find(item => item.id === draggedData.id);

    if (item && item.audioUrl) {
      playAudio(item.audioUrl);
    }

    // noinspection JSUnresolvedFunction
    stageRef.current.setPointersPositions(event);

    const response = await boardService.getSvgString(item.imageUrl);
    let { data } = response;
    const url = getSvgImageUrl(data);

    const id = uuIdv1();

    // noinspection JSUnresolvedFunction
    const stagePositions = stageRef.current.getPointerPosition();

    const shape = {
      id: id,
      text: item.name,
      boardItemId: item.id,
      content: url,
      svgString: data,
      backgroundColor: CONSTANT.COLORS.YELLOW,
      strokeColor: CONSTANT.COLORS.RED,
      props: { ...stagePositions },
      boardItem: { ...item }
    };

    dispatch(addShape(shape));
  }

  const onDragOverCanvas = (event) => {
    event.preventDefault()
  };

  const onMouseDown = () => {
    dispatch(selectShape({}));
  };

  const onSelectItem = (shape) => () => {
    dispatch(selectShape(shape));

    if (shape && shape.boardItem && shape.boardItem.audioUrl) {
      playAudio(shape.boardItem.audioUrl);
    }
  };

  const onSelectGroupItem = (groupItems) => () => {
    // noinspection JSIgnoredPromiseFromCall
    onPlayWord(groupItems);
  };

  const onPlayWord = async (groupItems) => {
    if (groupItems && groupItems.length === 0) {
      return;
    }

    const payload = {};
    payload.text = groupItems.map(shape => {
      if (shape.boardItem.categoryCode !== 'alphabet') {
        return '';
      }

      return shape.boardItem.name;
    }).join('');

    if (!payload.text) {
      return;
    }

    const response = await boardService.getTextToSpeech(payload);
    const { data, success, error } = response;

    if (!success) {
      console.log(error);
      return;
    }

    playAudio(data);
  };

  const onChangeAnswerBox = (e) => {
    if (!isEmpty(selectedShape)) {
      _calculateAnswer(e, shapes);
    } else {
      _calculateAnswer(e, selectedShapeGroup.groupItems);
    }
  };

  const onChangeProperty = (properties) => {
    selectedShape.backgroundColor = !properties.backgroundColor ? selectedShape.backgroundColor : properties.backgroundColor;
    selectedShape.strokeColor = !properties.strokeColor ? selectedShape.strokeColor : properties.strokeColor;
    selectedShape.content = getSvgImageUrl(selectedShape.svgString, selectedShape.backgroundColor, selectedShape.strokeColor);

    dispatch(updateShape(selectedShape));
  };

  const onChangeScale = (scale) => {
    setScale(scale);
  };

  const onChangeShowGridLine = () => {
    setGridLine(!gridLine);
  };

  const onClickAnswerBox = (whichOne, shape, shapeGroup) => () => {
    const stage = stageRef.current;
    const textNode = answersBoxRef.current[shape.id];
    const textPosition = textNode.absolutePosition();

    // noinspection JSUnresolvedFunction
    const stageBox = stage.container().getBoundingClientRect();

    const answerBoxPositions = {
      ...DEFAULT_ANSWER_BOX_STYLE,
      left: stageBox.left + textPosition.x - 695,
      top: stageBox.top + textPosition.y - 146
    };

    // noinspection JSCheckFunctionSignatures
    setAnswerBoxStyle(answerBoxPositions);
    setShowAnswerBox(true);
    setAnswerValue(shape.answerValue ? shape.answerValue : '');

    setTimeout(() => {
      const inputBox = document.getElementById('txtAnswerBox');
      inputBox.focus();
    }, 0);

    if (whichOne === 1) {
      dispatch(selectShape(shape));
    } else {
      dispatch(selectShapeGroup(shapeGroup));
    }
  };

  const onBlurAnswerBox = () => {
    setAnswerValue('');
    setShowAnswerBox(false);
  };

  const _calculateAnswer = (e, shapeItems) => {
    let expression = shapeItems.map(shape => {
      return shape.boardItem.name;
    }).join('');

    expression = expression.replace('=', '');
    expression = expression.replace('?', '');
    const textBoxValue = e.target.value;
    let validAnswer = false;

    try {
      // eslint-disable-next-line
      const expressionValue = eval(expression);
      const value = parseInt(textBoxValue);
      if (isNaN(value)) {
        setAnswerValue(textBoxValue);
        return;
      }

      if (expressionValue !== value) {
        setAnswerBoxStyle({ ...answerBoxStyle, background: CONSTANT.COLORS.RED });
        playAudio(wrongAnswer);
      } else {
        validAnswer = true;
        setAnswerBoxStyle({ ...answerBoxStyle, background: CONSTANT.COLORS.GREEN })
        playAudio(rightAnswer);
      }
    } catch (e) {
      setAnswerBoxStyle({ ...answerBoxStyle, background: CONSTANT.COLORS.RED });
      playAudio(wrongAnswer);
    }

    if (!isEmpty(selectedShape)) {
      selectedShape.validAnswer = validAnswer;
      selectedShape.answerValue = textBoxValue;
      dispatch(updateShape(selectedShape));

    } else {
      const index = selectedShapeGroup.groupItems.findIndex(item => item.boardItemId === ANSWER_BOX_ID);

      if (index > -1) {
        const groupItem = selectedShapeGroup.groupItems[index];
        groupItem.validAnswer = validAnswer;
        groupItem.answerValue = textBoxValue;
      }

      dispatch(updateShapeGroup(selectedShapeGroup));
    }

    setAnswerValue(e.target.value);
  };

  const getHeight = () => {
    return +getElementHeight('root') + 800;
  };

  const getWidth = () => {
    return +getElementWidth('root') + 500;
  };

  const getHeightScroll = () => {
    return +getElementHeight('root') - 185;
  };

  const getWidthScroll = () => {
    return +getElementWidth('root') - 1040;
  };

  // noinspection RequiredAttributes,JSValidateTypes
  return (
    <div className="d-flex flex-column w-100 h-100">
      <div className="flex-grow-0 toolbar">
        <Toolbar scale={scale} onChangeScale={onChangeScale}/>
      </div>
      <div className="flex-grow-1 position-relative">
        <main className="row h-100" onDrop={onDropCanvas} onDragOver={onDragOverCanvas}>
          <div className="col-9 p-0" id="stage-container">
            <PerfectScrollbar
              style={{ height: getHeightScroll(), width: getWidthScroll() }}
              containerRef={el => (perfectScrollRef.current = el)}>
              <Stage
                className={gridLine ? 'grid-line' : 'no-grid-line'}
                style={{ height: getHeight(), width: getWidth() }}
                ref={stageRef}
                height={getHeight()}
                width={getWidth()}
                scaleX={scale}
                scaleY={scale}
                onMouseDown={onMouseDown}
              >
                <Layer ref={layerRef}>
                  {shapes.map((shape, i) => {
                    // noinspection JSUnresolvedVariable
                    return (
                      <Fragment key={i}>
                        {shape.boardItemId !== ANSWER_BOX_ID && (
                          <Img
                            key={`shape-${i}`}
                            draggable
                            imageProps={shape.props}
                            imageUrl={shape.content}
                            isSelected={shape.id === selectedShape.id}
                            onSelect={onSelectItem(shape)}
                            onChange={newAttrs => {
                              const tempImages = shapes.slice();
                              tempImages[i] = newAttrs;
                            }}
                          />
                        )}
                        {shape.boardItemId === ANSWER_BOX_ID && (
                          <Group
                            key={`shape-answer-${i}`}
                            draggable
                            onClick={onSelectItem(shape)}>
                            <Rectangle
                              fill={shape.validAnswer ? CONSTANT.COLORS.GREEN : CONSTANT.COLORS.RED}
                              stroke={shape.strokeColor}
                              shapeProps={shape.props}
                              isSelected={shape.id === selectedShape.id}
                              onChange={newAttrs => {
                                const rects = shapes.slice();
                                rects[i] = newAttrs;
                              }}
                            />
                            <Text
                              ref={ref => (answersBoxRef.current[shape.id] = ref)}
                              text={shape.answerValue ? shape.answerValue : shape.text}
                              x={shape.props.x - 65}
                              y={shape.props.y - 45}
                              fontSize={100}
                              fill={CONSTANT.COLORS.BLACK}
                              width={130}
                              height={130}
                              padding={2}
                              onDblClick={onClickAnswerBox(1, shape)}
                              align={'center'}/>
                          </Group>
                        )}
                      </Fragment>
                    );
                  })}
                  {shapeGroups.map((shapeGroup, index) => {
                    return (
                      <Group
                        id={shapeGroup.id}
                        x={shapeGroup.x}
                        y={shapeGroup.y}
                        key={`shape-group-${index}`}
                        draggable
                        onClick={onSelectGroupItem(shapeGroup.groupItems)}>
                        {(shapeGroup.groupItems || []).map((shape, i) => {
                          // noinspection JSUnresolvedVariable
                          return (
                            <Fragment key={i}>
                              {shape.boardItemId !== ANSWER_BOX_ID && (
                                <Img
                                  imageProps={shape.props}
                                  imageUrl={shape.content}
                                />
                              )}
                              {shape.boardItemId === ANSWER_BOX_ID && (
                                <Group>
                                  <Rectangle
                                    fill={shape.validAnswer ? CONSTANT.COLORS.GREEN : CONSTANT.COLORS.RED}
                                    stroke={shape.strokeColor}
                                    shapeProps={{ ...shape.props, x: shape.props.x + 40 }}
                                  />
                                  <Text
                                    ref={ref => (answersBoxRef.current[shape.id] = ref)}
                                    text={shape.answerValue ? shape.answerValue : shape.text}
                                    x={shape.props.x - 27}
                                    y={shape.props.y - 45}
                                    fontSize={100}
                                    fill={CONSTANT.COLORS.BLACK}
                                    width={130}
                                    height={130}
                                    padding={2}
                                    onDblClick={onClickAnswerBox(2, shape, shapeGroup)}
                                    align={'center'}/>
                                </Group>
                              )}
                            </Fragment>
                          );
                        })}
                      </Group>
                    );
                  })}
                </Layer>
                {showAnswerBox && (
                  <Layer>
                    <Portal>
                      <input
                        id="txtAnswerBox"
                        type="text"
                        className="form-control mt-2"
                        spellCheck="false"
                        style={answerBoxStyle}
                        value={answerValue}
                        onBlur={onBlurAnswerBox}
                        onChange={onChangeAnswerBox}/>
                    </Portal>
                  </Layer>
                )}
              </Stage>
            </PerfectScrollbar>
          </div>
          <div className="col-3 p-0">
            <PropertiesPanel
              selectedShape={selectedShape}
              onChangeColor={onChangeProperty}
              gridLine={gridLine}
              onChangeGridLine={onChangeShowGridLine}/>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Canvas;
