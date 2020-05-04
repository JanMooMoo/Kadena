import React from 'react';

function NotifyError(props) {
	return (
		<div className="notify">			
            <p className="emoji2"><span role="img" aria-label="sweat">😓</span></p>
			<p>Transaction failed, Please try again.</p>
		</div>
	);
}

export default NotifyError;