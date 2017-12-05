import React from 'react';
import County from './County';
import ControlItem from './ControlItem';
import Panel from 'react-bootstrap/lib/Panel';
import ControlLabel from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
//import Input from 'react-bootstrap/lib/Input';
import {log} from './GlobalFunctions';
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
            propVal : [
                    {name : 'popsqmile', display:'Population per Square Mile', type:'range', propMin : 0 , propMax: 100, showCriteria: true},
                    {name : 'rxrate', display:'Include Perscription Rate?', type:'toggle', propDefValue: 1, propValue : false, showCriteria: false}
                    ]
        });
        this.getOptions('state');
        this.drawOptions = this.drawOptions.bind(this);
        //this.getOptions = this.props.callbacks.getOptions;
        this.getCounties = this.props.callbacks.getCounties;
        this.setPropConstraints = this.props.callbacks.setPropConstraints;
        this.setPropConstraints(this.state.propVal);
        this.propUpdate = this.propUpdate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.toggleCriteria = this.toggleCriteria.bind(this);
        //this.setCurrentState = this.setCurrentState.bind(this);

        console.log('State List:',this.state.stateList);
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

    getOptions(optionType) {
        var options = [];
        if ( optionType === 'state' ) {
            console.log('Call Made:', optionType);
            var Request = require('request');
            console.log(flaskHost+'/st');
            Request.get(flaskHost+'/st', (error, response, body) => {
                console.log('HERE');
                if(error) {
                    return console.log("WHAT ERROR?");
                }
                else {
                    console.log('Call Made:', JSON.parse(body));
                    options = JSON.parse(body);
                    this.setState({stateList: options});
                    return;
                }
            });
        };
        //console.log(this.state.stateList);
    }
    toggleCriteria(event) {
        log(event);
        var propID = event.target.id;
        var newVal = event.target.value;
        var tempProps = this.state.propVal;
        var tempProp = tempProp[propID];
        tempProp.showCriteria = !tempProp.showCriteria;
        if (tempProp.propType === 'toggle') {
            if(tempProp.showCriteria) {
                tempProp.propValue = newVal;
            }
        }
        tempProps[propID] = tempProp;
        this.setState({propVal: tempProps});
        if(this.state.showCounties){
            return this.getCounties;
        }
    }

    handleClick(event) {
        let opt=event.target.value;
        this.setState({currentOption: opt});
        //log(state);
        //log(this.state.currentState);
        this.getCounties(opt);
        return;
    }

    drawOptions(optionType) {
        return this.state.stateList.map((item) => <option key={item.state_fips} value={item.state_fips}>{item.usps}</option>);
    }

    render() {
        return (
            <div className="App">
                <FormGroup bsSize='small' controlId="formControlsSelect">
                    <div style={style2}>
                        <ControlLabel>State Options</ControlLabel>
                        <FormControl defaultValue='Select A State...' componentClass="select" placeholder="select" onChange={this.handleClick} inputRef={ref => {this.input= 'state_select'}}>
                            <option key='default' disabled={true}>Select A State...</option>
                            {this.drawOptions('state')}
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
                {/*<Panel header={'Result Panel'}>
                        { this.state.showCounties ? resultDisplay : loadDisplay }
                    </Panel>*/}
            </div>
        );
    }
};