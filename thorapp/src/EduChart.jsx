import React, { Component } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

/************

    var Request = require('request');
    Request.get('http:\/\/localhost:8080/education?id_ed_level=13_to_15', (error, response, body) => {
        if(error) {
            return console.log("WHAT ERROR?");
        }
        const chartData = JSON.parse(body);

        //console.log(chartData);
        this.setState({ 'educationChart': chartData });
    });

************/
class EduChart extends Component {
	constructor(props) {
		super(props);

	}

	render() {

    const data = this.props.ChartData.data;

    if( data ){
``
        const footerStyle={margin: '40px', width: '100%', textAlign:'center'};
        const headerStyle={textAlign: 'center'};
        return(
			<Panel header={'Risk by Level of Education'} style={headerStyle}>
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

export default EduChart;