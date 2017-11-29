import React, { Component } from 'react';
import './App.css';
import One from './One'
import Two from './Two'
import Three from './Three'
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';

class TopHead extends Component {
	constructor() {
		super();
		this.state = {
			activeKey: 1
		};
		this.menuSelect = this.menuSelect.bind(this);
	}
	menuSelect(selectedKey) {
		this.setState( {activeKey: selectedKey} );
		this.props.togglePanel(selectedKey);
	}
	render() {
		return(
			<Navbar fixedTop inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<a href='#'>TraCS App</a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
		        <Nav activeKey={this.state.activeKey} onSelect={this.menuSelect}>
		        	<NavItem eventKey={1} href="/">One</NavItem>
		        	<NavItem eventKey={2} href="/">Two</NavItem>
		        	<NavItem eventKey={3} href="/">Three</NavItem>
		        </Nav>
		        </Navbar.Collapse>
			</Navbar>
		);
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			currentPanel: 1
		}
		this.togglePanel = this.togglePanel.bind(this);
	}
	togglePanel(panelNum) {
		this.setState( {currentPanel: panelNum} );
	}
	render() {
		let panel = <One />;
		if( this.state.currentPanel === 1 ) {
			panel = <One /> ;
		}
		else if( this.state.currentPanel === 2 ) {
			panel = <Two /> ;
		}
		else if( this.state.currentPanel === 3 ) {
			panel = <Three /> ;
		}

		return(
      		<div className="App">
      			<TopHead togglePanel={this.togglePanel}/>
      			<div id="mainpanel">
					{panel}
				</div>
      		</div>
      );
	}
}

export default App;
