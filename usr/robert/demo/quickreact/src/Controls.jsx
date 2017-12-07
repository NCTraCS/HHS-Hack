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
import {LoadingBar} from './GlobalFunctions';

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        //log(props);

        // NEED TO INITIALIZE STATE
        this.state = ({
            propVal : [{name : 'popsqmile', display:'Population per Square Mile', type:'dropdown', propMin : 0 , propMax: 100}]
        });
}