import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {log} from './GlobalFunctions';

const Range = Slider.Range;

export default class DynamicRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.propName,
            selectMin:100,
            selectMax:0,
            min: 0,
            max: 100,
            marks:{0:'0',100:'100'}
        };
    }
    onSliderChange = (value) => {
        this.setState({selectMin: value[0]});
        this.setState({selectMax: value[1]});
        this.props.propHandler(value[0],value[1]);
        console.log(value[0],value[1]);
    }
    onMinChange = (e) => {
        this.setState({
            min: +e.target.value || 0,
        });
    }
    onMaxChange = (e) => {
        this.setState({
            max: +e.target.value || 100,
        });
    }
    render() {
        return (
            <div>
                <Range defaultValue={[this.state.min, this.state.max]}
                       min={this.state.min}
                       max={this.state.max}
                       marks={this.state.marks}
                       onChange={this.onSliderChange}
                />
            </div>
        );
    }
}