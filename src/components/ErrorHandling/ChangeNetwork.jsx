import React, { Component } from 'react';

class ChangeNetwork extends Component {

	constructor(props) {
		super(props);
		this.state = {
		   collection:[],
		}
	}
	render() {
			
		return(
			<div className="home-wrapper">
			
				<div className = "centerLabel">
				<h1 className = "hopeLabel" style ={{textAlign:"center"}}> Wrong Network</h1>
				<h5 className = "hopeLabel" >
                 <img className="center mb-3 mt-3" src="/images/WrongNetwork.png" alt="Change Network"/>
                 Please Change Your Metamask Network To Rinkbey Network
				 <br/>
				 <br/>
				 

				</h5>
				</div>
				<hr />
				<p style ={{textAlign:"center"}}><i class="fas fa-info-circle"></i> Data & information displayed in this site are mock data. It does not represent any real entity or organization. </p>
				
			</div>
		);
	}

}


export default ChangeNetwork;
