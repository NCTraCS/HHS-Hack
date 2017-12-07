import React, { Component } from 'react';
import { Panel,Well } from 'react-bootstrap';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

class OverallScore extends Component {
	render() {
		// get from props
		let scores={};
		if( !this.props.allScores ) {

			scores = {
				education: 1.0,
				employment: 2.0,
				death_per_cap: 1.5,
				op_disch_per_cap: 1.0,
				co_dx: 1.0,
				ort: 4.0
			};
		}
		else {
			scores = this.props.allScores;
		}

		const totalScore = 
			scores['education'] + 
			scores['employment'] +
			scores['death_per_cap'] +
			scores['op_disch_per_cap'] +
			scores['co_dx'] +
			scores['ort'];

		const maxScore = 10.5;

		return(
			<div>
      		<h1>Overall Risk Score</h1>
	        <C3Chart 
	          data={{json: {data: totalScore}, type: 'gauge'}}
	          gauge={{min: 0, max: maxScore, label: {format: (value, ratio) => { return(value) } } , units: 'risk score',width:40}}
	          color={{
	              //pattern: ['#60B044','#F6C600', '#F97600','#FF0000', ],
	              pattern: ['#4933FF','#8633FF', '#B533FF','#FF33F0', ],
	              threshold: {values: [2.5,5,7.5,9]}
	            }}
	        />
	        <Panel>
	        	<p>Overall score is based on user input. Change parameters above to change the score.</p>

	        </Panel>
	        </div>

      );
	}
}

export default OverallScore;