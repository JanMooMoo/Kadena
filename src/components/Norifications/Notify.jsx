import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';

function Notify(props) {
	return (
		<div className="notify">
			<a href={"https://rinkeby.etherscan.io/tx/" + props.hash} title={props.hash} target="blank">
				<img src={makeBlockie(props.hash)} alt={props.hash} />
			</a>
			<a href={"https://rinkeby.etherscan.io/tx/" + props.hash} title={props.hash} target = "blank" className="notifyHeader"> Transaction sent!</a> <span role="img" aria-labelledby="rocket">{props.tx}</span>
			<p className="mt-2">You will be notified once confirmed.</p>
		</div>
	);
}

export default Notify;
