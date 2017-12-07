import React from 'react';
import ControlItem from './ControlItem';
import Panel from 'react-bootstrap/lib/Panel';
import ControlLabel from 'react-bootstrap/lib/Form';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
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
        //console.log('Property ID:', id);
        var tempProps = this.state.propVal;
        var tempProp = tempProps[id];
        //console.log(propObj);
        Object.keys(propObj).forEach(function(key) {
            //console.log('Property Obj Val:', propObj[key]);
            tempProp[key] = propObj[key];
            //console.log('Object Key:', key);
            //console.log('Object Value:', propObj[key]);
        });
        tempProps[id] = tempProp;
        //console.log('Temp Prop:', tempProp);
        console.log('Temp Props:', tempProps[id]);
        //this.setState({propVal: tempProps});
        this.setPropConstraints(tempProps);
        console.log('New State PropVal:', this.state.propVal);
    }
    /*
    toggleCriteria(event) {
        //log(event);
        var propID = event.target.id;
        var newVal = event.target.value;
        var tempProps = this.state.propVal;
        var tempProp = tempProp[propID];
        tempProp.showCriteria = !tempProp.showCriteria;
        if (tempProp.propType === 'toggle') {
            tempProp.showCriteria = !tempProp.showCriteria;
            if(tempProp.showCriteria) {
                tempProp.propValue = newVal;
            }
        }
        tempProps[propID] = tempProp;
        this.setState({propVal: tempProps});
        if(this.state.showCounties){
            return this.getCounties;
        }
    }*/

    render() {
        console.log('Contorl panel Render');
        console.log('');
        return (
            <div className="App">
                <FormGroup bsSize='small' controlId="formControlsSelect">
                    <div style={style2}>
                        <ControlItem id={0} name={'Diagnosis'}
                             display={'Test'}
                             type={'dropdown'}
                             handler={this.propUpdate}
                             setDataCall= {this.setDataCall}
                             getDataCall={this.getDataCall}
                             showCriteria={true} />
                    </div>
                    {/*
                    <div style={style2}>
                        <ControlItem id={0} name='Population Per Square Mile'
                            display='Population Per Square Mile'
                            type= 'range'
                            propMin= {0}
                            propMax= {100}
                            showCriteria={true}
                            handler = {this.propUpdate}
                        />
                    </div>  */}
                    <div style={style2}>
                        <ControlItem id={1}
                            name='rx_rates'
                            display='Include Prescribing Rates?'
                            type= 'toggle'
                            propDefValue={0}
                            showCriteria={false}
                            handler = {this.propUpdate}
                            setDataCall= {this.setDataCall}
                            getDataCall={this.getDataCall}
                        />
                    </div>
						 <div style={style2}>
							 <ControlItem id={4}
											  name='educational_level'
											  display='Your Highest Educational Level'
											  type= 'toggle'
											  propDefValue={0}
											  showCriteria={false}
											  handler = {this.propUpdate}
											  setDataCall= {this.setDataCall}
											  getDataCall={this.getDataCall}
							 />
						 </div>
						 <div style={style2}>
							 <ControlItem id={4}
											  name='current_employment'
											  display='Your Employmnent Status'
											  type= 'toggle'
											  propDefValue={0}
											  showCriteria={false}
											  handler = {this.propUpdate}
											  setDataCall= {this.setDataCall}
											  getDataCall={this.getDataCall}
							 />
						 </div>
                </FormGroup>
                {/*<Panel header={'Result Panel'}>
                        { this.state.showCounties ? resultDisplay : loadDisplay }
                    </Panel>*/}
            
        		<div className="topCopy">
					<Form horizontal>
					<div className="App">
						 <FormGroup bsSize='small' controlId="formControlsSelect">
							  <div style={style2}>
									<ControlItem id={0} name={'Diagnosis'}
										  display={'Diagnosis'}
										  type={'dropdown'}
										  handler={this.propUpdate}
										  showCriteria={true}/>
							  </div>
							 <div style={style2}>
								 <ControlItem id={4}
												  name='educational_level'
												  display='Your Highest Educational Level'
												  type= 'toggle'
												  propDefValue={0}
												  showCriteria={false}
												  handler = {this.propUpdate}
												  setDataCall= {this.setDataCall}
												  getDataCall={this.getDataCall}
								 />
							 </div>
							 <div style={style2}>
								 <ControlItem id={5}
												  name='current_employment'
												  display='Your Employmnent Status'
												  type= 'toggle'
												  propDefValue={0}
												  showCriteria={false}
												  handler = {this.propUpdate}
												  setDataCall= {this.setDataCall}
												  getDataCall={this.getDataCall}
								 />
							 </div>
							 <div style={style2}>
								 <ControlItem id={6}
												  name='ort_sex'
												  display='Sex'
												  type= 'toggle'
												  propDefValue={0}
												  showCriteria={false}
												  handler = {this.propUpdate}
												  setDataCall= {this.setDataCall}
												  getDataCall={this.getDataCall}
								 />
							 </div>
							  <div>
								  <div style={style2}>
									  <ControlItem id={7}
														name='ort_family_history_substance_abuse'
														display='Family History of Substance Abuse'
														type= 'substanceAbuseRadio'
														propDefValue={'None'}
														showCriteria={false}
														handler = {this.propUpdate}
														setDataCall= {this.setDataCall}
														getDataCall={this.getDataCall}
									  />
								  </div>
								  <div style={style2}>
									 <ControlItem id={8}
													  name='ort_Personal_history_substance_abuse'
													  display='Personal History of Substance Abuse'
													  type= 'substanceAbuseRadio'
													  propDefValue={'None'}
													  showCriteria={false}
													  handler = {this.propUpdate}
													  setDataCall= {this.setDataCall}
													  getDataCall={this.getDataCall}
									 />
								  </div>
								  <div style={style2}>
									  <ControlItem id={9}
														name='ort_sexual_abuse'
														display='History of Preadolescent Sexual Abuse'
														type= 'toggle'
														propDefValue={0}
														showCriteria={false}
														handler = {this.propUpdate}
														setDataCall= {this.setDataCall}
														getDataCall={this.getDataCall}
									  />
								  </div>
								  <div style={style2}>
									  <ControlItem id={10}
														name='ort_psychological_disease'
														display='Psychological Disease: i.e. ADD, Bipolor, Schizophrenia, Depression, etc.'
														type= 'toggle'
														propDefValue={0}
														showCriteria={false}
														handler = {this.propUpdate}
														setDataCall= {this.setDataCall}
														getDataCall={this.getDataCall}
									  />
								  </div>
							  </div>
							</FormGroup>
						 {/*<Panel header={'Result Panel'}>
									{ this.state.showCounties ? resultDisplay : loadDisplay }
							  </Panel>*/}
					</div>
					</Form>
				</div>
        );
    }
};