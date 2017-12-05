import React from 'react';
import './App.css';
import ControlPanel from './ControlPanel';
import ResultPanel from './ResultPanel';
import {log} from './GlobalFunctions';
import {flaskHost} from './GlobalFunctions';
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
        this.state = ({name: this.props.name , showResults: false});
		this.data = {};
		this.callbacks = {
			getCounties: this.getCounties.bind(this) ,
			//getOptions: this.getOptions.bind(this) ,
			getData: this.getData.bind(this),
			getAppState: this.getAppState.bind(this),
        	setPropConstraints: this.setPropConstraints.bind(this),
			getPropConstraints: this.getPropConstraints.bind(this)
		};

        let propConstraints = '';
        console.log('Prop:',this.stateList);
    }

    setPropConstraints(propVals) {
    	this.propConstraints = propVals;
	}

	getPropConstraints() {
        return this.propConstraints;
    }

    getAppState() {
    	return this.state.showResults;
	}

    getCounties(option) {
        console.log('GetCounties',this.propConstraints[1].propValue);
        this.setState({showResults: false, displayType: 1});
        var state = option;
        var Request = require('request');
        if(this.propConstraints[1].propValue === '1') {
            console.log('I Got Here!');
            Request.get(flaskHost+'/cdc/rates/'+state, (error, response, body) => {
                if(error) {
                    return console.log("WHAT ERROR?");
                }
                else {
                    this.setState({data: JSON.parse(body)});
                    this.setState({showResults: true});
                }
                console.log('Data Here:', this.state.data);
            });
        }
        else {
            Request.get(flaskHost+'/gaz/'+state, (error, response, body) => {
                if(error) {
                    return console.log("WHAT ERROR?");
                }
                else {
                    this.setState({data: JSON.parse(body)});
                    this.setState({showResults: true});
                }
                console.log('Data Here:', this.state.data);
            });
        }
        return;
    }

    getData() {
    	console.log('getting the Data...');
    	console.log(this.state.data);
    	return this.state.data;
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
								<ControlPanel callbacks={this.callbacks}/>
							</Well>
						</Col>
					</Row>
					<Row>
						<Col xs={2}>
							<div id="navHomeSide">sidebar</div>
						</Col>
						<Col xs={10}>
                            <ResultPanel callbacks={this.callbacks} data={this.state.data}/>
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
