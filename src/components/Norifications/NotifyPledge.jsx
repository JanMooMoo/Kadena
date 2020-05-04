import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';

function NotifyPledge(props) {
	return (
		<div className="notify">
			<a href={"https://rinkeby.etherscan.io/tx/" + props.hash} title={props.hash} target="blank">
				<img className="notifyblockie" src={makeBlockie(props.hash)} alt={props.hash} />
			</a>
            <a href={"https://rinkeby.etherscan.io/tx/" + props.hash} title={props.hash} target = "blank" className="notifyHeader">Pledge Successful!</a> 
            <p className="mt-1">You have pledged {props.committed} {props.item} to {props.receiver}.</p>
		</div>
	);
}

export default NotifyPledge;