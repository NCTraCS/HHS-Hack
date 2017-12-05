import React from 'react';
import './App.css';
import ControlPanel from './ControlPanel';
import ResultPanel from './ResultPanel';
import {log} from './GlobalFunctions';

/* Page Layout - Bootstrap*/
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Panel,Well } from 'react-bootstrap';

class App extends React.Component {

	constructor(props) {
		super(props);
		log(props);
        this.state = ({name: this.props.name, currentPanel: 0});

        this.togglePanel = this.togglePanel.bind(this);
	}

    togglePanel(panelNum) {
        this.setState( {currentPanel: panelNum} );
    }

	renderPage() {
		var currentPage = this.state.currentPanel;
		if (currentPage === 0)
			return <Home setPage={this.togglePanel}/>;
		else if (currentPage === 1)
			return <RiskApp setPage={this.togglePanel} currentPage={currentPage}/>;
		else
			return <Home/>;

	}
    render() {
		let page = this.renderPage();
	    return (
	      <div className="App">
			  {page}
	      </div>
	    );
	  }
}

class Home extends React.Component {
    render() {
        return(
			<div>
				<header className="App-header">
					<h1 className="App-title">THOR App</h1>
				</header>
				<p>...understanding risk of opioid misuse, see: <a href="/" onClick={(e)=>{this.props.setPage(1);e.preventDefault();return(false);}} >My Risk</a></p>
				<p>...seeking resource to help prevent opioid misuse, see: <a href="/" onClick={(e)=>{this.props.setPage(2);e.preventDefault();return(false);}} >Resources</a></p>
				<p>...want to collaborate with us?, see: <a href="/" onClick={(e)=>{this.props.setPage(3);e.preventDefault();return(false);}} >Collaborate</a></p>
			</div>
        );
    }
}

class RiskApp extends React.Component {
    constructor(props) {
        super(props);
        log(props);
        this.state = ({name: this.props.name});

        this.propConstraints = '';
        this.setPropConstraints = this.setPropConstraints.bind(this);
    }

    setPropConstraints(propVals) {
    	this.propConstraints = propVals;
	}

    render() {
		const controlPanelTitle='Risk Assesment Controls';
        return (
			<div className="RiskApp">
				<Navigation setPage={this.props.setPage} currentPanel={this.props.currentPage}/>
				<Grid>
					<Row>
						<Col xs={12}>
							<Well header={controlPanelTitle}>
								<ControlPanel constraintHandler={this.setPropConstraints}/>
							</Well>
						</Col>
					</Row>
					<Row>
						<Col xs={2}>
							<div id="navHomeSide">sidebar</div>
						</Col>
						<Col xs={10}>
                            <ResultPanel propConstraints={this.propConstraints}/>
						</Col>
					</Row>
				</Grid>
			</div>

        );
    }
}

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        let currentPanel = 1;
        if( props.currentPage )
            currentPanel = props.currentPage;

        this.state = {
            activeKey: currentPanel
        };
        this.menuSelect = this.menuSelect.bind(this);
    }

    menuSelect(selectedKey) {
        this.setState( {activeKey: selectedKey} );
        this.props.setPage(selectedKey);
    }

	render() {
        return(
			<Navbar fixedTop inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<a href='/' onClick={(e)=>{this.props.setPage(0),e.preventDefault();return(false);}}>THOR App Home</a>
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
export default App;
