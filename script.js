function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
    }
    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.print(this.times);
    }
    getTime(){
        return this.format(this.times);
    }
    getRecord() {
        let newRecord = document.createElement('li');
        newRecord.innerText = this.getTime();
        return newRecord;
    }
    print() {
        this.display.innerText = this.format(this.times);
    }
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    step() {
        if (!this.running) return;
        this.calculate();
        this.getTime();
        this.print();
    }
    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }
    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

}
const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());
let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());
let saveButton = document.getElementById('save');
let tableResult = document.getElementById('results')
saveButton.addEventListener('click', () =>tableResult.insertBefore(stopwatch.getRecord(), tableResult.firstChild));
let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () =>
    {
        tableResult.innerHTML='';
    });
