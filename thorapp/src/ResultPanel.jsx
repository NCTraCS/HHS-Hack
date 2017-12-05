import React from 'react';
import County from './County';
import {LoadingBar} from './GlobalFunctions';

export default class ResultPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            displayType: 0,
            //stateList: this.props.callbacks.getOptions,
            counties: [],
            name: this.props.name,
            showResults: false,
            currentState: 2,
            data: this.props.data
        });
        console.log(this.state);
        this.getAppState = this.props.callbacks.getAppState;
        this.propConstraints = this.props.callbacks.getPropConstraints;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data });
    }

    render() {
        var loadDisplay = 'Loading';/*(<LoadingBar displayType={this.state.displayType}/>)*/
        var resultDisplay = (
            <County data={this.state.data} propConstraints={this.propConstraints}/>
        );
        return (
            <div>
                {this.getAppState() ? resultDisplay : loadDisplay }
            </div>
        )
    }
}