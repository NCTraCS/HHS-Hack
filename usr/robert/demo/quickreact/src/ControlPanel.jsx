import React from 'react';
import County from './County';
import DynamicRange from './DynamicRange'
import Panel from 'react-bootstrap/lib/Panel';
import ControlLabel from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
//import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import {log} from './GlobalFunctions';

const style = {width: 400, margin: 50};
const style2 = {marginTop:20, marginBottom:20};

class  LoadingExample3 extends React.Component {
    constructor(props) {
        super(props);
        log(this.props);
        log(this.props.displayType);
        // NEED TO INITIALIZE STATE
        this.state = ({message0: 'Please Select a State',
        message1 : 'Loading...'});
    }
    getMessage() {
        console.log('DisplayType:',this.props.displayType);
        if (this.props.displayType === 1) {
            log('Loading..');
            this.setState({message: 'Loading...'});
        }
    }
    render() {
        {this.getMessage};
        return (
            <div>
                <div>{this.props.displayType===0 ? this.state.message0 : this.state.message1}</div>
            </div>
        )
    }
};

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
            prop1 : []
        });

        this.getOptions('state');
        this.getCounties = this.getCounties.bind(this);
        this.propUpdate = this.propUpdate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        //this.setCurrentState = this.setCurrentState.bind(this);
    }

    getCounties() {
        console.log('GetCounties',this.state.currentState);
        this.setState({showCounties: false, displayType: 1});
        var state = this.state.currentState;
        var Request = require('request');
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
    propUpdate(min, max) {
        this.setState({prop1:[min, max]});
    }

    handleClick(event) {
        var state=event.target.value;
        this.setState({currentState: state});
        log(state);
        log(this.state.currentState);
        this.getCounties();
    }

    render() {
        var loadDisplay = (<LoadingExample3 displayType={this.state.displayType}/>);
        var resultDisplay = (
            <County county_list={this.state.counties} propMin={this.state.prop1[0]} propMax={this.state.prop1[1]}/>
        );

        return (
            <div className="App">
                <div style={style}>
                    <Panel header={'Control Panel'}>
                        <FormGroup bsSize='small' controlId="formControlsSelect">
                            <ControlLabel>State Options</ControlLabel>
                            <div style={style2}>
                                <FormControl defaultValue='Select A State...' componentClass="select" placeholder="select" onChange={this.handleClick} inputRef={ref => {this.input= 'state_select'}}>
                                    <option key='default' disabled={true}>Select A State...</option>
                                        {this.state.stateList.map((item) => <option key={item.state_fips} value={item.state_fips}>{item.usps}</option>)}
                                </FormControl>
                            </div>
                            <div style={style2}>
                                <ControlLabel>Pop/SqMil Range</ControlLabel>
                                <DynamicRange propHandler = {this.propUpdate} propName='prop1'/>
                            </div>
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