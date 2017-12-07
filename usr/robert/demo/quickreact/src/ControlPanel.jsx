import React from 'react';
import County from './County';
import ControlItem from './ControlItem';
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
                    {name : 'rxrate', display:'Include Perscription Rate?', type:'toggle', propDefValue: 1, propValue : false, showCriteria: false}
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
        console.log('GetCounties',this.state.propVal[1].propValue);
        this.setState({showCounties: false, displayType: 1});
        var state = this.state.currentState;
        var Request = require('request');
        if(this.state.propVal[1].propValue === '1') {
            console.log('I Got Here!');
            Request.get('http://localhost:8443/cdc/rates/'+state, (error, response, body) => {
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
            Request.get('http://localhost:8443/gaz/'+state, (error, response, body) => {
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
            Request.get('http://localhost:8443/st', (error, response, body) => {
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
        console.log('Property ID:', id);
        var tempProps = this.state.propVal;
        var tempProp = tempProps[id];
        console.log(propObj);
        Object.keys(propObj).forEach(function(key) {
            console.log('Property Obj Val:', propObj[key]);
            tempProp[key] = propObj[key];
            console.log('Object Key:', key);
            console.log('Object Value:', propObj[key]);
        });
        tempProps[id] = tempProp;
        console.log('Temp Prop:', tempProp);
        console.log('Temp Props:', tempProps[id]);
        this.setState({propVal: tempProps});
        console.log('New State:', this.state.propVal);
    }

    toggleCriteria(event) {
        log(event);
        var propID = event.target.id;
        var newVal = event.target.value;
        var tempProps = this.state.propVal;
        var tempProp = tempProp[propID];
        tempProp['showCriteria'] = !tempProp['showCriteria'];
        if (tempProp['propType'] === 'toggle') {
            if(tempProp['showCriteria']) {
                tempProp['propValue'] = newVal;
            }
        }
        tempProps[propID] = tempProp;
        this.setState({propVal: tempProps});
        if(this.state.showCounties){
            this.getCounties();
        }
    }

    handleClick(event) {
        var state=event.target.value;
        this.setState({currentState: state});
        //log(state);
        //log(this.state.currentState);
        this.getCounties();
    }

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
                                <ControlItem id={0} name='Population Per Square Mile'
                                    display='Population Per Square Mile'
                                    type= 'range'
                                    propMin= {0}
                                    propMax= {100}
                                    showCriteria={true}
                                    handler = {this.propUpdate}
                                />
                            </div>
                            <div style={style2}>
                                <ControlItem id={1}
                                    name='rx_rates'
                                    display='Include Prescribing Rates?'
                                    type= 'toggle'
                                    propDefValue={0}
                                    showCriteria={false}
                                    handler = {this.propUpdate}
                                />
                            </div>
                        </FormGroup>
                    </Panel>
                    <Panel header={'Result Panel'}>
                        { this.state.showCounties ? resultDisplay : loadDisplay }
                    </Panel>
                </div>
            </div>
        );
    }
};