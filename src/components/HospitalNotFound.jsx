import React from 'react';

function HospitalNotFound() {
	return (
		<div className="mt-5 text-center">
			<h3 className="mt-5">Hospital Not Found!</h3>
			<p className="emoji"><span role="img" aria-label="biohazard">☣️</span></p>
			<p>Please make sure you entered the correct url.</p>
		</div>
	);
}

export default HospitalNotFound;