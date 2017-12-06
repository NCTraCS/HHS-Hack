import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import {log} from './GlobalFunctions';
// works
class CountyItem extends React.Component {
    constructor(props) {
        super(props);
        //console.log(this.props.propConstraints);
        this.state = ({showResults: true, showRow: true, popSqMile : (this.props.county['pop2010'] / this.props.county['aland_sqmi']).toFixed(2)
        	, propVal: this.props.propConstraints});
        this.checkDisplay;
        //this.propConstraints = this.props.propConstraints();
        //console.log('Data:', this.props.data);
    }
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

	drawRow(renderCnty, popSqMile, rx_rate){
        var render = []
		//console.log('DrawRow PropVa:', this.state.propVal);
        if(this.checkProperty(0,popSqMile)){
        	render.push(<td key='cnty'>{renderCnty}</td>);
        	render.push(<td key='pop'>{popSqMile}</td>);
        	if(this.state.propVal[1]['propValue']==='1') {
                render.push(<td key='rx'>{rx_rate}</td>);
            }
        }
        return render;
    }

	render() {
		//console.log('Item Render PropVal: ', this.state.propVal);
		var popSqMile = this.state.popSqMile;
		var rx_rate = this.props.county['rx_rate'];
		var renderCnty = this.props.county['name'];
		return (this.state.showRow ? <tr>{this.drawRow(renderCnty,popSqMile,rx_rate)}</tr> : null);
		/*return <tr><td>{renderCnty}</td><td>{popSqMile}</td><td>{rx_rate}</td></tr>*/
	}
}

export default class County extends React.Component {

    constructor(props) {
        super(props);

		this.state = ({ propOpt: [], data: {} , propVal: this.props.propConstraints});
		//this.propConstraints = this.props.propConstraints;
		//this.propDef = this.propConstraints();
		//console.log('Prop Val County:', this.props.propConstraints);
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
		return(
			<Table>
				<thead>
					<tr>{this.getHeader()}</tr>
				</thead>
				<tbody>
					{this.props.data.map( (county,idx) => { return <CountyItem key={idx} county={county} propConstraints={this.state.propVal}/> })}
				</tbody>
			</Table>
		);
	}
}

