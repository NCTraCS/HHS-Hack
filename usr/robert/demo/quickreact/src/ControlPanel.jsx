import React from 'react';
import County from './County';
import Criteria from './Criteria';
import Panel from 'react-bootstrap/lib/Panel';
import ControlLabel from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
//import Input from 'react-bootstrap/lib/Input';

import {log} from './GlobalFunctions';
import {LoadingBar} from './GlobalFunctions';

const style = {width: '70%', margin: 50};
const style2 = {width: '30%', margin: 20, float:'left'};

export default class ControlPanel extends React.Component {

    constructor(props) {
        super(props);
        //log(props);

        // NEED TO INITIALIZE STATE
        this.state = ({
            displayType: 0,
            stateList: [],
            counties: [],
            name: this.props.name,
            showCounties: false,
            currentState: 2,
            propVal : [
                    {name : 'popsqmile', display:'Population per Square Mile', type:'range', propMin : 0 , propMax: 100, showCriteria: true},
                    {name : 'rxrate', display:'Include Perscription Rate?', type:'toggle', propValue : false , showCriteria: true}
                    ]
        });

        this.getOptions('state');
        this.getCounties = this.getCounties.bind(this);
        this.propUpdate = this.propUpdate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.toggleCriteria = this.toggleCriteria.bind(this);
        //this.setCurrentState = this.setCurrentState.bind(this);
    }

    getCounties() {
        console.log('GetCounties',this.state.currentState);
        this.setState({showCounties: false, displayType: 1});
        var state = this.state.currentState;
        var Request = require('request');
        if(this.state.propVal[1].propValue === 1) {
            Request.get('http://localhost:5000/cdc/rates/'+state, (error, response, body) => {
                if(error) {
                    return console.log("WHAT ERROR?");
                }
                else {
                    this.setState({counties: JSON.parse(body)});
                    this.setState({showCounties: true});
                }
                console.log('JSON:');
                console.log(JSON.parse(body));
            });
        }
        else {
            Request.get('http://localhost:5000/gaz/'+state, (error, response, body) => {
                if(error) {
                    return console.log("WHAT ERROR?");
                }
                else {
                    this.setState({counties: JSON.parse(body)});
                    this.setState({showCounties: true});
                }
                console.log('JSON:');
                console.log(JSON.parse(body));
             });
        }


        return;
    }


    getOptions(optionType) {
        if ( optionType === 'state' ) {
            var Request = require('request');
            Request.get('http://localhost:5000/st', (error, response, body) => {
                if(error) {
                    return console.log("WHAT ERROR?");
                }
                else {
                    this.setState({stateList: JSON.parse(body)});
                }
                //console.log(JSON.parse(body));
            });
        };

        //console.log(this.state.stateList);
    }
    propUpdate(id, propObj) {
        var tempProps = this.state.propVal;
        tempProps[id] = propObj;
        this.setState({propVal: tempProps});
    }

    handleClick(event) {
        var state=event.target.value;
        this.setState({currentState: state});
        log(state);
        log(this.state.currentState);
        this.getCounties();
    }

    toggleCriteria(event) {
        log(event);
        var propID = event.target.value;
        var propObj = this.state.propVal[propID];
        propObj.setState({showCrtieria: !this.state.propVal[propID].showCriteria});
        if (propObj.state.propType === 'toggle') {
            propObj.setState({propValue: !this.state.propVal[propID].propValue});
        }
    }

    /*drawCriteria(crit) {
        if (crit === 0 && this.state.propVal[crit].showCriteria) {
            return (
                <div style={style2}>
                    <ControlLabel>{this.state.propVal[0]['display']}</ControlLabel>
                    <DynamicRange propHandler={this.propUpdate} propID={0} propDef={this.state.propVal[0]}/>
                </div>
            )
        }
        if (crit === 1 && this.state.propVal[crit].showCriteria) {
            return (
                <div style={style2}>
                    <ControlLabel>{this.state.propVal[1]['display']}</ControlLabel>
                    <ButtonToolbar>
                        <ToggleButtonGroup type="radio" defaultValue={1} name={this.state.propVal[1].name}>
                            <ToggleButton value={0} onChange={this.toggleCriteria}>Yes</ToggleButton>
                            <ToggleButton value={1} onChange={this.toggleCriteria}>No</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                </div>
            )
        }
    }*/
    render() {
        var loadDisplay = (<LoadingBar displayType={this.state.displayType}/>);
        var resultDisplay = (
            <County county_list={this.state.counties} propDef={this.state.propVal}/>
        );
        return (
            <div className="App">
                <div style={style}>
                    <Panel header={'Control Panel'}>
                        <FormGroup bsSize='small' controlId="formControlsSelect">
                            <div style={style2}>
                                <ControlLabel>State Options</ControlLabel>
                                <FormControl defaultValue='Select A State...' componentClass="select" placeholder="select" onChange={this.handleClick} inputRef={ref => {this.input= 'state_select'}}>
                                    <option key='default' disabled={true}>Select A State...</option>
                                        {this.state.stateList.map((item) => <option key={item.state_fips} value={item.state_fips}>{item.usps}</option>)}
                                </FormControl>
                            </div>
                            <div style={style2}>
                                <Criteria id={0} name='Population Per Square Mile'
                                    display='Population Per Square Mile'
                                    type= 'range'
                                    propMin= {0}
                                    propMax= {100}
                                    showCriteria={true}
                                    handler = {this.propUpdate}
                                />
                            </div>
                            <div style={style2}>
                                <Criteria id={1}
                                    name='rx_rates'
                                    display='Include Prescribing Rates?'
                                    type= 'toggle'
                                    propDefValue={1}
                                    showCriteria={true}
                                    handler = {this.propUpdate}
                                />
                            </div>
                            {/*<div style={style2}>
                                <ControlLabel>{this.state.propVal[0]['display']}</ControlLabel>
                                <DynamicRange propHandler = {this.propUpdate} propID={0} propDef={this.state.propVal[0]}/>
                            </div>*/}
                        </FormGroup>
                        {/*<FormGroup bsSize={'small'}>
                            <Button bsize="medium" onClick={this.getCounties.bind(this)}>Find Counties</Button>
                        </FormGroup>*/}
                    </Panel>
                    <Panel header={'Result Panel'}>
                        { this.state.showCounties ? resultDisplay : loadDisplay }
                    </Panel>
                </div>
            </div>
        );
    }
};