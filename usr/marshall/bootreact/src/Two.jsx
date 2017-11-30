import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';

import { Grid, Row, Col } from 'react-bootstrap';

const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

class Two extends Component {
	constructor() {
		super();

		this.chartdat = [
		{quarter: 1, earnings: 13000},
		{quarter: 2, earnings: 16500},
		{quarter: 3, earnings: 14250},
		{quarter: 4, earnings: 19000}
		];
	}
	render() {
		return(
			<div>
      			<h1>Victory Charts Demo</h1>
				<Grid>
					<Row className="show-grid">
						<Col xs={4}>
							controls here
						</Col>
						<Col xs={8}>
						<VictoryChart 
							theme={VictoryTheme.material}
							domainPadding={20}
						>
							<VictoryAxis
  								tickValues={[1, 2, 3, 4]}
  								tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
							/>
							<VictoryAxis
	  							dependentAxis
	  							tickFormat={(x) => (`$${x / 1000}k`)}
							/>
							<VictoryBar
  								data={data}
  								x="quarter"
  								y="earnings"
							/>
						</VictoryChart>						

	      				</Col>
	      			</Row>
	      		</Grid>
	      	</div>
      );
	}
}

export default Two;