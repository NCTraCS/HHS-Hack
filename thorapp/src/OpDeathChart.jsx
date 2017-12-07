import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';
import { Grid, Row, Col } from 'react-bootstrap';

/************
// load op death data
		Request = require('request');
		Request.get('http:\/\/localhost:8080/death_per_cap?id_county=erie', (error, response, body) => {
		    if(error) {
		        return console.log("WHAT ERROR?");
		    }
		    const chartData = JSON.parse(body);

		    //console.log(chartData);
    		this.setState({ 'opDeathChart': chartData });
		});
************/
class OpDeathChart extends Component {
	constructor(props) {
		super(props);

	}

	render() {

    const data = this.props.ChartData.data;

    if( data ){

		return(
			<div>
      			<h1>Risk by Opioid Related Hospital Discharges</h1>
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
							y="per_capita_deaths"
					/>
				</VictoryChart>						
	      	</div>
      	);

  		}
		else
			return(<p>loading</p>);
	}
}

export default OpDeathChart;