class deltaTime {
    constructor(timeInterval, callback) {
        this.timeInterval = timeInterval;
        this.lastCheck = null;
        this.timeElapsed = 0
        this.callback = callback;
    }

    start() {
        if(this.lastCheck !== null) {
            let now = new Date().now();
            this.timeElapsed += now - this.lastCheck;

            if(this.timeElapsed >= this.timeInterval) {
                this.callback();
                this.timeElapsed = this.timeElapsed % this.timeInterval;
            }
            this.lastCheck = new Date().now();
        }
        else this.lastCheck = new Date().now();

        window.requestAnimationFrame(() => {
            this.start();
        })
    }
}

export {deltaTime};