class Clock {
    constructor() {
        // 1. Create a Date object.
        const date = new Date();
        // 2. Store the hours, minutes, and seconds.
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
        // 3. Call printTime.
        this.printTime();
        // 4. Schedule the tick at 1 second intervals.
        setInterval(this._tick.bind(this), 1000);
    }

    printTime() {
        // Format the time in HH:MM:SS
        // Use console.log to print it.
        let time = `${this.hours}:${this.minutes}:${this.seconds}`;
        console.log(time);
    }

    _tick() {
        // 1. Increment the time by one second.
        ++this.seconds;

        if (this.seconds === 60) {
            this.seconds = 0;
            ++this.minutes;
        }
        if (this.minutes === 60) {
            this.minutes === 0;
            ++this.hours;
        }
        if (this.hours === 24) {
            this.hours = 0;
        }
        // 2. Call printTime.
        this.printTime();
    }
}

const clock = new Clock();