
import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class Error extends Component {

createNewEvent=()=>{
	this.props.createNewEvent()

}
render(){
	return (
					
		<div className="mt-3 text-center">
			
			<h3 className="mt-5">Error Uploading Your Data</h3>
			<div>
			<img src='/images/ethereum.png'  className="uploadError" alt="Upload Error"></img>
			</div>
			<p>Something went wrong! <Link to="/register" onClick={this.createNewEvent}>Please try Again.</Link></p>
			<code>{this.props.message}</code>
	
		</div>
	);
}
}
export default Error;
