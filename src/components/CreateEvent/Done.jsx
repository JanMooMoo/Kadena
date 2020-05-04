import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Done extends Component {

createNewEvent=()=>{
	this.props.createNewEvent()
}

render(){
	return (
	
		<div className="mt-5 text-center done">
			<h3 className="mt-5">Done, your data has been uploaded!</h3>
			<img src='/images/hospital.png'  className="uploadError" alt="hospital"></img>
			<p>We will notify you as soon as the transaction has been confirmed.</p>
			<Link to="/register" onClick={this.createNewEvent}>Back to Registration.</Link>
		</div>

	);
}
}
export default Done;
