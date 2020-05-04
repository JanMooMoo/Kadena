import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';

function NotifyTake(props) {
	return (
		<div className="notify">
			<a href={"https://rinkeby.etherscan.io/tx/" + props.hash} title={props.hash} target="blank">
				<img className="notifyblockie" src={makeBlockie(props.hash)} alt={props.hash} />
			</a>
            <a href={"https://rinkeby.etherscan.io/tx/" + props.hash} title={props.hash} target = "blank" className="notifyHeader">Take Successful!</a> 
            <p className="mt-1">You have taken {props.received} {props.item} from {props.sender}.</p>
		</div>
	);
}

export default NotifyTake;