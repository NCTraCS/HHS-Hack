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
/*
		switch (currentPage) {
			case 0: //Homw Page
				return <Home setPage={this.togglePanel}/>;
				break;
			case 1: //Risk Assessment
				<RiskApp setPage={this.togglePanel} currentPage={currentPage}/>;
				break;
			case 2: //Resources
				<Resources setPage={this.togglePanel} currentPage={currentPage}/>;
				break;
			case 3: //Collaborate
				<Collaborate setPage={this.togglePanel} currentPage={currentPage}/>;
				break;
			default:
				return <Home setPage={this.togglePanel}/>;
		}
	}
*/

		if (currentPage === 0)
			return <Home setPage={this.togglePanel}/>;
		else if (currentPage === 1)
			return <RiskApp setPage={this.togglePanel} currentPage={currentPage}/>;
		else if (currentPage === 2)
			return <Resources setPage={this.togglePanel} currentPage={currentPage}/>;
		else if (currentPage === 3)
			return <Collaborate setPage={this.togglePanel} currentPage={currentPage}/>;
		else if (currentPage === 4)
			return <About setPage={this.togglePanel} currentPage={currentPage}/>;
		else if (currentPage === 5)
			return <Feedback setPage={this.togglePanel} currentPage={currentPage}/>;
		else
			return <Home setPage={this.togglePanel} currentPage={currentPage}/>;

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
		const controlPanelTitle='Hello';
		console.log('Home Top Navbar Render:');
		return (
			<div className="Home">
				<Navigation setPage={this.props.setPage} currentPanel={this.props.currentPage}/>
				<div>
					<Jumbotron className="App-header">
						<h1 className="App-title">THOR App</h1>
						<h2>Technical Health Opiod Research</h2>
						<p>THOR is an application designed to help do awesome things....</p>
						<p><Button onClick={(e)=>{this.props.setPage(1);e.preventDefault();return(false);}} >Take Me to The App!</Button></p>
					</Jumbotron>
					<div class="topCopy">
						Lorem ipsum dolor sit amet, illum accommodare in sea, possit similique maiestatis ne eos, vocibus praesent has an. Doctus electram suavitate no mei, ea omnesque deseruisse usu, vix ea brute omittam. Id semper phaedrum urbanitas per. Inani menandri cum at, nam ad atomorum sententiae. Simul labitur maiorum ex mel, ex est rebum dicant vituperata.
						Esse adipisci ne pro, qui ad dictas inermis mediocritatem. Mei an possit delicata. No prima aliquid eam, his case temporibus ei. Voluptaria neglegentur te eos, tation qualisque an ius, et malorum dolores molestiae ius. Usu numquam scaevola eu, quo ullum eligendi id. In vix nulla exerci nominavi, ea vitae eligendi percipit mel, eum assentior signiferumque ut.
					</div>
				</div>
			</div>

        	/*
*/
        );
    }
}

