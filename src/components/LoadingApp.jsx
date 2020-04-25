import React from 'react';

function LoadingApp() {
	return (
		<div className="mt-5 text-center">
				<img className="center mb-3 mt-3" src="/images/Corona/Hope.jpg" />
				<div className = "centerLabel">
				<h5 className = "hopeLabel" style ={{textAlign:"center"}}> "Hope" By Nelly Baksht</h5>
				</div>
			<h3 className="mt-1">We are loading our app!</h3>
			<p className="mt-1">Fetching Blockchain Data.....</p>
		</div>
	);
}

export default LoadingApp;
