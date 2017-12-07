import React from 'react';
import './App.css';
import ControlPanel from './ControlPanel';
import ResultPanel from './ResultPanel';
import {log} from './GlobalFunctions';
import {flaskHost} from './GlobalFunctions';

/* Page Layout - Bootstrap*/
import { Nav, Navbar, NavItem, NavbarHeader } from 'react-bootstrap';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import { Panel, Well, Button } from 'react-bootstrap';


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
				<Jumbotron className="App-header">
					<h1 className="App-title">THOR App</h1>
					<h2>Technical Health Opiod Research</h2>
					<p>THOR is an application designed to help do awesome things....</p>
					<p><Button onClick={(e)=>{this.props.setPage(1);e.preventDefault();return(false);}} >Take Me to The App!</Button></p>
				</Jumbotron>
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
        this.state = ({name: this.props.name ,
			showResults: false,
			dataCalls: [{ callId : '0', name: 'Default', variables:[]},
			{
        		callId : '1',
				name: 'Opiod Abuse DX by Patient Conditions',
				variables: ['op_dx','co_dx']
			},
				{callId: '2',
				name: 'Opiod Abuse by Perscriptions for Condition',
				variables: ['op_drug','op_dx','co_dx']}],
			dataCallConfig : {dataCallId: '0', params: []},
            propVal : [
                {name : 'popsqmile', display:'Population per Square Mile', type:'range', propMin : 0 , propMax: 100, showCriteria: true},
                {name : 'rxrate', display:'Include Perscription Rate?', type:'toggle', propDefValue: 1, propValue : false, showCriteria: false}
            ]});
		this.data = {};
		this.callbacks = {
			setDataCall: this.setDataCall.bind(this),
			getDataCall: this.getDataCall.bind(this),
			checkCallId: this.checkCallId.bind(this),
			getCounties: this.getCounties.bind(this) ,
			//getOptions: this.getOptions.bind(this) ,
			getData: this.getData.bind(this),
			getAppState: this.getAppState.bind(this),
        	setPropConstraints: this.setPropConstraints.bind(this),
			getPropConstraints: this.getPropConstraints.bind(this)
		};

        let propConstraints = '';
        console.log('StateList:',this.stateList);
    }
	componentDidUpdate(prevProps, prevState) {
		if(prevState.dataCallConfig !== this.state.dataCallConfig) {
			this.getCounties();
		}
		if(prevState.data !== this.state.data && this.state.data !== undefined) {
            this.setState({showResults: true});
		}
	}

	setDataCall(callConfig) {
    	console.log('New Data Config:', callConfig);
    	console.log('Current Data Config: ', this.state.dataCallConfig);
    	var prevCallId = this.state.dataCallConfig.dataCallId;
    	var newCallId = callConfig.dataCallId;
    	if(this.checkCallId(prevCallId, newCallId)) 
			callConfig.dataCallId = prevCallId;
		this.setState({dataCallConfig : callConfig});
    	//this.getCounties();
	}
	/* Need to determine if the variables/data scope has actually changed */
	checkCallId(prevCallId, newCallId) {
		var inCurrentCall = false;
		console.log('Previous Call Id: ', prevCallId);
        console.log('Previous Vars: ', this.state.dataCalls[prevCallId].variables);
		console.log('New Call Id:', newCallId);
        console.log('NewVars: ', this.state.dataCalls[newCallId].variables);
    	var prevCallVars = this.state.dataCalls[prevCallId].variables;
    	var newCallVars = this.state.dataCalls[newCallId].variables;
    	var varOverlap = newCallVars.filter(val => prevCallVars.includes(val));
    	console.log('varOverlap: ', varOverlap);
    	if(varOverlap.length === newCallVars.length)
    		inCurrentCall = true;
    	console.log('In Current Call?' , inCurrentCall);
    	return inCurrentCall;
	}

	getDataCall() {
    	console.log('Returning dataCallConfig...', this.state.dataCallConfig);
    	return this.state.dataCallConfig;
	}
    setPropConstraints(propVals) {
    	this.setState({propVal: propVals});
	}

	getPropConstraints() {
        return this.state.propVal;
    }

    getAppState() {
    	return this.state.showResults;
	}

	/*
		Data Call Id's:
		0 = Default - No data
		1 = Counties + PopSqMile
		2 = Counties + PopSqMile + Rx Rate
	 */
    getCounties() {
        console.log('GetCounties',this.state.propVal[1].propValue);
        console.log('Get Counties Props', this.state.propVal);
        console.log('Get Counties DataConfig: ', this.state.dataCallConfig);
        this.setState({showResults: false, displayType: 1});
        var callId = this.state.dataCallConfig['dataCallId'];
        var params = this.state.dataCallConfig['params'];
        var Request = require('request');
        if(callId === '2') {
        	var flaskCall = flaskHost+'/cdc/rates';
        	if(params[0] !== undefined) {
        		flaskCall = flaskCall+'/'+params[0];
			}
            Request.get(flaskCall, (error, response, body) => {
                if(error) {
                    return console.log("WHAT ERROR?");
                }
                else {
                    this.setState({data: JSON.parse(body)});
                }
                //console.log('Data Here:', this.state.data);
            });
        }
        else if (callId === '1') {
        	console.log('Making Call 1...');
            Request.get(flaskHost+'/gaz/'+params[0], (error, response, body) => {
                if(error) {
                    return console.log("WHAT ERROR?");
                }
                else {
                    this.setState({data: JSON.parse(body)});
                    //this.setState({showResults: true});
                    console.log('Data Here:', this.state.data);
                    return;
                }
            });
        }
        else {
        	return;
		}
    }

    getData() {
    	console.log('getting the Data...');
    	//console.log(this.state.data);
    	return this.state.data;
	}

    render() {
		const controlPanelTitle='Risk Assesment Controls';
		console.log('Risk App Render:');
		console.log(this.state.dataCallConfig);
        return (
			<div className="RiskApp">
				<Navigation setPage={this.props.setPage} currentPanel={this.props.currentPage}/>
				<Grid>
					<Row>
						<Col xs={10}>
							<Well header={controlPanelTitle}>
								<ControlPanel callbacks={this.callbacks} propConstraints={this.state.propVal}/>
							</Well>
						</Col>
					</Row>
                    {this.state.data !== undefined ?
						<ResultPanel callbacks={this.callbacks} data={this.state.data} propConstraints={this.state.propVal} dataCallId={this.state.dataCallId}/>
                        : 'Please Select a State'}
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
			<Navbar fixedTop collapseOnSelect>
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
