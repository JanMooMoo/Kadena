import React from 'react';
import {Link} from 'react-router-dom';

function AdminOnly() {
	return (
		<div className="mt-5 text-center">
			<p className="emoji"><span role="img" aria-label="biohazard">☣️</span></p>
			<h3 className="Pending mt-1">Warning!</h3>
			<h3 className="Pending" >Authorized Personnel Only.</h3>
	
			<Link to="/">Go Back</Link>
		</div>
	);
}

export default AdminOnly;