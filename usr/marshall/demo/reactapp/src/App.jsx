import React, { Component } from 'react';
import './App.css';
import Home from './Home'
import NavHome from './NavHome'
import One from './One'
import Two from './Two'
import Three from './Three'

class App extends Component {

	constructor() {
		super();
		this.flaskHost = 'localhost:5000';
		this.state = {
			currentPanel: 2,
			//currentHome: 1,
			chartData: {
				opRxRateTiles: []
			}
		}
		this.togglePanel = this.togglePanel.bind(this);

		this.opcb =this.getOpRxRateTiles.bind(this);
		this.chartCallbacks = {
			getOpRxRateTiles: this.getOpRxRateTiles.bind(this)
		}

	}
	togglePanel(panelNum) {
		this.setState( {currentPanel: panelNum} );
	}
	getOpRxRateTiles(stCouId){
		// test data
		const data = [
		  {decile: 1, rxrate: .3},
		  {decile: 2, rxrate: 2},
		  {decile: 3, rxrate: 5, label:"My\nRisk", fill: "red"},
		  {decile: 4, rxrate: 9},
		  {decile: 5, rxrate: 10},
		  {decile: 6, rxrate: 14},
		  {decile: 7, rxrate: 19},
		  {decile: 8, rxrate: 22},
		  {decile: 9, rxrate: 29},
		  {decile: 10, rxrate: 37}
		];
		/*
		var Request = require('request');
		Request.get('http:\/\/' + this.flaskHost + '/op_rx_rate_decile', (error, response, body) => {
		    if(error) {
		        return console.log("WHAT ERROR?");
		    }
    		//this.setState({ counties: JSON.parse(body) });
			this.setState( {opRxRateTiles: []})
		});
		*/
		this.setState( {chartData: {opRxRateTiles: data} })
	}
	render() {
		let page = <NavHome togglePanel={this.togglePanel} currentPanel={this.state.currentPanel} chartData={this.state.chartData} chartCallbacks={this.chartCallbacks}/>
		if( this.state.currentPanel === 0 ) {
			page = <Home setPage={this.togglePanel}/>;
		}

		return(
      		<div className="App">
      		{page}
      		</div>
      );
	}
}

export default App;
