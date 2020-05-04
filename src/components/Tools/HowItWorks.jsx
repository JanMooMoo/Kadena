import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HowItWorks extends Component {

	render() {
		
		return(
			<div className="home-wrapper">
			
				<div className = "centerLabel">
				<h1 className = "hopeLabel" style ={{textAlign:"center"}}> How it Works?</h1>
				<h5 className = "hopeLabel" >
				 1. To be able to use kadena, a hospital should request a <Link to ="/register">registration</Link>, once approve by the admin. you will be able to interact with other hospitals.  
               
				 <br/>
				 <br/>
				
				 2. There are 4 core function that you could do on Kadena.
                 <br/>
				 <br/>
                 <p style ={{textAlign:"center"}} className="Pending mt-2">*Pledge - You can use Pledge to help & fill in other hospitals need.</p>
                 <div style ={{textAlign:"center"}} className="Registered mt-2">*Take - You can use Take to get items from a current pool given by other hospitals.</div>
                 <div style ={{textAlign:"center"}} className="Pending mt-2">*Call For Help - You can Call For Help to post specific items that you need or lack for the time being so other hospitals that has extra items could help you.</div>
                 <div style ={{textAlign:"center"}} className="Registered mt-2">*Lend A Hand - You can Lend A Hand to post items that you are willing to give/lend for the time being so other hospital that needed it the most could use it.</div>

				 <br/>
				 <br/>
                 3. Hospital Profile - You could see the hospital profile & activities of other members of Kadena.
				 <div style ={{textAlign:"center"}} className="Black mt-2"></div>
                 <br/>
                 4. Hospital Rating -  Once approved, you will be given a hospital rating of 35. Hospital rating neds to be maintained to be able to perform certain function in Kedena.
                 <div style ={{textAlign:"center"}} className="Pending mt-4">*Take - A hospital should have a rating greater than 10 to take items from the pool</div>
                 <div style ={{textAlign:"center"}} className="Pending mt-2">*Call For Help - A hospital should have a rating greater than 20 to be able to post items that they need.</div>
                 <br/>
                 5. Rating(+-) -  When a hospital perform a function their rating will increase or decrease depending on the type of function that they made.
                 <div style ={{textAlign:"center"}} className="Unregistered mt-4">*Take: (-3 on Hospital Rating)</div>
                 <div style ={{textAlign:"center"}} className="Unregistered mt-4">*Call For Help: (-5 on Hospital Rating)</div>
                 <div style ={{textAlign:"center"}} className="Registered mt-4">*Pledge: (+3 on Hospital Rating)</div>
                 <div style ={{textAlign:"center"}} className="Registered mt-4">*Lend A Hand: (+5 on Hospital Rating)</div>

				</h5>
				</div>
				<hr />
				<p style ={{textAlign:"center"}}><i class="fas fa-info-circle"></i> Data & information displayed in this site are mock data. It does not represent any real entity or organization. </p>
				
			</div>
		);
	}

}


export default HowItWorks;