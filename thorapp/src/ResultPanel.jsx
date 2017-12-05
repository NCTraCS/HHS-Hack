import React from 'react';
import County from './County';
import {LoadingBar} from './GlobalFunctions';

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            displayType: this.props.propConstraints['displayType'],
            stateList: this.props.propConstraints['stateList'],
            counties: this.props.propConstraints['counties'],
            name: this.props.name,
            showCounties: this.props.propConstraints['showCounties'],
            currentState: this.props.propConstraints['currentState'],
            propVal : this.props.propConstraints['propVal']
        });
    }

    render() {
        var loadDisplay = 'Loading';/*(<LoadingBar displayType={this.state.displayType}/>)*/;
        var resultDisplay = (
            <County county_list={this.state.counties} propDef={this.state.propVal}/>
        );
        return (
            <div>
            { this.state.showCounties ? resultDisplay : loadDisplay }
            </div>
        )
    }
}