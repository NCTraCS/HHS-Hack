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
            coDxList: []
        });
        this.getOptions('coDx');

        this.setDataCall = this.props.setDataCall;
        this.getDataCall = this.props.getDataCall;
        this.toggleCriteria = this.toggleCriteria.bind(this);

        this.handleClick = this.handleClick.bind(this);

        this.radioSubstanceAbuseCriteria = this.radioSubstanceAbuseCriteria.bind(this);

        this.propUpdate = this.props.handler;
        this.drawOptions = this.drawOptions.bind(this);
        //this.getOptions = this.getOptions.bind(this);
    }

    getOptions(optionType) {
        var options = [];
        console.log('Option Type: ', optionType);
        if ( optionType === 'coDx' ) {
            var Request = require('request');
            //console.log(flaskHost+'/st');
            Request.get(flaskHost+'/co_occur_list', (error, response, body) => {
                //console.log('HERE');
                if(error) {
                    return console.log("WHAT ERROR?");
                }
                else {
                    console.log('Call Made:', JSON.parse(body));
                    options = JSON.parse(body);
                    for(var i = 0; i<options.length; i++){
                        options[i].key = i;
                    }
                    this.setState({coDxList: options});
                    return options;
                }
            });
        };
    }

    drawOptions(optionType, dataCallId) {
        if(optionType === 'coDx') {
            var options = this.state.coDxList;
            console.log('drawOptions: ', options);
            return options.map((item, idx) => <option key={idx} value={dataCallId}>{item.co_dx}</option>);
        }
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
						  <ToggleButton value={1} onChange={this.toggleCriteria}>Yes</ToggleButton>
						  <ToggleButton value={0} onChange={this.toggleCriteria}>No</ToggleButton>
					  </ToggleButtonGroup>
				  </ButtonToolbar>
			  )
		  }
		  else if (this.state.type === 'substanceAbuseRadio') {
			  return (
				  <ButtonToolbar>
					  <ToggleButtonGroup id={this.props.id} type="checkbox" defaultValue={this.props.propDefValue} name={this.state.name}>
						  <ToggleButton value={"Alcohol"} onChange={this.radioSubstanceAbuseCriteria}>Alcohol</ToggleButton>
						  <ToggleButton value={"Illegal Drugs"} onChange={this.radioSubstanceAbuseCriteria}>Illegal Drugs</ToggleButton>
						  <ToggleButton value={"Rx Drugs"} onChange={this.radioSubstanceAbuseCriteria}>Rx Drugs</ToggleButton>
					  </ToggleButtonGroup>
				  </ButtonToolbar>
			  )
		  }
        else if (this.state.type ==='dropdown') {
            return (
                <FormGroup>
                    <FormControl defaultValue='Select A Value...' componentClass="select" placeholder="select" onChange={this.handleClick} inputRef={ref => {this.input= 'drop_select'}}>
                        <option key='default' disabled={true}>Select A Value...</option>
                        {this.drawOptions('coDx',1)}
                    </FormControl>
                </FormGroup>
            )
        }
    }

    handleClick(event) {
        let opt=[{key: 'id_county', value: 'orange'}];
        let call=event.target.value;
        this.setState({currentOption: call});
        //log(state);
        console.log(event.target.value);
        var dataCallConfig = {dataCallId: call, params: opt};
        console.log('HandleClick: Data Call Config:', dataCallConfig);
        this.setDataCall(dataCallConfig);
        return;
    }

	toggleCriteria(event) {
		log(event);
		var propValue = event.target.value;
		var returnObj = {showCriteria: !this.state.showCriteria, propValue: propValue};
		this.setState({showCriteria: !this.state.showCriteria});
		this.setState({propValue: propValue});
		this.propUpdate(this.state.id, returnObj);
		if(propValue === '1') {
			var params = [];
			var currDataConfig = this.getDataCall();
			console.log('Toggle Crit Data Config: ', currDataConfig);
			if(currDataConfig['params'].length > 0)
				params = currDataConfig['params'];
			this.setDataCall({dataCallId: '2', params: params});
		}
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
			var params = [];
			var currDataConfig = this.getDataCall();
			console.log('Toggle Crit Data Config: ', currDataConfig);
			if(currDataConfig['params'].length > 0)
				params = currDataConfig['params'];
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