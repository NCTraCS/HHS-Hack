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
                <ResultItem panelId={0} display={'gauge'} showResult={this.state.resultPanelStatus[0]}/>
                <ResultItem panelId={1}
                    display='EduChart'
                    type='bar'
                    data={this.state.data[1]}
                    propConstraints={this.state.propVal}
                    showResult={this.state.resultPanelStatus[1]}/>
                <ResultItem panelId={2}
                            display='EmployChart'
                            type='bar'
                            data={this.state.data[2]}
                            propConstraints={this.state.propVal}
                            showResult={this.state.resultPanelStatus[2]}/>
                <ResultItem panelId={3}
                            display='OpDeathChart'
                            type='bar'
                            data={this.state.data[3]}
                            propConstraints={this.state.propVal}
                            showResult={this.state.resultPanelStatus[3]}/>
                <ResultItem panelId={4}
                            display='OpDischChart'
                            type='bar'
                            data={this.state.data[4]}
                            propConstraints={this.state.propVal}
                            showResult={this.state.resultPanelStatus[4]}/>
                <ResultItem panelId={5}
                            display='OpDischChart'
                            type='bar'
                            data={this.state.data[5]}
                            propConstraints={this.state.propVal}
                            showResult={this.state.resultPanelStatus[5]}/>
                <ResultItem panelId={6}
                            display='text'
                            textvalue=''
                            data={this.state.data[1]}
                            propConstraints={this.state.propVal}
                            showResult={this.state.resultPanelStatus[6]}/>
                <ResultItem panelId={7}
                            display='text'
                            textvalue=''
                            type='bar'
                            data={this.state.data[1]}
                            propConstraints={this.state.propVal}
                            showResult={this.state.resultPanelStatus[7]}/>
            </div>
        );
    }
}

