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
				employment: 1.4,
				death_per_cap: 1.0,
				op_disch_per_cap: 1.0,
				co_dx: 1.0,
				ort: 2.1
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
		const footerStyle={margin: '40px', width: '100%', textAlign:'center'};
		const headerStyle={textAlign: 'center'};
		return(
			<Panel header={'Overall Risk Score'} style={headerStyle}>
				<C3Chart
				  data={{json: {data: totalScore}, type: 'gauge'}}
				  gauge={{min: 0, max: maxScore, label: {format: (value, ratio) => { return(value) } } , units: 'risk score',width:40}}
				  color={{
					  //pattern: ['#60B044','#F6C600', '#F97600','#FF0000', ],
					  pattern: ['#4933FF','#8633FF', '#B533FF','#FF33F0', ],
					  threshold: {values: [2,5,7,9]}
					}}
				/>
				<div style={footerStyle}>Overall score is based on user input. Change parameters above to change the score.</div>
	        </Panel>
      );
	}
}

export default OverallScore;