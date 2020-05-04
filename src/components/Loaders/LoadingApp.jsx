import React from 'react';

function LoadingApp() {
	return (
		<div className="mt-5 text-center">
			
			<div className="home-wrapper">
			
				<div className = "centerLabel">
				<p className="mt-1 Pending">Web3 Detected! Please Make Sure You are on Rinkeby Network to Continue.</p>

				<h1 className = "hopeLabel" style ={{textAlign:"center"}}>Loading App!</h1>
				<h5 className = "hopeLabel" >
				 Kadena is a proof of concept platform on which hospitals could register & exchange vital equipments & form alliance with other hospitals.
				 The goal of Kadena is to strengthen the healthcare system by encouraging collaboration & sharing of resources with each other
				 to help better fight the COVID-19 pandemic & to improve the overall health service one provides. Hospitals could also have access 
				 to unique research and technology, & could reduce cost by borrowing essential equipment to other hospitals for a given time.
				 <br/>
				</h5>
				</div>
				<p className="mt-1 Pending">Fetching Blockchain Data.....</p>
				<hr />
				
			</div>
	
			<p style ={{textAlign:"center"}}><i class="fas fa-info-circle"></i> Data & information displayed in this site are mock data. It does not represent any real entity or organization. </p>

		</div>
	);
}

export default LoadingApp;
