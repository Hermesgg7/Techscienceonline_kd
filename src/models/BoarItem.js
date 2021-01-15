export default class BoarItem {
  constructor(options) {
    options = options || {};

    this.id = options.id || '';
    this.name = options.name || '';
    this.categoryName = options.categoryName || '';
    this.categoryCode = options.categoryCode || '';
    this.typeName = options.typeName || '';
    this.typeCode = options.typeCode || '';
    this.audioUrl = options.audioUrl || '';
    this.imageUrl = options.imageUrl || '';
    this.elementType = options.elementType || '';
  }
}
