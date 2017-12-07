import React from 'react';

// works
class CountyItem extends React.Component {
	render() {
		return <tr><td>{this.props.county['name']}</td><td>{(this.props.county['pop2010'] / this.props.county['aland_sqmi']).toFixed(2)}</td></tr>
	}
}

export default class County extends React.Component {
	render() {
		//console.log(this.props.county_list);
		return(
			<table>
				<thead>
					<tr><th>County Name</th><th>Pop/SqMi Land</th></tr>
				</thead>
				<tbody>
					{this.props.county_list.map( (county,idx) => { return <CountyItem key={idx} county={county} /> })}
				</tbody>
			</table>
		);
	}
}

