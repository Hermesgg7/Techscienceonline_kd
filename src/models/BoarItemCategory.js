export default class BoarItemCategory {
    constructor(options) {
        options = options || {};

        this.id = options.id || '';
        this.name = options.name || '';
        this.code = options.code || '';
        this.items = options.items || [];

        // extra property
        this.expand = options.expand || false;
    }
}
