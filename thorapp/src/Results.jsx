import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';
import ResultItem from './ResultItem';
//import C3Chart from 'react-c3js';
//import 'c3/c3.css';

export default class Result extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({ propOpt: [],
            data: this.props.data ,
            propVal: this.props.propConstraints,
            resultPanelStatus: this.props.resultPanelStatus});
        console.log('Result Construct resultStatus: ', this.props.resultPanelStatus);
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.data !== nextProps.data && nextProps.data !== undefined){
            this.setState({ data: nextProps.data});
        }
        if(this.state.resultPanelStatus !== nextProps.resultPanelStatus && nextProps.resultPanelStatus !== undefined){
            this.setState({ resultPanelStatus: nextProps.resultPanelStatus});
        }
    }

    render() {
        console.log('Props Data in Results Render: ', this.state.data);
        console.log('showResults: ', this.state.resultPanelStatus);
        return(
            <div>
                {/*<ResultItem panelId={0} display={'text'} showResult={this.state.resultPanelStatus[0]}/>*/}
                <ResultItem panelId={0} display={'gauge'} showResult={this.state.resultPanelStatus[0]}/>
                <ResultItem panelId={1}
                    display='chart'
                    type='bar'
                    data={this.state.data[1]}
                    propConstraints={this.state.propVal}
                    showResult={this.state.resultPanelStatus[1]}/>
            </div>
        );
    }
}

