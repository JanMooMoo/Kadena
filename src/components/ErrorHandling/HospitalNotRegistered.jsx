import React from 'react';
import { Link } from 'react-router-dom';


function HospitalNotRegistered() {
	return (
		<div className="mt-5 text-center">
			<h3 className="mt-5">Hospital Not Registered!</h3>
			<p className="emoji"><span role="img" aria-label="biohazard">☣️</span></p>
			<Link to="/register">You can request registration here.</Link>
		</div>
	);
}

export default HospitalNotRegistered;