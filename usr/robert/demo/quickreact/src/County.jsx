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

    checkDisplay(popSqMile) {
        console.log('Here',this.props.propMin,this.props.propMax);
        console.log(popSqMile,this.props.propMin,this.props.propMax);
		if (popSqMile < this.props.propMin || popSqMile > this.props.propMax) {
            return false;
        }
        else {
            return true;
        }
	}

	render() {
        var popSqMile = (this.props.county['pop2010'] / this.props.county['aland_sqmi']).toFixed(2);
    	var renderVal = <tr><td>{this.props.county['name']}</td><td>{popSqMile}</td></tr>;
        return this.checkDisplay(popSqMile) ? renderVal : null ;
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
					{this.props.county_list.map( (county,idx) => { return <CountyItem key={idx} county={county} propMin={this.props.propMin} propMax={this.props.propMax}/> })}
				</tbody>
			</Table>
		);
	}
}

