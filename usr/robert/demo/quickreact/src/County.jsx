import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import {log} from './GlobalFunctions';
// works
class CountyItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({showCounty: true, showRow: true, popSqMile : (this.props.county['pop2010'] / this.props.county['aland_sqmi']).toFixed(2)});
        this.checkDisplay;
    }
	checkDisplay() {
        if(!this.checkProperty(0, this.state.popSqMile))
            this.setState({showRow: false});
    }
    checkProperty(propId, propVal) {
    	var propMin  = this.props.propDef[propId]['selectMin'];
    	var propMax = this.props.propDef[propId]['selectMax'];
        log('Here',propMin, propMax);
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
		console.log('Prop Def Here:', this.props.propDef);
		render.push(<td key='cnty'>{renderCnty}</td>);
        render.push(<td key='pop'>{popSqMile}</td>);
        if(this.props.propDef[1]['propValue']==='1') {
        	render.push(<td key='rx'>{rx_rate}</td>);
        }
        return render;
    }

	render() {
		console.log(this.props.propDef);
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
		this.state = ({propOpt: []});
    }

    getHeader() {
    	var header = [];
        console.log('PropDef:', this.props.propDef[1].propValue);
    	header.push(<th key={0}>County Name</th>);
    	header.push(<th key={1}>Pop/SqMi Land</th>);
    	if(this.props.propDef[1]['propValue']==='1') {
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
					{this.props.county_list.map( (county,idx) => { return <CountyItem key={idx} county={county} propDef={this.props.propDef}/> })}
				</tbody>
			</Table>
		);
	}
}

