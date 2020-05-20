import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ipfs from '../../utils/ipfs';

import Loading from '../Loaders/Loading';
import {ModalTake} from '../Modals/ModalTake'

let numeral = require('numeral');


class EventGive extends Component {
    constructor(props, context) {
		

        super(props);
		this.contracts = context.drizzle.contracts;
		this.event = this.contracts['Kadena'].methods.provideAssistanceDetails.cacheCall(this.props.id);
		this.hospital = this.contracts['Kadena'].methods.getHospitalStatus.cacheCall(this.props.owner);

		this.account = this.props.accounts[0];
		this.state = {
			loading: false,
			loaded: false,
			description: null,
			image: null,
			ipfs_problem: false,
			locations:null,
			
			pledgeModalShow:false
		};
		this.isCancelled = false;
	}



	updateIPFS = () => {

		if (this.state.loaded === false && this.state.loading === false && typeof this.props.contracts['Kadena'].provideAssistanceDetails[this.event] !== 'undefined') {
			this.setState({
				loading: true
			}, () => {
				 ipfs.get(this.props.ipfs).then((file) => {
					let data = JSON.parse(file[0].content.toString());
					if (!this.isCancelled) {
						this.setState({
							loading: false,
							loaded: true,
							description: data.remarks,
							image: data.image,
							locations:data.location
						});
					}
				}).catch(() => {
					if (!this.isCancelled) {
						this.setState({
							loading: false,
							loaded: true,
							ipfs_problem: true
						});
					}
				});
			});

		}

	}


	getImage = () => {
		let image = '/images/loading_ipfs.png';
		if (this.state.ipfs_problem) image = '/images/problem_ipfs.png';
		if (this.state.image !== null) image = this.state.image;
		return image;
	}

	getDescription = () => {
		let description = <Loading />;
		if (this.state.ipfs_problem) description = <p className="text-center mb-0 event-description"><span role="img" aria-label="monkey">🙊</span>We can not load description</p>;
		if (this.state.description !== null) {
			let text = this.state.description.length > 30 ? this.state.description.slice(0, 65) + '...' : this.state.description;
			description = <strong>{text}</strong>;
			
		}
		return description;
	}

	 render() {
		
		let body = <div className="card"><div className="card-body"><Loading /></div></div>;

		if (typeof this.props.contracts['Kadena'].provideAssistanceDetails[this.event] !== 'undefined' && this.props.contracts['Kadena'].provideAssistanceDetails[this.event].value) {
			
			let pledgeModalClose = () =>this.setState({pledgeModalShow:false});
			
			let hospital = '';
			if(typeof this.props.contracts['Kadena'].getHospitalStatus[this.hospital] !== 'undefined'){
				hospital = this.props.contracts['Kadena'].getHospitalStatus[this.hospital].value;
			}
			let event_data = this.props.contracts['Kadena'].provideAssistanceDetails[this.event].value;

			let image = this.getImage();
			let description = this.getDescription();
	
			let disabled = false;
			let buttonText =<span><span role="img" aria-label="alert"> </span> Take</span>;
			let percentage = numeral(event_data.committed*100/event_data.amount).format('0.00')+ "%";


			if (event_data[3] !=='undefined'){

			let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
			
			let enddate = new Date(parseInt(event_data.endDate, 10) * 1000);
			let end_date = months[enddate.getMonth()]+ ". " + enddate.getDate() + ", " + enddate.getFullYear()


			if (Number(event_data.committed) === 0) {
				disabled = true;
				buttonText = <span><span role="img" aria-label="alert"> </span> None Left</span>;
			}
	
	  //Friendly URL Title
	  let rawTitle = event_data.title;
      var titleRemovedSpaces = rawTitle;
	  titleRemovedSpaces = titleRemovedSpaces.replace(/ /g, '-');

      var pagetitle = titleRemovedSpaces.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');

	  let titleURL = "/give/"+pagetitle+"/" + this.props.id;
	  
			body =
				<div className="card">
					<Link to={titleURL} className="linkDisplay"><div className="image_wrapper">
					
            <img className="card-img-top event-image" src={image} alt={event_data[0]} />
		
		  </div></Link>
				<Link to={titleURL} className="linkDisplay">
					<div className="card-header text-muted event-header ">
					<p className="small mb-0 text-center"><strong>Hospital: {hospital._hospitalName}</strong></p>
						
					</div>

					<div className="card-body">
						<h5 className="card-title event-title" title={event_data.title} >
							{event_data.title}
						</h5>
						
						{description}
						
					</div></Link>

					<div className="card-list">
					<Link to={titleURL} className="linkDisplay">
					<ul className="list-group list-group-flush">
						<li className="list-group-item small"><strong>Item: {event_data.item} </strong></li>
						<li className="list-group-item small"><strong>Minimum Take: {event_data[6]} Items</strong></li>
						{event_data.borrow && <li className="list-group-item small"><strong>Should return on: {end_date} - {enddate.toLocaleTimeString()}</strong></li>}
						{!event_data.borrow && <li className="list-group-item small"><strong>Will close on: {end_date} - {enddate.toLocaleTimeString()}</strong></li>}
						<li className="list-group-item small"><strong>Items Left: {event_data.committed}/{event_data.amount}</strong></li>
						<li className="list-group-item small"><div class="progress"><div class="progress-inner2" style={{"width":percentage }}></div><div class="progress-outer" style={{"width":"100%" }}></div><p className="  mb-0 text-center">{percentage}</p></div></li>
					</ul>
					</Link>
					</div>

					<div className="card-footer text-muted text-center">
					<button className="btnAlive" disabled={disabled} onClick={() => this.setState({pledgeModalShow:true})}>{buttonText}</button>
					
					{this.state.pledgeModalShow && <ModalTake
      				show={this.state.pledgeModalShow}
					onHide={pledgeModalClose}
					id = {this.props.id}
					hospital = {hospital._hospitalName}
					item = {event_data.item}
					committed = {event_data.committed}
					amount = {event_data.amount}
					account = {this.props.account}
					minimum = {event_data[6]}
      				/>}
					</div>
					
				</div>
			;
		}}

		return (
			<div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 pb-4 d-flex align-items-stretch">
				{body}
			</div>
		);
	}

	componentDidMount() {
		this._isMounted = true;
		this.updateIPFS();

	}

	componentDidUpdate() {
		this.updateIPFS();
	}


	componentWillUnmount() {
		this.isCancelled = true;
		this._isMounted = false;
	}
}

EventGive.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts,
		accounts: state.accounts,
		transactionStack: state.transactionStack
    };
};

const AppContainer = drizzleConnect(EventGive, mapStateToProps);
export default AppContainer;
