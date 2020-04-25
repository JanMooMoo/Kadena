import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';

function NotifyRequest(props) {
	return (
		<div className="notify">
			<a href={"https://rinkeby.etherscan.io/tx/" + props.hash} title={props.hash} target="blank">
				<img className="notifyblockie" src={makeBlockie(props.hash)} alt={props.hash} />
			</a>
			<a href={"https://rinkeby.etherscan.io/tx/" + props.hash} title={props.hash} target = "blank" className="notifyHeader">Registration Request</a> 
            <p className="mt-1">Your registration request as has been sent & will be under review.</p>
		</div>
	);
}

export default NotifyRequest;