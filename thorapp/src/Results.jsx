import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';
//import C3Chart from 'react-c3js';
//import 'c3/c3.css';

import {log} from './GlobalFunctions';
// works
class ResultItem extends React.Component {
    constructor(props) {
        super(props);
        console.log('Result Item Props: ', this.props);
        this.state = ({showResults: true, showRow: true, propVal: this.props.propConstraints});
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

    checkDisplay() {
        if(!this.checkProperty(0, this.state.popSqMile))
            this.setState({showRow: false});
    }

    checkProperty(propId, propVal) {
        //console.log(this.props);
        var propMin  = this.state.propVal[propId]['selectMin'];
        var propMax = this.state.propVal[propId]['selectMax'];
        //log('Here',propMin, propMax);
        //log(popSqMile,this.props.propMin,this.props.propDef[propId]['propMin']);
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
        for(var i = 0; i<rawData.length; i++){
            var drawRow = true;
            for(var j=0; j<chartChecks.length; j++) {
                if (!this.checkProperty(chartChecks[j].propId,chartChecks[j].propVal)) {
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
                    y="popSqMil"
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
                                        mutation: () => ({ active: true })
                                    }
                                ];
                            },
                            onMouseOut: () => {
                                return [
                                    {
                                        target: "data",
                                        mutation: () => {}
                                    }, {
                                        target: "labels",
                                        mutation: () => ({ active: false })
                                    }
                                ];
                            }
                        }
                    }]}
                />
            </VictoryChart></div>
            );
           //return render;
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
        else {
            return 'No Result Type Like That!';
        }
    }
    render() {
        //console.log('Item Render PropVal: ', this.state.propVal);
        return (this.drawResult());
        /*return <tr><td>{renderCnty}</td><td>{popSqMile}</td><td>{rx_rate}</td></tr>*/
    }
}

export default class Result extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({ propOpt: [], data: this.props.data , propVal: this.props.propConstraints});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: nextProps.data });
    }

    getHeader() {
        var header = [];
        //console.log('PropDef:', this.state.propVal);
        header.push(<th key={0}>County Name</th>);
        header.push(<th key={1}>Pop/SqMi Land</th>);
        if(this.state.propVal[1]['propValue']==='1') {
            header.push(<th key={3}>Rx Rate</th>);
        }
        return header;
    }
    render() {
        console.log('Props Data in Results Render: ', this.state.data);
        return(
            <div>
                {/*<ResultItem display='table' propConstraints={this.state.propVal}/>*/}
                {/*<Table>
                    <thead>
                    <tr>{this.getHeader()}</tr>
                    </thead>
                    <tbody>
                    {this.props.data.map( (county,idx) => { return <ResultItem display='row' key={idx} rowData={county} propConstraints={this.state.propVal}/> })}
                    </tbody>
                </Table>*/}
                <ResultItem display='chart' type='bar' data={this.state.data} propConstraints={this.state.propVal}/>
            </div>
        );
    }
}

