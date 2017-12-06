import React from 'react';
export function log(value) {
    console.log(value);
}
export const flaskHost = 'http://localhost:8080'; //Do Not Include the last backslash!

export class  LoadingBar extends React.Component {
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
