import React, { Component } from 'react';


class Home extends Component {

	
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
				<h1 className = "hopeLabel" style ={{textAlign:"center"}}> How it Works?</h1>
				<h5 className = "hopeLabel" >
				 Kadena is a proof of concept platform on which hospitals could register & exchange vital equipments & form alliance with other hospitals.
				 The goal of Kadena is to strengthen the healthcare system by encouraging collaboration & sharing of resources with each other
				 to help better fight the COVID-19 pandemic & to improve the overall health service one provides. Hospitals could also have access 
				 to unique research and technology, & could reduce cost by borrowing essential equipment to other hospitals for a given time.
				 <br/>
				 <br/>
				 By using Blockchain technology & smart contract. A hospital could request a registration 
				 & will be reviewed by the contract creator that acts like as an administrator to filter out bad actors.
				 Once approve, an account will be given a rating of "35",it will act as a credit to perfom certain task.
				 <br/>
				 <br/>
				 There are 4 core function that you could do on Kadena.
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


export default Home;
