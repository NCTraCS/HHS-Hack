import React from 'react';
import County from './County';
import DynamicRange from './DynamicRange'
import ControlLabel from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
//import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import {log} from './GlobalFunctions';

const style = {width: 400, margin: 50};

export default class ControlPanel extends React.Component {

    constructor(props) {
        super(props);
        //log(props);

        // NEED TO INITIALIZE STATE
        this.state = ({
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
        this.setState({currentState: event.target.value});
        log(event.target.value);
        log(this.state.currentState);
    }

    componentWillMount(){

    }

    render() {

        var resultDisplay = (
            <County county_list={this.state.counties} propMin={this.state.prop1[0]} propMax={this.state.prop1[1]}/>
        );
        return (
            <div className="App">
                <div style={style}>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>State Options</ControlLabel>
                        <FormControl componentClass="select" placeholder="select"  onChange={this.handleClick} inputRef={ref => {this.input= 'state_select'}}>
                                {this.state.stateList.map((item) => <option key={item.state_fips} value={item.state_fips}>{item.usps}</option>)}
                        </FormControl>
                        <ControlLabel>Pop/SqMil Range</ControlLabel>
                        <DynamicRange propHandler = {this.propUpdate} propName='prop1'/>
                        <Button bsize="medium" onClick={this.getCounties.bind(this)}>Find Counties</Button>
                    </FormGroup>
                </div>
                { this.state.showCounties ? resultDisplay : null }
            </div>
        );
    }
};