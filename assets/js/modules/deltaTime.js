class DeltaTime {
    constructor(timeInterval, callback) {
        this.timeInterval = timeInterval;
        this.lastCheck = null;
        this.timeElapsed = 0
        this.callback = callback;
    }

    start() {
        if(this.lastCheck !== null) {
            let now = Date.now();
            this.timeElapsed += now - this.lastCheck;

            if(this.timeElapsed >= this.timeInterval) {
                this.callback();
                this.timeElapsed = this.timeElapsed % this.timeInterval;
            }
            this.lastCheck = Date.now();
        }
        else this.lastCheck = Date.now();

        window.requestAnimationFrame(() => {
            this.start();
        })
    }
}

const deltaTimeEvent = new Event('deltaTime')

export {DeltaTime, deltaTimeEvent};