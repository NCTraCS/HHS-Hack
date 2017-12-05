import React, { Component } from 'react';

class Home extends Component {
	render() {
		return(
			<div>
				<header className="App-header">
      				<h1 className="App-title">This is Home</h1>
      			</header>
      			<p>...understanding risk of opioid misuse, see: <a href="/" onClick={(e)=>{this.props.setPage(1);e.preventDefault();return(false);}} >My Risk</a></p>
      			<p>...seeking resource to help prevent opioid misuse, see: <a href="/" onClick={(e)=>{this.props.setPage(2);e.preventDefault();return(false);}} >Resources</a></p>
      			<p>...want to collaborate with us?, see: <a href="/" onClick={(e)=>{this.props.setPage(3);e.preventDefault();return(false);}} >Collaborate</a></p>
      		</div>
      );
	}
}

export default Home;