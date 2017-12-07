import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';
import EduChart from './EduChart';
import EmployChart from './EmployChart';
import OpDeathChart from './OpDeathChart';
import OpDischChart from './OpDischChart';
import OverallScore from './OverallScore';
//import C3Chart from 'react-c3js';
//import 'c3/c3.css';

import {log} from './GlobalFunctions';
// works
export default class ResultItem extends React.Component {
    constructor(props) {
        super(props);
        console.log('Result Item Props: ', this.props);
        this.state = ({showResult: this.props.showResult, showRow: true, propVal: this.props.propConstraints,
            chartData:this.props.data });

        this.checkDisplay;
        this.drawResult = this.drawResult.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.showResult !== nextProps.showResult && nextProps.showResult !== undefined){
            this.setState({showResult: nextProps.showResult});
        }
        if(this.state.propVal !== nextProps.propVal && nextProps.propVal !== undefined){
            this.setState({propVal: nextProps.propVal});
        }
        if(this.state.chartData !== nextProps.data && nextProps.data !== undefined){
            this.setState({chartData: nextProps.data});
            console.log('Update Chart Data:',this.state.chartData);
        }
    }
    checkDisplay() {
        if(!this.checkProperty(0, this.state.popSqMile))
            this.setState({showRow: false});
    }

    checkProperty(propId, propVal) {
        var propMin  = this.state.propVal[propId]['propMin'];
        var propMax = this.state.propVal[propId]['propMax'];
        //log('Here',propMin, propMax);
        console.log('Check Property: ',propVal, '-', propMin,'-',propMax);
        if(propMin !== null && propMax !== null)
        {
            if (propVal < propMin || propVal > propMax) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    getChartData(chartChecks) {
        var rawData = this.props.data;
        var chartData = []
        console.log('Raw Data - getChart: ', rawData);
        for(var i = 0; i<rawData.length; i++){
            var drawRow = true;
            for(var j=0; j<chartChecks.length; j++) {
                console.log('Chart Prop Check:', chartChecks[j].propId,'-',chartChecks[j].propVal,'-',rawData[i][chartChecks[j].propVal]);
                if (!this.checkProperty(chartChecks[j].propId,rawData[i][chartChecks[j].propVal])) {
                    drawRow = false;
                    break;
                }
            }
            if(drawRow) {
                chartData.push(rawData[i]);
            }
        }
        return chartData;
    }

    drawChart(chartType){
        var render = [];
        render.push(<h1>This is C3 JS Chart</h1>);
        console.log(this.state.propVal);
        var y_axis_min = this.state.propVal[0].propMin;
        var y_axis_max = this.state.propVal[0].propMax;
        var y_axis_title = this.state.propVal[0].display;
        var chartData = this.getChartData([{propId : 0 , propVal: 'per_capita_deaths'}]); //this.getChartData('county_id');
        var chartLabels = this.props.data.map((data) => { return data.name; });
        console.log('Chart Data: ', chartData);
        //console.log('Manual Data: ', testData);
        if(chartData.length < 10)
            return  (<div>The Parameters Chosen Were Too Restrictive and Did Not Provide Enough Results</div>);
        else {
            return (<div height={200} width={200}>
                    <VictoryChart height={200}
                                  theme={VictoryTheme.material}
                                  domainPadding={{x: 30, y: 20}}
                    >
                        <VictoryAxis
                            tickFormat={chartLabels}
                        />
                        <VictoryAxis
                            dependentAxis
                        />
                        <VictoryBar
                            //padding={{top: 3, bottom: 3}}
                            data={chartData}
                            labelComponent={<VictoryTooltip/>}
                            labels={(d) => d.name}
                            //TESTdata={data}
                            x="name"
                            y="popSqMile"
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onMouseOver: () => {
                                        return [
                                            {
                                                target: "data",
                                                mutation: () => ({style: {fill: "red"}})
                                            }, {
                                                target: "labels",
                                                mutation: () => ({active: true})
                                            }
                                        ];
                                    },
                                    onMouseOut: () => {
                                        return [
                                            {
                                                target: "data",
                                                mutation: () => {
                                                }
                                            }, {
                                                target: "labels",
                                                mutation: () => ({active: false})
                                            }
                                        ];
                                    }
                                }
                            }]}
                        />
                    </VictoryChart></div>
            );
        }
    }
    getGauge () {
        return <OverallScore score={37} />
    }
    drawResult() {
        var resultType = this.props.display;
        console.log('Result Type: ', resultType);
        if(resultType === 'EduChart') {
            console.log(this.props.data);
            console.log('ChartData: ',this.state.chartData);
            return <EduChart ChartData={this.props.data} />;
        }
        else if(resultType === 'EmployChart') {
            return <EmployChart ChartData={this.props.data} />;
        }
        else if (resultType === 'OpDeathChart') {
            return <OpDeathChart ChartData={this.props.data} />;
        }
        else if (resultType ==='OpDischChart') {
            return <OpDischChart ChartData={this.props.data} />;
        }
        else if (resultType ==='gauge') {
            return this.getGauge();
        }
        else if (resultType ==='Text') {
            return "This is the Default - What's my Risk?";
        }
    }
    render() {
        //console.log('Item Render PropVal: ', this.state.propVal);
        return (<div>{this.state.showResult ? this.drawResult() : null}</div>);
        /*return <tr><td>{renderCnty}</td><td>{popSqMile}</td><td>{rx_rate}</td></tr>*/
    }
}