export default class FontScaler {
    constructor(options = {}) {
        const {
            minWidth = 320,
            maxWidth = 1400,
            minScale = 1,
            maxScale = 1.3
        } = options;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.minScale = minScale;
        this.maxScale = maxScale;
        this.handleResize = this.handleResize.bind(this);
    }

    init() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    destroy() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        const width = Math.min(Math.max(window.innerWidth, this.minWidth), this.maxWidth);
        const progress = (width - this.minWidth) / (this.maxWidth - this.minWidth);
        const scale = this.minScale + progress * (this.maxScale - this.minScale);
        document.documentElement.style.setProperty('--font-scale', scale.toFixed(2));
    }
}
