import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ipfs from '../utils/ipfs';

import Loading from './Loading';
import {ModalPledge} from './ModalPledge'

let numeral = require('numeral');


class Event extends Component {
    constructor(props, context) {
		

        super(props);
		this.contracts = context.drizzle.contracts;
		this.event = this.contracts['Kadena'].methods.callForHelpDetails.cacheCall(this.props.id);
		this.hospital = this.contracts['Kadena'].methods.getHospitalStatus.cacheCall(this.props.owner);

		this.account = this.props.accounts[0];
		this.state = {
			loading: false,
			loaded: false,
			description: null,
			image: null,
			ipfs_problem: false,
			locations:null,

			fee:'',
			token:'',
			openEvents_address:'',
			buyticket:'',
			approve:'',
			
			pledgeModalShow:false
		};
		this.isCancelled = false;
	}



	updateIPFS = () => {

		if (this.state.loaded === false && this.state.loading === false && typeof this.props.contracts['Kadena'].callForHelpDetails[this.event] !== 'undefined') {
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
			let text = this.state.description.length > 30 ? this.state.description.slice(0, 90) + '...' : this.state.description;
			description = <strong>{text}</strong>;
			
		}
		return description;
	}
	//get the location of Events on IPFS

	 render() {
		
		let body = <div className="card"><div className="card-body"><Loading /></div></div>;

		if (typeof this.props.contracts['Kadena'].callForHelpDetails[this.event] !== 'undefined' && typeof this.props.contracts['Kadena'].getHospitalStatus[this.hospital] !== 'undefined') {
			
			let pledgeModalClose = () =>this.setState({pledgeModalShow:false});

			let hospital = this.props.contracts['Kadena'].getHospitalStatus[this.hospital].value;
			let event_data = this.props.contracts['Kadena'].callForHelpDetails[this.event].value;
			

			let image = this.getImage();
			let description = this.getDescription();
		
			//let Alive = event_data[5]? 'Alive':'Deceased';
	

			let disabled = false;
			let buttonText =<span><span role="img" aria-label="alert"> </span> Pledge</span>;
			 

			if (event_data[3] !=='undefined'){

			let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
			
			let startdate = new Date(parseInt(event_data.startDate, 10) * 1000);
			let start_date = months[startdate.getMonth()]+ ". " + startdate.getDate() + ", " + startdate.getFullYear()

			let enddate = new Date(parseInt(event_data.endDate, 10) * 1000);
			let end_date = months[enddate.getMonth()]+ ". " + enddate.getDate() + ", " + enddate.getFullYear()


			if (Number(event_data.committed) >= Number(event_data.amount)) {
				disabled = true;
				buttonText = <span><span role="img" aria-label="alert"> </span> Filled</span>;
			}
	
	  //Friendly URL Title
	  let rawTitle = event_data[0];
      var titleRemovedSpaces = rawTitle;
	  titleRemovedSpaces = titleRemovedSpaces.replace(/ /g, '-');

      var pagetitle = titleRemovedSpaces.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');

	  let titleURL = "/event/"+pagetitle+"/" + this.props.id;
	  let percentage = numeral(event_data.committed*100/event_data.amount).format('0.00')+ "%";
	  
			body =
				<div className="card">
					<div className="image_wrapper">
					
            <img className="card-img-top event-image" src={image} alt={event_data[0]} />
		
		  </div>
					<div className="card-header text-muted event-header ">
					<p className="small  mb-0 text-center">Hospital: {hospital._hospitalName}</p>
						
					</div>

					<div className="card-body">
						<h5 className="card-title event-title" title={event_data.title} >
							{event_data.title}
						</h5>
						{description}
						
					</div>


					<ul className="list-group list-group-flush">

						<li className="list-group-item small"><strong>Item: {event_data.item}</strong></li>
						<li className="list-group-item small"><strong>Date Needed: {start_date} - {startdate.toLocaleTimeString()}</strong></li>
						{event_data.borrow && <li className="list-group-item small"><strong>Will Return In: {end_date} - {enddate.toLocaleTimeString()}</strong></li>}
						{!event_data.borrow && <li className="list-group-item small"><strong>Will Close In: {end_date} - {enddate.toLocaleTimeString()}</strong></li>}
						<li className="list-group-item small"><strong>Committed: {event_data.committed}/{event_data.amount}</strong></li>
						<li className="list-group-item small"><div class="progress"><div class="progress-inner" style={{"width":percentage }}></div><div class="progress-outer" style={{"width":"100%" }}></div><p className="  mb-0 text-center">{percentage}</p></div></li>

					</ul>

					<div className="card-footer text-muted text-center">
					<button className="btnAlive" disabled={disabled} onClick={() => this.setState({pledgeModalShow:true})}>{buttonText} <i class="far fa-check-circle"></i></button>
					
					{this.state.pledgeModalShow && <ModalPledge
      				show={this.state.pledgeModalShow}
					onHide={pledgeModalClose}
					id = {this.props.id}
					hospital = {hospital._hospitalName}
					item = {event_data.item}
					committed = {event_data.committed}
					amount = {event_data.amount}
					account = {this.props.account}
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

Event.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts,
		accounts: state.accounts,
		transactionStack: state.transactionStack
    };
};

const AppContainer = drizzleConnect(Event, mapStateToProps);
export default AppContainer;
