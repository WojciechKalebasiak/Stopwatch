function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
class Records extends React.Component {
    static propTypes = {
        recordsArray: React.PropTypes.array.isRequired,
    }
    render() {
        if (this.props.recordsArray) {
            var records = this.props.recordsArray.map((value) => {
                return <li>{value}</li>;
            });
            return (<ul id="results">{records}</ul>
            );
        }

    }
}
class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                seconds: 0,
                minutes: 0,
                miliseconds: 0,
            },
            results: []
        };
    }
    reset = () => {
        this.setState({ times: { minutes: 0, seconds: 0, miliseconds: 0 } });
    }
    saveRecord = () => {
        const newRecord = this.format();
        this.setState((prevState) => {
        const others = prevState.results;
        return({results:[newRecord, ...others]});
        });
    }
    clear = () => {
        this.setState({ results: [] });
    }
    print = () => {
        return this.format();
    }
    format = () => {
        return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(this.state.times.miliseconds)}`;
    }
    start = () => {
        if (!this.state.running) {
            this.setState({ running: true });
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    step = () => {
        if (!this.state.running) return;
        this.calculate();
        this.print();
    }
    calculate = () => {
        this.setState((prevState) => {
            return {
                times: {
                    miliseconds: prevState.times.miliseconds + 1,
                    seconds: prevState.times.seconds,
                    minutes: prevState.times.minutes
                }
            }
        });
        if (this.state.times.miliseconds >= 100) {
            this.setState((prevState) => {
                return {
                    times: {
                        miliseconds: 0,
                        seconds: prevState.times.seconds + 1,
                        minutes: prevState.times.minutes
                    }
                }
            });
        }
        if (this.state.times.seconds >= 60) {
            this.setState((prevState) => {
                return {
                    times: {
                        seconds: 0,
                        minutes: prevState.times.minutes + 1,
                        miliseconds: 0
                    }
                }
            });

        }
    }
    stop = () => {
        this.setState({ running: false });
        clearInterval(this.watch);
    }
    render() {
        return (
            <div className="app">
                <nav className="controls">
                    <a href="#" className="button" id="start" onClick={this.start}>Start</a>
                    <a href="#" className="button" id="stop" onClick={this.stop}>Stop</a>
                    <a href="#" className="button" id="reset" onClick={this.reset}>Reset</a>
                    <a href="#" className="button" id="save" onClick={this.saveRecord}>Save</a>
                </nav>
                <div className="stopwatch">{this.format()}</div>
                <h3>Results</h3>
                <button id="clear" onClick={this.clear}>Clear</button>
                <Records recordsArray={this.state.results} />
            </div>
        );
    }

}
let stopwatch = <Stopwatch />
ReactDOM.render(stopwatch, document.getElementById('app'));
