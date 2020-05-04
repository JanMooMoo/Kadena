import React, { Component } from 'react';

class About extends Component {

	
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
				<h1 className = "hopeLabel" style ={{textAlign:"center"}}> About Kadena</h1>
				<h5 className = "hopeLabel" >
				 Kadena is a proof of concept platform on which hospitals could register & exchange vital equipments & form alliance with other hospitals.
				 The goal of Kadena is to strengthen the healthcare system by encouraging collaboration & sharing of resources with each other
				 to help better fight the COVID-19 pandemic & to improve the overall health service one provides. Hospitals could also have access 
				 to unique research and technology, & could reduce cost by borrowing essential equipment to other hospitals for a given time.
				 <br/>
				 <br/>
				 By using Blockchain technology & smart contract. Hospitals could now interact & collaborate with each other 
                 without having too much commitment compared to a traditional merger. Kadena enables hospital parties involved more agility, 
                 flxebility & better opportunity to impact each other to further improve the healthcare system, patient care, supply chain management 
                 all while maintaining costs to the minimum.
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


export default About;