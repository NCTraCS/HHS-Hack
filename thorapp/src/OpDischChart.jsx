import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';
import { Grid, Row, Col } from 'react-bootstrap';

/************
		// load op disch data
		Request = require('request');
		Request.get('http:\/\/localhost:8080/op_disch_per_cap?id_county=erie', (error, response, body) => {
		    if(error) {
		        return console.log("WHAT ERROR?");
		    }
		    const chartData = JSON.parse(body);

		    //console.log(chartData);
    		this.setState({ 'opDischChart': chartData });
		});
************/
class OpDischChart extends Component {
	constructor(props) {
		super(props);

	}

	render() {

    const data = this.props.ChartData.data;

    if( data ){

		return(
			<div>
      			<h1>Risk by Opioid Discharge Level</h1>
				<VictoryChart  
				>
					<VictoryAxis 
						fixLabelOverlap={true}
					/>
					<VictoryAxis
							dependentAxis
              tickFormat={(y) => (y*1000)} 
					/>
					<VictoryBar
							data={data}
							x="county_name"
							y="per_capita_op_disch"
					/>
				</VictoryChart>						
	      	</div>
      	);

  		}
		else
			return(<p>loading</p>);
	}
}

export default OpDischChart;