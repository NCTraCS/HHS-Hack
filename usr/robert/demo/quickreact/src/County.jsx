import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import {log} from './GlobalFunctions';
// works
class CountyItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({showCounty: true});
        this.checkDisplay;
    }

    checkDisplay(propId, propVal) {
    	var propMin  = this.props.propDef[propId]['propMin'];
    	var propMax = this.props.propDef[propId]['propMax'];
        log('Here',this.props.propDef[propId]['propMin'], this.props.propDef[propId]['propMin']);
        //log(popSqMile,this.props.propMin,this.props.propDef[propId]['propMin']);
		if (propVal < propMin || propVal > propMax) {
            return false;
        }
        else {
            return true;
        }
	}

	render() {
        var popSqMile = (this.props.county['pop2010'] / this.props.county['aland_sqmi']).toFixed(2);
    	var renderVal = <tr><td>{this.props.county['name']}</td><td>{popSqMile}</td></tr>;
        return this.checkDisplay(0, popSqMile) ? renderVal : null ;
	}
}

export default class County extends React.Component {

    constructor(props) {
        super(props);
		this.state = ({propOpt: []});
    }

	render() {

		return(
			<Table>
				<thead>
					<tr><th>County Name</th><th>Pop/SqMi Land</th></tr>
				</thead>
				<tbody>
					{this.props.county_list.map( (county,idx) => { return <CountyItem key={idx} county={county} propDef={this.props.propDef}/> })}
				</tbody>
			</Table>
		);
	}
}

