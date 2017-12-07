import React, { Component } from 'react';
import {VictoryChart, VictoryScatter, VictoryTheme} from 'victory';

class Three extends Component {
	constructor() {
		super();
	}
	render() {
		return(
			<div>
      			<h1>victory scatter</h1>
      			<VictoryChart
      				height={200}
  					theme={VictoryTheme.material}
  					domain={{ x: [0, 5], y: [0, 7] }}
					>
  					<VictoryScatter
    					style={{ data: { fill: "#aaaaaa" } }}
    					size={5}
    					data={[
      					{ x: 1, y: 2 },
      					{ x: 2, y: 3 },
      					{ x: 3, y: 5, size: 9, fill: "#c43a31" },
      					{ x: 4, y: 4 },
      					{ x: 5, y: 7 }
    					]}
  					/>
					</VictoryChart>
			</div>
      );
	}
}

export default Three;