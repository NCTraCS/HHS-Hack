import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {log} from './GlobalFunctions';

const Range = Slider.Range;

export default class DynamicRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.propID,
            selectMin:this.props.propMax,
            selectMax:this.props.propMax,
            min: this.props.propMin,
            max: this.props.propMax,
            marks:{0:'0',100:'100'}
        };
    }
    onSliderChange = (value) => {
        this.setState({selectMin: value[0]});
        this.setState({selectMax: value[1]});
        var returnObj = {name: this.state.name , propMin: this.state.selectMin, propMax: this.state.selectMax};
        this.props.propHandler(this.props.propID, returnObj);
        console.log(value[0],value[1]);
    }
    // Following will allow for dynamic setting of the Min and Max values
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