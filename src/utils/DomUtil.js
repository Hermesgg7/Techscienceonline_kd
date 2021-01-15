function isMounted(node) {
  if (node === document) {
    return true;
  }
  return node instanceof Node && document.documentElement.contains(node.parentNode);
}

const rectStub = { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };

export function getRect(node) {
  if (node instanceof Range || isMounted(node)) {
    const { top, right, bottom, left, width, height } = node.getBoundingClientRect();
    return { top, right, bottom, left, width, height };
  } else {
    return Object.assign({}, rectStub);
  }
}

export const getElementHeight = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    const style = getComputedStyle(element);

    return style.height.replace('px', '');
  } else {
    return 0;
  }
};

export const getElementWidth = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    const style = getComputedStyle(element);

    return style.width.replace('px', '');
  } else {
    return 0;
  }
};

export const getElementMarginTop = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    const style = getComputedStyle(element);

    return style.marginTop.replace('px', '');
  } else {
    return 0;
  }
};

export const getElementMarginBottom = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    const style = getComputedStyle(element);

    return style.marginBottom.replace('px', '');
  } else {
    return 0;
  }
};
