import React from 'react';
import ControlItem from './ControlItem';
import Panel from 'react-bootstrap/lib/Panel';
import ControlLabel from 'react-bootstrap/lib/Form';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';
import {flaskHost} from './GlobalFunctions';


const style = {width: '70%', margin: 50};
const style2 = {width: '30%', margin: 20, float:'left'};

export default class ControlPanel extends React.Component {

	constructor(props) {
		super(props);
		//log(props);
		// NEED TO INITIALIZE STATE
		//var options = this.props.callbacks.getOptions('state');
		this.state = ({
			displayType: 0,
			stateList: [],
			counties: [],
			name: this.props.name,
			showCounties: false,
			currentState: 2,
			propVal: this.props.propConstraints
		});
		//this.drawOptions = this.drawOptions.bind(this);
		//this.getOptions = this.props.callbacks.getOptions;
		this.getCounties = this.props.callbacks.getCounties;
		this.setPropConstraints = this.props.callbacks.setPropConstraints;
		//this.setPropConstraints(this.state.propVal);
		this.propUpdate = this.propUpdate.bind(this);
		//this.handleClick = this.handleClick.bind(this);
		this.setDataCall = this.props.callbacks.setDataCall;
		this.getDataCall = this.props.callbacks.getDataCall;
		//this.toggleCriteria = this.toggleCriteria.bind(this);
		//this.setCurrentState = this.setCurrentState.bind(this);

		console.log('State List:',this.state.stateList);
	}

	propUpdate(id, propObj) {
		console.log('Property ID:', id);
		var tempProps = this.state.propVal;
		console.log('Prop Update propVal: ', this.state.propVal);
		var tempProp = tempProps[id];
		if(tempProp === undefined) {
			tempProp = propObj;
		}
		else {
			console.log(propObj);
			Object.keys(propObj).forEach(function (key) {
				console.log('Property Obj Val:', propObj[key]);
				tempProp[key] = propObj[key];
				//console.log('Object Key:', key);
				//console.log('Object Value:', propObj[key]);
			});
		}
		tempProps[id] = tempProp;
		//console.log('Temp Prop:', tempProp);
		console.log('Temp Props:', tempProps[id]);
		//this.setState({propVal: tempProps});
		this.setPropConstraints(tempProps);
		console.log('New State PropVal:', this.state.propVal);
	}

	render() {
		console.log('Contorl panel Render');
		console.log('');
		return (
			<div className="formTop">
				<Form horizontal>
					<FormGroup bsSize='small' controlId="formControlsSelect">
						<div className="inLineFormDropDown">
							<ControlItem id={1} name={'co_dx'}
											 display={'If you recently had a procedure and were sent home with opioids, select that procedure'}
											 type={'dropdown'}
											 dataCallId={0}
											 handler={this.propUpdate}
											 setDataCall= {this.setDataCall}
											 getDataCall={this.getDataCall}
											 showCriteria={true} />
						</div>
						<div className="inLineFormDropDown">
							<ControlItem id={0} name={'co_dx'}
											 display={'If you’re currently taking an opioid, select the condition for which it was prescribed'}
											 type={'dropdown'}
											 dataCallId={0}
											 handler={this.propUpdate}
											 setDataCall= {this.setDataCall}
											 getDataCall={this.getDataCall}
											 showCriteria={true} />
						</div>
						<div className="inLineFormDropDown">
							<ControlItem id={1} name={'county_name'}
											 display={'Select the county where you currently live'}
											 type={'dropdown'}
											 dataCallId={1}
											 handler={this.propUpdate}
											 setDataCall= {this.setDataCall}
											 getDataCall={this.getDataCall}
											 showCriteria={true} />
						</div>
					</FormGroup>
					<FormGroup bsSize='small' controlId="formControlsSelect">
						<div className="inLineFormYesNo">
							<ControlItem id={6}
											 name='educational_level'
											 display='Select the highest level of education you have received.'
											 type= 'toggle'
											 propDefValue={0}
											 showCriteria={false}
											 handler = {this.propUpdate}
											 setDataCall= {this.setDataCall}
											 getDataCall={this.getDataCall}
							/>
						</div>
						<div className="inLineFormYesNo">
							<ControlItem id={7}
											 name='current_employment'
											 display='Are you currently employed (full or part-time)?'
											 type= 'toggle'
											 propDefValue={0}
											 showCriteria={false}
											 handler = {this.propUpdate}
											 setDataCall= {this.setDataCall}
											 getDataCall={this.getDataCall}
							/>
						</div>
						<div className="inLineFormYesNo">
							<ControlItem id={8}
											 name='ort_sex'
											 display='What is your biological sex?'
											 type= 'toggle'
											 propDefValue={0}
											 showCriteria={false}
											 handler = {this.propUpdate}
											 setDataCall= {this.setDataCall}
											 getDataCall={this.getDataCall}
							/>
						</div>
						<div className="inLineFormYesNo">
							<ControlItem id={11}
											 name='ort_sexual_abuse'
											 display='Have you experienced sexual abuse?'
											 type= 'toggle'
											 propDefValue={0}
											 showCriteria={false}
											 handler = {this.propUpdate}
											 setDataCall= {this.setDataCall}
											 getDataCall={this.getDataCall}
							/>
						</div>
						<div className="inLineFormCheckBoxWide">
							<ControlItem id={4}
											 name='ort_age'
											 display='Select your age group'
											 type= 'ageRangeCheckBox'
											 propDefValue={'None'}
											 showCriteria={false}
											 handler = {this.propUpdate}
											 setDataCall= {this.setDataCall}
											 getDataCall={this.getDataCall}
							/>
						</div>
					</FormGroup>
					<FormGroup bsSize='small' controlId="formControlsSelect">
						<div>
							<div className="inLineFormCheckBoxWide">
								<ControlItem id={9}
												 name='ort_family_history_substance_abuse'
												 display='In your immediate family, is there history of substance abuse? If so, select the substances below.'
												 type= 'substanceAbuseFamilyCheckBox'
												 propDefValue={'None'}
												 showCriteria={false}
												 handler = {this.propUpdate}
												 setDataCall= {this.setDataCall}
												 getDataCall={this.getDataCall}
								/>
							</div>
							<div className="inLineFormCheckBoxWide">
								<ControlItem id={10}
												 name='ort_Personal_history_substance_abuse'
												 display='Do you have any personal history of substance abuse? If so, select the substances below. (Alcohol / Illegal drugs / Prescription drugs)'
												 type= 'substanceAbusePersonalCheckBox'
												 propDefValue={'None'}
												 showCriteria={false}
												 handler = {this.propUpdate}
												 setDataCall= {this.setDataCall}
												 getDataCall={this.getDataCall}
								/>
							</div>
						</div>
					</FormGroup>
					<FormGroup bsSize='small' controlId="formControlsSelect">
						<div>
							<div className="inLineFormCheckBoxWide">
								<ControlItem id={12}
												 name='ort_psychological_disease'
												 display='Has a doctor ever told you that you may have one or more of the following conditions? (ADD, OCD, Biopolar, or Schizophrenia / Depression'
												 type= 'PsychologicalCheckBox'
												 propDefValue={0}
												 showCriteria={false}
												 handler = {this.propUpdate}
												 setDataCall= {this.setDataCall}
												 getDataCall={this.getDataCall}
								/>
							</div>
							
						</div>
					</FormGroup>
				</Form>
			</div>
		);
	}
};