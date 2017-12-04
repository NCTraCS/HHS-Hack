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
		this.state = {
			currentPanel: 0,
			currentHome: 1
		}
		this.togglePanel = this.togglePanel.bind(this);
	}
	togglePanel(panelNum) {
		this.setState( {currentPanel: panelNum} );
	}
	render() {
		let page = <NavHome togglePanel={this.togglePanel} currentPanel={this.state.currentPanel}/>
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
