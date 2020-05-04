import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';
import { Link } from 'react-router-dom';

function NotifyLendAHand(props) {
	let rawTitle = props.title;
      var titleRemovedSpaces = rawTitle;
	  titleRemovedSpaces = titleRemovedSpaces.replace(/ /g, '-');

      var pagetitle = titleRemovedSpaces.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');

	  let titleURL = "/give/"+pagetitle+"/" + props.eventId;
	return (
		<div className="notify">
			<a href={"https://rinkeby.etherscan.io/tx/" + props.hash} title={props.hash} target = "blank">
				<img src={makeBlockie(props.hash)} alt={props.hash} />
			</a>
			<a href={"https://rinkeby.etherscan.io/tx/" + props.hash} title={props.hash} target = "blank" className="notifyHeader">Lend a hand success!</a>
            <p className="mt-1">You are willing to lend {props.amount} {props.item}.</p>
            <Link to={titleURL}><p> Check it out here</p></Link>
		</div>
	);
}

export default NotifyLendAHand;