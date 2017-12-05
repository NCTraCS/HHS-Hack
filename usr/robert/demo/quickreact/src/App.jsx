import React from 'react';
import './App.css';
import ControlPanel from './ControlPanel';
import {log} from './GlobalFunctions';

class App extends React.Component {

	constructor(props) {
		super(props);
		log(props);
        this.state = ({name: this.props.name});
	}

    render() {

	    return (
	      <div className="App">
	      	<h1>County Demo ({this.state.name})</h1>
                <ControlPanel />
	      </div>

	    );
	  }
}

export default App;
