import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';

function NotifyApproved(props) {
	return (
		<div className="notify">
			<a href={"https://rinkeby.etherscan.io/tx/" + props.hash} title={props.hash} target="blank">
				<img className="notifyblockie" src={makeBlockie(props.hash)} alt={props.hash} />
			</a>
			<a href={"https://rinkeby.etherscan.io/tx/" + props.hash} title={props.hash} target = "blank" className="notifyHeader">Registration Approved</a> 
            <p className="mt-1">Congratulation! Your hospital "{props.hospital}" is now a member of Kadena.</p>
		</div>
	);
}

export default NotifyApproved;