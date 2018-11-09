import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import {ButtonToolbar, ButtonGroup, Button, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import DynamicRange from './DynamicRange';
import {log} from './GlobalFunctions';
import {flaskHost} from './GlobalFunctions';

const style = {width: '70%', margin: 50};
const style2 = {width: '30%', margin: 20, float:'left'};

export default class ControlItem extends React.Component {

	constructor(props) {
		super(props);

		this.state = ({
			id: this.props.id,
			name: this.props.name,
			display: this.props.display,
			type: this.props.type,
			propMin: this.props.propMin,
			propMax: this.props.propMax,
			selectMin: this.props.propMin,
			selectMax: this.props.selectMax,
			propDefValue: this.props.propDefValue,
			propValue: this.props.propDefValue,
			showCriteria: this.props.showCriteria,
			optionsList: [],
			dataCallId: this.props.dataCallId
		});
		this.getOptions(this.state.name);
		this.callFlask = this.props.callFlask;
		this.setDataCall = this.props.setDataCall;
		this.getDataCall = this.props.getDataCall;
		this.toggleCriteria = this.toggleCriteria.bind(this);

		this.handleClick = this.handleClick.bind(this);

		this.radioSubstanceAbuseCriteria = this.radioSubstanceAbuseCriteria.bind(this);
		this.checkBoxPsychologicalCriteria = this.checkBoxPsychologicalCriteria.bind(this);

		this.propUpdate = this.props.handler;
		this.drawOptions = this.drawOptions.bind(this);
		//this.getOptions = this.getOptions.bind(this);
	}

	getOptions(optionType) {
		var options = [];
		console.log('Option Type: ', optionType);
		var flaskCall =  flaskHost;
		if ( optionType === 'co_dx' ) {
			flaskCall = flaskHost+'/co_occur_list';
		}
		else if ( optionType === 'county_name' ) {
			flaskCall = flaskHost+'/county_list';
		}
        else if ( optionType === 'co_pcd' ) {
            flaskCall = flaskHost+'/co_occur_px_list';
        }
        console.log('HERE : ', flaskCall);
		var Request = require('request');
		Request.get(flaskCall, (error, response, body) => {

			if(error) {
				return console.log("WHAT ERROR?");
			}
			else {
				console.log('Call Made:', JSON.parse(body));
				options = JSON.parse(body);
				for(var i = 0; i<options.length; i++){
					options[i].key = i;
				}
				this.setState({optionsList: options});
				return options;
			}
		});
	}

	drawOptions() {
		//if(optionType === 'co_dx') {
		var options = this.state.optionsList;
		console.log('drawOptions: ', options);
		return options.map((item, idx) => <option key={idx} value={item.key}>{item.display_name} </option>);
		//}
	}

	drawCriteria() {
		console.log(this.state)
		if(this.state.type === 'range') {
			return (
				<DynamicRange propHandler={this.props.handler} id={0}
								  name='Population Per Square Mile'
								  display='Population Per Square Mile'
								  propMin= {0}
								  propMax= {100}
				/>
			)
		}
		else if (this.state.type === 'toggle') {
			return (
				<ButtonToolbar>
					<ToggleButtonGroup id={this.props.id} type="radio" defaultValue={this.props.propDefValue} name={this.state.name}>
						<ToggleButton value={'employed'} onChange={this.toggleCriteria}>Yes</ToggleButton>
						<ToggleButton value={'unemployed'} onChange={this.toggleCriteria}>No</ToggleButton>
					</ToggleButtonGroup>
				</ButtonToolbar>
			)
		}
		else if (this.state.type === 'PsychologicalCheckBox') {
			return (
				<ButtonToolbar>
					<ToggleButtonGroup id={this.props.id} type="checkbox" defaultValue={this.props.propDefValue} name={this.state.name}>
						<ToggleButton value={"ADD, OCD, Biopolar, or Schizophrenia"} onChange={this.checkBoxPsychologicalCriteria}>ADD, OCD, Biopolar, or Schizophrenia </ToggleButton>
						<ToggleButton value={"Depression"} onChange={this.checkBoxPsychologicalCriteria}>Depression</ToggleButton>
					</ToggleButtonGroup>
				</ButtonToolbar>
			)
		}
		else if (this.state.type === 'substanceAbuseFamilyCheckBox') {
			return (
				<ButtonToolbar>
					<ToggleButtonGroup id={this.props.id} type="checkbox" defaultValue={this.props.propDefValue} name={this.state.name}>
						<ToggleButton value={"Alcohol"} onChange={this.radioSubstanceAbuseCriteria}>Alcohol</ToggleButton>
						<ToggleButton value={"Illegal Drugs"} onChange={this.radioSubstanceAbuseCriteria}>Illegal Drugs</ToggleButton>
						<ToggleButton value={"Rx Drugs"} onChange={this.radioSubstanceAbuseCriteria}>Prescription Drugs</ToggleButton>
					</ToggleButtonGroup>
				</ButtonToolbar>
			)
		}
		else if (this.state.type === 'substanceAbusePersonalCheckBox') {
			return (
				<ButtonToolbar>
					<ToggleButtonGroup id={this.props.id} type="checkbox" defaultValue={this.props.propDefValue} name={this.state.name}>
						<ToggleButton value={"Alcohol"} onChange={this.radioSubstanceAbuseCriteria}>Alcohol</ToggleButton>
						<ToggleButton value={"Illegal Drugs"} onChange={this.radioSubstanceAbuseCriteria}>Illegal Drugs</ToggleButton>
						<ToggleButton value={"Rx Drugs"} onChange={this.radioSubstanceAbuseCriteria}>Prescription Drugs</ToggleButton>
					</ToggleButtonGroup>
				</ButtonToolbar>
			)
		}
		else if (this.state.type === 'ageRangeCheckBox') {
			return (
				<ButtonToolbar>
					<ToggleButtonGroup id={this.props.id} type="checkbox" defaultValue={this.props.propDefValue} name={this.state.name}>
						<ToggleButton value={"Less than 16"} onChange={this.checkBoxAgeRange}>Less than 16</ToggleButton>
						<ToggleButton value={"16 to 48"} onChange={this.checkBoxAgeRange}>16 to 48</ToggleButton>
						<ToggleButton value={"Over 48"} onChange={this.checkBoxAgeRange}>Over 48</ToggleButton>
					</ToggleButtonGroup>
				</ButtonToolbar>
			)
		}
        else if (this.state.type === 'educational_level') {
            return (
                <FormGroup>
                    <FormControl defaultValue='Select A Value...' componentClass="select" placeholder="select" onChange={this.handleClick} inputRef={ref => {this.input= 'drop_select'}}>
                        <option key='default' disabled={true}>Select A Value...</option>
                        <option key='highschool' disabled={false}>High school</option>
                        <option key='undergrad' disabled={false}>Undergraduate (BA, BS...)</option>
                        <option key='grad' disabled={false}>Graduate (PhD, MD, AuD, ...)</option>
                        <option key='other' disabled={true}>Not Listed</option>
                    </FormControl>
                </FormGroup>
            )
        }
		else if (this.state.type ==='dropdown') {
			return (
				<FormGroup>
					<FormControl defaultValue='Select A Value...' componentClass="select" placeholder="select" onChange={this.handleClick} inputRef={ref => {this.input= 'drop_select'}}>
						<option key='default' disabled={true}>Select A Value...</option>
						{this.drawOptions(this.state.name,this.state.dataCallId)}
					</FormControl>
				</FormGroup>
			)
		}
	}

	handleClick(event) {
		let opt = [];
		let valueKey = event.target.value;
		let value = this.state.optionsList[valueKey];
		//this.setState({currentOption: call});
		//log(state);
		console.log(event.target.value);
		var dataCalls = this.state.dataCallId;

		console.log('current Data Call ID: ', dataCalls);
		let defDataCallConfig = this.props.defCallConfig;
		/*for(var i=0; i<dataCalls.length; i++){
			console.log('current Data Call Config: ', dataCalls[i], '-', defDataCallConfig);
			//opt = [{key: defDataCallConfig[dataCalls[i]].params[0], value: value[defDataCallConfig[dataCalls[i]].variables[0]]}];
			//defDataCallConfig[dataCalls[i]] = {callId: dataCalls[i], params: opt};
			opt = [{key: defDataCallConfig.params[0], value: value[defDataCallConfig.variables[0]]}];
			defDataCallConfig = {callId: dataCalls, params: opt};
		}*/
        this.setDataCall({callId: '5', params: []});
		//this.setDataCall(dataCalls, defDataCallConfig);
		console.log('HandleClick: Data Call Config:', defDataCallConfig, ' ', this.getDataCall());
		//this.callFlask();
		return;
	}

	toggleCriteria(event) {
		log(event);
		var propValue = event.target.value;
		var returnObj = {showCriteria: !this.state.showCriteria, propValue: propValue};
		this.setState({showCriteria: !this.state.showCriteria});
		this.propUpdate(this.state.id, returnObj);
		//if(propValue !== '0') {
			var params = [propValue];
			//var currDataConfig = this.getDataCall(this.state.dataCallId);
			//console.log('Toggle Crit Data Config: ', currDataConfig);
			//if(currDataConfig['params'].length > 0)
			//	params = currDataConfig['params'];
			this.setDataCall({callId: '7', params: params});
		//}
		console.log('PropValue:', propValue);
	}

	radioSubstanceAbuseCriteria(event) {
		log(event);
		var propValue = event.target.value;
		var returnObj = {showCriteria: !this.state.showCriteria, propValue: propValue};
		this.setState({showCriteria: !this.state.showCriteria});
		this.setState({propValue: propValue});
		this.propUpdate(this.state.id, returnObj);
		if(propValue === 'Alcohol') {
			/*var params = [];
			var currDataConfig = this.getDataCall();
			console.log('Toggle Crit Data Config: ', currDataConfig);
			if(currDataConfig['params'].length > 0)
				params = currDataConfig['params'];*/
			this.setDataCall({callId: '2', params: []});
		}
		console.log('PropValue:', propValue);
	}
	checkBoxAgeRangeCriteria(event) {
		log(event);
		var propValue = event.target.value;
		var returnObj = {showCriteria: !this.state.showCriteria, propValue: propValue};
		this.setState({showCriteria: !this.state.showCriteria});
		this.setState({propValue: propValue});
		this.propUpdate(this.state.id, returnObj);
		if(propValue === 'Alcohol') {
			var params = [];
			var currDataConfig = this.getDataCall();
			console.log('Toggle Crit Data Config: ', currDataConfig);
			if(currDataConfig['params'].length > 0)
				params = currDataConfig['params'];
			this.setDataCall({dataCallId: '2', params: params});
		}
		console.log('PropValue:', propValue);
	}

	checkBoxPsychologicalCriteria(event) {
		log(event);
		var propValue = event.target.value;
		var returnObj = {showCriteria: !this.state.showCriteria, propValue: propValue};
		this.setState({showCriteria: !this.state.showCriteria});
		this.setState({propValue: propValue});
		this.propUpdate(this.state.id, returnObj);
		if(propValue === 'Alcohol') {
			var params = [];
			/*var currDataConfig = this.getDataCall();
			console.log('Toggle Crit Data Config: ', currDataConfig);
			if(currDataConfig['params'].length > 0)
				params = currDataConfig['params'];*/
			this.setDataCall({dataCallId: '2', params: params});
		}
		console.log('PropValue:', propValue);
	}

	render() {
		return (
			<div>
				<ControlLabel>{this.state.display}</ControlLabel>
				{this.drawCriteria()}
			</div>
		)
	}
};