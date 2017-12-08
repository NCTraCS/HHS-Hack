import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

/************
		// load employment data
		Request = require('request');
		Request.get('http:\/\/localhost:8080/employment?id_emp_status=unemployed', (error, response, body) => {
		    if(error) {
		        return console.log("WHAT ERROR?");
		    }
		    const chartData = JSON.parse(body);

		    //console.log(chartData);
    		this.setState({ 'employmentChart': chartData });
		});
************/
class EmployChart extends Component {
	constructor(props) {
		super(props);

	}

	render() {

    const data = this.props.ChartData.data;

    if( data ){

        const footerStyle={margin: '40px', width: '100%', textAlign:'center'};
        const headerStyle={textAlign: 'center'};
        return(
			<Panel header={'Overall Risk Score'} style={headerStyle}>
				<VictoryChart  
					domainPadding={{x: 50, y: 50}}
				>
					<VictoryAxis 
					/>
					<VictoryAxis
							dependentAxis
              tickFormat={(y) => (y / 1000 + 'k')} 
					/>
					<VictoryBar
							data={data}
							x="axis_label"
							y="count"
					/>
				</VictoryChart>						
	      	</Panel>
      	);

  		}
		else
			return(<p>loading</p>);
	}
}

export default EmployChart;