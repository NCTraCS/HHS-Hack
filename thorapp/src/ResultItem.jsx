import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';
//import C3Chart from 'react-c3js';
//import 'c3/c3.css';

import {log} from './GlobalFunctions';
// works
export default class ResultItem extends React.Component {
    constructor(props) {
        super(props);
        console.log('Result Item Props: ', this.props);
        this.state = ({showResult: this.props.showResult, showRow: true, propVal: this.props.propConstraints});
        this.checkDisplay;
        this.drawResult = this.drawResult.bind(this);
        //this.drawTable  = this.drawTable.bind(this);
        //this.propConstraints = this.props.propConstraints();
        //console.log('Data:', this.props.data);
        //this.calcValues();
    }
    /*calcValues() {
        if(this.props.rowData !== undefined) {
            this.setState({popSqMile: (this.props.rowData['pop2010'] / this.props.rowData['aland_sqmi']).toFixed(2)});
        }
    }*/
    componentWillReceiveProps(nextProps) {
        if(this.state.showResult !== nextProps.showResult && nextProps.showResult !== undefined){
            this.setState({showResult: nextProps.showResult});
        }
        if(this.state.propVal !== nextProps.propVal && nextProps.propVal !== undefined){
            this.setState({propVal: nextProps.propVal});
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
    /*drawTable() {
        var renderTable = [];
        console.log('drawTable Data: ', this.props.data);
        var renderRows = this.props.data.map((row,idx) => {return this.drawRow(row,idx)});
        console.log('renderRows: ', renderRows);
    }*/
    /*drawRow(){
        var renderTD = [];
        var renderTR = [];
        var popSqMile = this.state.popSqMile;
        var rx_rate = this.props.rowData['rx_rate'];
        var renderCnty = this.props.rowData['name'];
        //console.log('DrawRow PropVa:', this.state.propVal);
        if(this.checkProperty(0,popSqMile)){
            renderTD.push(<td key='cnty'>{renderCnty}</td>);
            renderTD.push(<td key='pop'>{popSqMile}</td>);
            if(this.state.propVal[1]['propValue']==='1') {
                renderTD.push(<td key='rx'>{rx_rate}</td>);
            }
        }
        renderTR.push(<tr>{renderTD}</tr>);
        return renderTR;
    }*/
    drawChart(chartType){
        var render = [];
        render.push(<h1>This is C3 JS Chart</h1>);
        console.log(this.state.propVal);
        var y_axis_min = this.state.propVal[0].propMin;
        var y_axis_max = this.state.propVal[0].propMax;
        var y_axis_title = this.state.propVal[0].display;
        var chartData = this.getChartData([{propId : 0 , propVal: 'popSqMile'}]); //this.getChartData('county_id');
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
        return <marshallgauge/>
    }
    drawResult() {
        var resultType = this.props.display;
        if(resultType === 'chart') {
            return this.drawChart();
        }
        else if(resultType === 'table') {
            return this.drawTable();
        }
        else if (resultType === 'scatter') {
            return 'Not Available';
        }
        else if (resultType ==='gauge') {
            return this.getGauge();
        }
        else if (resultType ==='Text') {
            return "This is the Default - What's my Risk?";
        }
        else {
            return 'No Result Type Like That!';
        }
    }
    render() {
        //console.log('Item Render PropVal: ', this.state.propVal);
        return (<div>{this.state.showResult ? this.drawResult() : null}</div>);
        /*return <tr><td>{renderCnty}</td><td>{popSqMile}</td><td>{rx_rate}</td></tr>*/
    }
}