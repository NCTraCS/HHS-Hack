import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';
import { Grid, Row, Col } from 'react-bootstrap';

/*
const data = [
  {decile: 1, rxrate: .3},
  {decile: 2, rxrate: 2},
  {decile: 3, rxrate: 5, label:"My\nRisk", fill: "red"},
  {decile: 4, rxrate: 9},
  {decile: 5, rxrate: 10},
  {decile: 6, rxrate: 14},
  {decile: 7, rxrate: 19},
  {decile: 8, rxrate: 22},
  {decile: 9, rxrate: 29},
  {decile: 10, rxrate: 37}
];
*/

class Two extends Component {
	constructor(props) {
		super(props);
		this.props.chartCallbacks.getOpRxRateTiles();
	}
	updateData(opRxRateTiles) {
		console.log(opRxRateTiles)
	}
	render() {
		return(
			<div>
      			<h1>Victory Charts Demo</h1>
				<VictoryChart 
					theme={VictoryTheme.material}
					domainPadding={[30,30]}
				>
					<VictoryAxis
							tickValues={[1, 10]}
							tickFormat={["Lower", "Higher"]}
					/>
					<VictoryAxis
							dependentAxis
							tickFormat={(x) => (`${x}/100`)}
					/>
					<VictoryBar
						padding={{top: 3, bottom: 3}}
							data={this.props.chartData.opRxRateTiles}
							x="decile"
							y="rxrate"
					/>
				</VictoryChart>						
	      	</div>
      );
	}
}

export default Two;