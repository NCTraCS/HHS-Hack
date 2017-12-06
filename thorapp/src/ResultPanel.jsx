import React from 'react';
import County from './County';
import {LoadingBar} from './GlobalFunctions';

export default class ResultPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            displayType: 0,
            dataCallId: this.props.dataCallId,
            counties: [],
            name: this.props.name,
            showResults: false,
            currentState: 2,
            propVal: this.props.propConstraints,
            data: this.props.data
        });
        console.log('Result Panel:', this.state.propVal);
        this.getAppState = this.props.callbacks.getAppState;
        //this.propConstraints = this.props.callbacks.getPropConstraints;
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.dataCallId !== nextProps.dataCallId && nextProps.dataCallId !== undefined){
            this.setState({ dataCallId: nextProps.dataCallId});
        }
        if(this.state.data !== nextProps.data && nextProps.data !== undefined){
            this.setState({ data: nextProps.data});
        }
        if(this.state.propVal !== nextProps.propVal && nextProps.propVal !== undefined){
            this.setState({ propVal: nextProps.propVal});
        }
    }

    render() {
        var loadDisplay = 'Loading';/*(<LoadingBar displayType={this.state.displayType}/>)*/
        console.log('Result Panel render Prop Val: ',this.state.propVal);
        var resultDisplay = (
            <County data={this.state.data} propConstraints={this.state.propVal}/>
        );
        return (
            <div>
                {this.getAppState() ? resultDisplay : loadDisplay }
            </div>
        )
    }
}