class RiskApp extends React.Component {
    constructor(props) {
        super(props);
        log(props);
        this.state = ({name: this.props.name ,
			showResults: false,
			data:[],
			dataCalls: [{ callId : 0, name: 'Default', variables:[]},
			{
        		callId : 1,
				name: 'County Death Per Capita',
				variables: ['county_name'], //First one needs to be the value source for a parameter
				params: ['id_county'] //Parameter to be passed in flaskCall
			},
				{callId: 2,
				name: 'Opiod Abuse by Perscriptions for Condition',
				variables: ['op_drug','op_dx','co_dx']}],
			dataCallConfig : [{dataCallId: 0, params: []}],
            propVal : [
                {name : 'popsqmile', display:'Population per Square Mile', type:'range', propMin : 0 , propMax: 100, showCriteria: true},
                {name : 'rxrate', display:'Include Perscription Rate?', type:'toggle', propDefValue: 1, propValue : false, showCriteria: false},
				{name: 'test1'},
				{name: 'toggle'},
				{name: 'prop5'}
            ]});
		this.data = {};
		this.callbacks = {
			setDataCall: this.setDataCall.bind(this),
			getDataCall: this.getDataCall.bind(this),
			checkCallId: this.checkCallId.bind(this),
			callFlask: this.callFlask.bind(this) ,
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
        console.log('Check Changes');
        console.log(prevState.dataCallConfig, this.state.dataCallConfig);
		if(prevState.dataCallConfig !== this.state.dataCallConfig) {
			console.log('Data Config Changed');
			this.callFlask();
		}
		if(prevState.data !== this.state.data && this.state.data !== undefined) {
            console.log('Data Changed');
            this.setState({showResults: true});
		}
	}

	setDataCall(dataCallId, newCallConfig) {
    	console.log('New Data Config:', newCallConfig);
    	console.log('Current Data Config: ', this.state.dataCallConfig);
		var updCallConfig = this.state.dataCallConfig;
    	updCallConfig[dataCallId] = newCallConfig;
		/*if(this.checkCallId(prevCallId, newCallId))
			callConfig.dataCallId = prevCallId;*/
		this.setState({dataCallConfig : updCallConfig});
    	//this.getCounties();
        console.log('Updated Data Config:', this.state.dataCallConfig);
        this.callFlask();
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

	getDataCall(callId) {
        console.log('dataCallConfig...', this.state.dataCalls);
		var currDataCallConfig = this.state.dataCalls[callId];
        console.log('Returning dataCallConfig...', currDataCallConfig);
    	return currDataCallConfig;
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
    callFlask() {
        console.log('GetCounties',this.state.propVal[1].propValue);
        console.log('Get Counties Props', this.state.propVal);
        console.log('Get Counties DataConfig: ', this.state.dataCallConfig);
        //this.setState({showResults: false, displayType: 1});
        for(var i=0; i< this.state.dataCallConfig.length; i++) {
            var callId = this.state.dataCallConfig[i].callId;
            var params = this.state.dataCallConfig[i].params;
            console.log('Here: ', callId,':',params);
            var Request = require('request');
            if (callId === 1) {
            	console.log('Next');
                var flaskCall = flaskHost + '/death_per_cap';
                if (params !== undefined && params.length > 0) {
                    flaskCall = flaskCall + '?';
                    for (var i = 0; i < params.length; i++) {
                        if (i > 0)
                            flaskCall = flaskCall + '&';
                        flaskCall = flaskCall + params[i].key + '=' + params[i].value;
                    }
                }
                Request.get(flaskCall, (error, response, body) => {

                    if (error) {
                        return console.log("WHAT ERROR?");
                    }
                    else {
                        var newData = this.state.data;
                        newData[callId] = JSON.parse(body).data;
                        this.setState({data: newData});
                    }
                    console.log('Data Here:', this.state.data);
                });
            }
            else if (callId === 2) {
                console.log('Making Call 2...');
                Request.get(flaskHost + '/gaz/' + params[0], (error, response, body) => {
                    if (error) {
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
		}
		return;
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

class Resources extends React.Component {
	constructor(props) {
		super(props);
		log(props);
		this.state = ({name: this.props.name})
	}
	render() {
		const controlPanelTitle='Resources';
		console.log('Resources:');
		console.log(this.state.dataCallConfig);
		return (
			<div className="Resources">
				<Navigation setPage={this.props.setPage} currentPanel={this.props.currentPage}/>
				<div class="topCopy">
					<Panel>
					<p>
					Though opioids can be safe and effective if taken exactly as described by a physician, they carry a risk of abuse and overdose. Now that you've examined your risk, learn more at the links below.
					</p>
					<p>
					To get the facts:
					</p>
					<p>
					Facts on opioids for teens: https://teens.drugabuse.gov/sites/default/files/peerx/pdf/PEERx_Toolkit_FactSheets_Opioids.pdf
					Recent opioids research: https://www.drugabuse.gov/drugs-abuse/opioids/nida-funded-opioid-research
					Overdose infographic: https://www.cdc.gov/drugoverdose/data/overdose.html
					</p>
					<p>
					To find assistance: 
					</p>
					<p>
					Behavioral Treatment services locator: https://findtreatment.samhsa.gov/
					SAMHSA's National Helpline: https://www.samhsa.gov/find-help/national-helpline
					Buprenorphine (medication-assisted) treatment locator: https://www.samhsa.gov/medication-assisted-treatment/physician-program-data/treatment-physician-locator
					</p>
					</Panel>
				</div>
			</div>

		);
	}
}

class Collaborate extends React.Component {
	constructor(props) {
		super(props);
		log(props);
		this.state = ({name: this.props.name})
	}
	render() {
		const controlPanelTitle='Collaborate';
		console.log('Collaborate:');
		console.log(this.state.dataCallConfig);
		return (
			<div className="Collaborate">
				<Navigation setPage={this.props.setPage} currentPanel={this.props.currentPage}/>
				<div class="topCopy">
					Are you a researcher, activist, or citizen scientist? We would love to collaborate with you! THOR app becomes more robust every time new data is added, or analytical techniques applied.
					
					Shoot us an email at opioiddata@unctest.edu:
					*To discuss contributing a curated dataset of your own
					*For questions on THOR app or the underlying data
					
					Looking to go further? UNC participates in a number of Clinical Data Research Networks (CDRNs)--groups of academic institutions who have agreed to share their clinical data with one another, and with researchers. These CDRNs can you guide you through the regulatory processes to request data from several institutions, enabling big data-driven clinical research. We'd love to help you combine CDRN data with THOR app to answer your opioid research question.

					To learn more about CDRNs, reach out to us at the email above, or click the logos below to learn more about each network.
					
					Insert PCORnet logo--hyperlink to--http://www.pcornet.org/
					Insert Carolinas Collaborative logo--hyperlink to: https://carolinascollaborative.org/
					Insert CTSAct logo--hyperlink to: https://www.act-network.org/node/29

				</div>
			</div>
		);
	}
}

class About extends React.Component {
	constructor(props) {
		super(props);
		log(props);
		this.state = ({name: this.props.name})
	}
	render() {
		const controlPanelTitle='About';
		console.log('About:');
		console.log(this.state.dataCallConfig);
		return (
			<div className="About">
				<Navigation setPage={this.props.setPage} currentPanel={this.props.currentPage}/>
				<div class="topCopy">
					Lorem ipsum dolor sit amet, vis id consul intellegebat, eu ubique postea eos. An eripuit eruditi perpetua vis, gloriatur percipitur vis at, meis inermis no his. Veri dignissim efficiantur ut mei, nam velit eripuit ne. Duo sonet minimum ut, facilis contentiones id vis.

					Id has dolore quaestio. Vide adhuc partem ne nam, per id impedit invenire, quod sensibus evertitur at vix. Ea quo scripta prompta equidem. Vix eu eligendi platonem. Sed nostrum conclusionemque eu, vim cu deterruisset mediocritatem. Ius ut cibo commune.

					In minim veniam voluptatum per. Cum ad verear viderer volutpat. Assum oblique dissentiunt no mei. Errem propriae efficiendi duo an. Illum graeco disputationi per an, te dicat qualisque vis. Ut dolore utamur delicata eos, vis an erat explicari, ex alii tibique philosophia per.

					At eam vitae latine convenire, veri civibus qui ut. Essent vituperata mel an, affert menandri sea in. Vix ludus forensibus ex, vidit perfecto invenire pri et. Cum quis harum scriptorem cu, et his errem bonorum. An nec elit mandamus, magna labore id his.

					Ne dolorum prodesset mel, vix id quas sonet lucilius. Id per choro repudiandae accommodare. Duo at doming consulatu. Molestiae moderatius vel at. Illum aeterno accommodare sea et, cu dolor aliquam mea. Te eam tation molestie, eum sumo velit legimus id.

					Nibh aperiam feugait te usu, duis aperiam repudiandae has ad. Atqui essent est eu, nostro alterum eu per, saepe audire eu pro. Posse semper petentium eu pri, nec no sanctus conclusionemque. Nihil alienum quo te, nec ea alia stet eius. Mei scribentur dissentiet no. Eirmod feugiat id nam, alterum accusamus dissentiet per ex.

				</div>
			</div>
		);
	}
}

class Feedback extends React.Component {
	constructor(props) {
		super(props);
		log(props);
		this.state = ({name: this.props.name})
	}
	render() {
		const controlPanelTitle='Feedback';
		console.log('Feedback:');
		console.log(this.state.dataCallConfig);
		return (
			<div className="Feedback">
				<Navigation setPage={this.props.setPage} currentPanel={this.props.currentPage}/>
				<div class="topCopy">
					Lorem ipsum dolor sit amet, vis id consul intellegebat, eu ubique postea eos. An eripuit eruditi perpetua vis, gloriatur percipitur vis at, meis inermis no his. Veri dignissim efficiantur ut mei, nam velit eripuit ne. Duo sonet minimum ut, facilis contentiones id vis.

					Id has dolore quaestio. Vide adhuc partem ne nam, per id impedit invenire, quod sensibus evertitur at vix. Ea quo scripta prompta equidem. Vix eu eligendi platonem. Sed nostrum conclusionemque eu, vim cu deterruisset mediocritatem. Ius ut cibo commune.

					In minim veniam voluptatum per. Cum ad verear viderer volutpat. Assum oblique dissentiunt no mei. Errem propriae efficiendi duo an. Illum graeco disputationi per an, te dicat qualisque vis. Ut dolore utamur delicata eos, vis an erat explicari, ex alii tibique philosophia per.

					At eam vitae latine convenire, veri civibus qui ut. Essent vituperata mel an, affert menandri sea in. Vix ludus forensibus ex, vidit perfecto invenire pri et. Cum quis harum scriptorem cu, et his errem bonorum. An nec elit mandamus, magna labore id his.

					Ne dolorum prodesset mel, vix id quas sonet lucilius. Id per choro repudiandae accommodare. Duo at doming consulatu. Molestiae moderatius vel at. Illum aeterno accommodare sea et, cu dolor aliquam mea. Te eam tation molestie, eum sumo velit legimus id.

					Nibh aperiam feugait te usu, duis aperiam repudiandae has ad. Atqui essent est eu, nostro alterum eu per, saepe audire eu pro. Posse semper petentium eu pri, nec no sanctus conclusionemque. Nihil alienum quo te, nec ea alia stet eius. Mei scribentur dissentiet no. Eirmod feugiat id nam, alterum accusamus dissentiet per ex.

				</div>
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
						<NavItem eventKey={1} href="/">My Risk Assessment</NavItem>
						<NavItem eventKey={2} href="/">Resources</NavItem>
						<NavItem eventKey={3} href="/">Collaborate</NavItem>
                        <NavItem eventKey={4} href="/">About</NavItem>
                        <NavItem eventKey={5} href="/">Feedback</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
        );
	}
}

export default App;
