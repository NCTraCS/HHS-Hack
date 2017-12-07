import React, { Component } from 'react';
import './App.css';
import One from './One';
import Two from './Two';
import Three from './Three';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import { Grid, Row, Col } from 'react-bootstrap';
import { Panel,Well } from 'react-bootstrap';

class TopNav extends Component {
	constructor(props) {
		super(props);
		let currentPanel = 1;
		if( props.currentPanel )
			currentPanel = props.currentPanel;

		this.state = {
			activeKey: currentPanel
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
						<a href='/' onClick={(e)=>{this.props.togglePanel(0),e.preventDefault();return(false);}}>TraCS App</a>
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

class NavHome extends Component {
	render() {
		let panel = <One />;
		if( this.props.currentPanel === 1 ) {
			panel = <One /> ;
		}
		else if( this.props.currentPanel === 2 ) {
			panel = <Two /> ;
		}
		else if( this.props.currentPanel === 3 ) {
			panel = <Three /> ;
		}
		const controlPanelTitle = <h3>Control Panel</h3>;

		return(
			<div id="mainPanel">
				<TopNav togglePanel={this.props.togglePanel} currentPanel={this.props.currentPanel}/>
				<Grid>
					<Row>
						<Col xs={12}>
							<Well header={controlPanelTitle}>
							<br />
							controls here
							<br />
							<br />
							</Well>
						</Col>
					</Row>
					<Row>
						<Col xs={2}>
						<div id="navHomeSide">sidebar</div>
						</Col>
						<Col xs={10}>
							{panel}
						</Col>
					</Row>
				</Grid>
			</div>
		);

	}
}

export default NavHome;
