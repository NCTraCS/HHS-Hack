import React from 'react';
import Result from './Results';
import { Panel, Well, Grid, Row, Col } from 'react-bootstrap';
import {ButtonToolbar, ButtonGroup, Button, ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import { Nav, Navbar, NavItem, NavbarHeader } from 'react-bootstrap';
import {LoadingBar} from './GlobalFunctions';

export default class ResultPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            displayType: 0,
            dataCallId: this.props.dataCallId,
            counties: [],
            name: this.props.name,
            showResults: false,
            currentState: 2,
            propVal: this.props.propConstraints,
            data: this.props.data,
            resultPanelStatus: [true, false, false, false, false, false, false]
        });
        console.log('Result Panel:', this.state.propVal);
        this.getAppState = this.props.callbacks.getAppState;
        this.resultCallbacks = {};
        this.menuSelect= this.menuSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.dataCallId !== nextProps.dataCallId && nextProps.dataCallId !== undefined){
            this.setState({ dataCallId: nextProps.dataCallId});
        }
        if(this.state.data !== nextProps.data && nextProps.data !== undefined){
            this.setState({ data: nextProps.data});
        }
        if(this.state.propVal !== nextProps.propVal && nextProps.propVal !== undefined){
            this.setState({ propVal: nextProps.propVal});
        }
    }
    menuSelect(selectedKey) {
        var resultId = selectedKey;
        console.log('Event Result Id: ', resultId);
        var currentStatus = [];
        for(var i=0; i<this.state.resultPanelStatus.length; i++){
            if(i === resultId) {
                console.log('Its True');
                currentStatus[i] = true;
            }
            else {
                currentStatus[i] = false;
            }
        }
        this.setState({resultPanelStatus: currentStatus});
        console.log('showResult resultStatus: ', this.state.resultPanelStatus);
    }
    render() {
        var loadDisplay = 'Loading';/*(<LoadingBar displayType={this.state.displayType}/>)*/
        console.log('Result Panel render Prop Val: ',this.state.propVal);
        var resultDisplay = (
            <Result data={this.state.data} propConstraints={this.state.propVal} resultPanelStatus={this.state.resultPanelStatus}/>
        );
        return (
            <div>
                <Row>
<<<<<<< HEAD
                    <Col xs={3}>
=======
                    <Col xs={4}>
>>>>>>> 98d712bbf1fe3f076aed4b8406ca0759af507f6f
                        <ButtonToolbar>
                            <ToggleButtonGroup vertical type="radio" defaultValue={0} name={'Result Sidebar'} onChange={this.menuSelect}>
                                <ToggleButton value={0}>Overall Risk</ToggleButton>
                                <ToggleButton value={1}>Education</ToggleButton>
                                <ToggleButton value={2}>Employment</ToggleButton>
                                <ToggleButton value={3}>Opioid Related Death per Capita</ToggleButton>
                                <ToggleButton value={4}>Opioid Related Discharges per Capita</ToggleButton>
                                <ToggleButton value={5}>Opiod Risk Tool</ToggleButton>
                                <ToggleButton value={6}>Diagnosis Impact</ToggleButton>
                                <ToggleButton value={7}>Procedure Impact</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                        {/*
                        <Navbar fixedTop collapseOnSelect>
                            <Navbar.Collapse>
                                <Nav stacked activeKey={0} onSelect={this.menuSelect}>
                                    <NavItem eventKey={0} href="/">One</NavItem>
                                    <NavItem eventKey={1} href="/">Two</NavItem>
                                    <NavItem eventKey={2} href="/">Three</NavItem>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>*/}
                    </Col>
                    <Col xs={7}>
                        <Well>
                            {resultDisplay}
                        </Well>
                    </Col>
                </Row>

            </div>
        )
    }
