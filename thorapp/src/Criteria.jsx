import React from 'react';
import ControlLabel from 'react-bootstrap/lib/Form';
import {ButtonToolbar, ButtonGroup, Button, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import DynamicRange from './DynamicRange';
import {log} from './GlobalFunctions';

const style = {width: '70%', margin: 50};
const style2 = {width: '30%', margin: 20, float:'left'};

export default class Criteria extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            id: this.props.id,
            name: this.props.name,
            display: this.props.display,
            type: this.props.type,
            propMin: this.props.propMin,
            propMax: this.props.propMax,
            propDefValue: this.props.propDefValue,
            showCriteria: this.props.showCriteria
        });
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
                <ToggleButtonGroup type="radio" defaultValue={this.props.propDefValue} name={this.state.name}>
                    <ToggleButton value={0} onChange={this.toggleCriteria}>Yes</ToggleButton>
                    <ToggleButton value={1} onChange={this.toggleCriteria}>No</ToggleButton>
                </ToggleButtonGroup>
            </ButtonToolbar>
            )
        }
    }

    toggleCriteria(event) {
        log(event);
        /*var propID = event.target.value;
        var propObj = this.state.propVal[propID];
        propObj.setState({showCrtieria: !this.state.propVal[propID].showCriteria});
        if (propObj.state.propType === 'toggle') {
            propObj.setState({propValue: !this.state.propVal[propID].propValue});
        }*/
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