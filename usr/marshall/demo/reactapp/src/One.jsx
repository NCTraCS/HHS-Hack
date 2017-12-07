import React, { Component } from 'react';
import C3Chart from 'react-c3js';
import 'c3/c3.css';

class One extends Component {
	render() {
		return(
			<div>
      		<h1>This is C3 JS Chart</h1>
	        <C3Chart 
	          data={{json: {data: Math.random(1)*100.0}, type: 'gauge'}}
	          gauge={{label: {format: (value, ratio) => { return(Math.round(value));}},units: 'risk socore',width:40}}
	          color={{
	              //pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'],
	              pattern: ['#60B044','#F6C600', '#F97600','#FF0000', ],
	              threshold: {values: [30,60,90,100]}
	            }}
	        />
	        </div>

      );
	}
}

export default One;