import React, { Component } from 'react';
import { Panel,Well } from 'react-bootstrap';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

class OverallScore extends Component {
	render() {
		return(
			<div>
      		<h1>Overall Risk Score</h1>
	        <C3Chart 
	          data={{json: {data: this.props.score}, type: 'gauge'}}
	          gauge={{label: {format: (value, ratio) => { return(Math.round(value));}},units: 'risk socore',width:40}}
	          color={{
	              //pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'],
	              pattern: ['#60B044','#F6C600', '#F97600','#FF0000', ],
	              threshold: {values: [30,60,90,100]}
	            }}
	        />
	        <Panel>
	        	<p>Overall score is based on user input... see breakdown to the left...</p>
	        	<p>Disclaimer here</p>

	        </Panel>
	        </div>

      );
	}
}

export default OverallScore;