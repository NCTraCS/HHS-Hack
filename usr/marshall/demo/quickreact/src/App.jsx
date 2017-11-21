import React from 'react';
import './App.css';
import County from './County';

class App extends React.Component {

	constructor(props) {
		super(props);
		console.log(props);

		// NEED TO INITIALIZE STATE
		this.state = ({ counties: [], name: this.props.name });

		this.loadData();
	}

	loadData() {

		var Request = require('request');
		Request.get('http://localhost:5000/gaz/37', (error, response, body) => {
		    if(error) {
		        return console.log("WHAT ERROR?");
		    }
    		this.setState({ counties: JSON.parse(body) });
		});
	}

	getCounties() {

		const counties = [
			{name: 'Alamance'},
			{name: 'Bertie'},
			{name: 'Chatham'}
		];
		return counties
	}

	render() {
	    return (
	      <div className="App">
	      	<h1>County Demo ({this.state.name})</h1>
	      	<County county_list={this.state.counties} />
	      </div>
	    );
	  }
}

export default App;
