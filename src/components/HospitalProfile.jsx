import React, { Component } from 'react';
import { drizzleConnect } from "drizzle-react";
import PropTypes from 'prop-types';
import makeBlockie from 'ethereum-blockies-base64';

import ipfs from '../utils/ipfs';
import Web3 from 'web3';


import Loading from './Loading';
import HospitalNotFound from './HospitalNotFound';

import ActivityPledge from './ActivityPledge';

import JwPagination from 'jw-react-pagination';
import { Link } from 'react-router-dom';
import {Kadena_ABI, Kadena_Address} from '../config/Kadena';


let numeral = require('numeral');

const customStyles = {
    ul: {
		border:'rgb(10, 53, 88)'
        
    },
    li: {
		border:'rgb(10, 53, 88)'
       
    },
    a: {
		color: '#007bff',
		
	},
	
};

class HospitalProfile extends Component {

    constructor(props, context) {
      super(props);
		  this.contracts = context.drizzle.contracts;
          //this.event = this.contracts['Kadena'].methods.callForHelpDetails.cacheCall(this.props.match.params.id);
          this.hospital = this.contracts['Kadena'].methods.getHospitalStatus.cacheCall(this.props.match.params.id);
          this.state = {
			  load:true,
			  loading: false,
              loaded: false,
              
			  description: null,
              image: null,
              contact: null,
              address: null,

			  ipfs_problem: false,
			  organizer:null,

			  commited:[],
              latestblocks:5000000,
              Kadena:null,

			  pledgeModalShow:false,
              pageTransactions:[],
              id:'0x64F7F7Ce52f38ad110A8cB802a50925944cEd125'

		  };
		  this.isCancelled = false;
          this.onChangePage = this.onChangePage.bind(this);
	}

	//Get SoldTicket Data
	async loadblockhain(){

	const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));
	const Kadena =  new web3.eth.Contract(Kadena_ABI, Kadena_Address);

    if (this._isMounted){
    this.setState({Kadena:Kadena});}

    const blockNumber = await web3.eth.getBlockNumber();
    if (this._isMounted){
    this.setState({
		blocks:blockNumber - 50000,
	    latestblocks:blockNumber - 1,
		commited:[]
		});
	}

    

  }


	updateIPFS = () => {
		if (
			this.state.loaded === false &&
			this.state.loading === false &&
			typeof this.props.contracts['Kadena'].getHospitalStatus[this.hospital] !== 'undefined' &&
			!this.props.contracts['Kadena'].getHospitalStatus[this.hospital].error
		) {
			this.setState({
				loading: true
			}, () => {
				ipfs.get(this.props.contracts['Kadena'].getHospitalStatus[this.hospital].value._ipfs).then((file) => {
					let data = JSON.parse(file[0].content.toString());
					if (!this.isCancelled) {
						this.setState({
							loading: false,
							loaded: true,
							description: data.description,
							image: data.image,
							contact: data.contact,
							address: data.address
							  
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
		if (this.state.ipfs_problem) description = <p><span role="img" aria-label="warning">🚨</span>We can not load description</p>;
		if (this.state.description !== null) description = <p>{this.state.description}</p>;
		return description;
    }
    
    getAddress = () => {
		let address = '';
		if (this.state.ipfs_problem) address = ''
		if (this.state.address !== null) address = this.state.address;
		return address;
	}

	

	onChangePage(pageTransactions) {
		this.setState({ pageTransactions });
	}

    parseDate = (pledge_date) => {
        let date = new Date(parseInt(pledge_date, 10) * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let pledgeDate = months[date.getMonth()]+ ". " + date.getDate() + ", " + date.getFullYear() 
        return pledgeDate    
    }

		render() {
		let body = <Loading />;

		

		if (typeof this.props.contracts['Kadena'].getHospitalStatus[this.hospital] !== 'undefined') {
			if (this.props.contracts['Kadena'].getHospitalStatus[this.hospital].error) {
				body = <div className="text-center mt-5"><span role="img" aria-label="warning">🚨</span> Hospital Profile Not Found</div>;
			} else {

                let hospital_data = this.props.contracts['Kadena'].getHospitalStatus[this.hospital].value;
                console.log("blala",hospital_data)
                //let pledgeModalClose = () =>this.setState({pledgeModalShow:false});
                let image = this.getImage();
                let description = this.getDescription();
                let address = this.getAddress();
                let stars = 'Hospital Rating:'

                let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
			
                let startdate = new Date(parseInt(hospital_data._time, 10) * 1000);
                let memberSince = months[startdate.getMonth()]+ ". " + startdate.getDate() + ", " + startdate.getFullYear()
               

                let rawTitle = hospital_data._hospitalName;
      	        var titleRemovedSpaces = rawTitle;
	  	        titleRemovedSpaces = titleRemovedSpaces.replace(/ /g, '-');

      	        var pagetitle = titleRemovedSpaces.toLowerCase()
      	        .split(' ')
      	        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ');
                  
                  if (hospital_data._rating < 20 ){
                    stars = <div className="rating">Hospital Rating: <i class="far fa-star"/><i class="far fa-star"/><i class="far fa-star"/><i class="far fa-star"/><i class="far fa-star"/></div>}
               else if (hospital_data._rating <= 25){
                stars = <div className="rating">Hospital Rating: <i class="fas fa-star"/><i class="far fa-star"/><i class="far fa-star"/><i class="far fa-star"/><i class="far fa-star"/></div>}
                else if (hospital_data._rating <= 30){
                    stars = <div className="rating">Hospital Rating: <i class="fas fa-star"/><i class="fas fa-star"/><i class="far fa-star"/><i class="far fa-star"/><i class="far fa-star"/></div>}
                else if (hospital_data._rating <= 35){
                    stars = <div className="rating">Hospital Rating: <i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/><i class="far fa-star"/><i class="far fa-star"/></div>}
                else if (hospital_data._rating <=40){
                    stars = <div className="rating">Hospital Rating: <i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/><i class="far fa-star"/></div>}
                else {
                    stars = <div className="rating">Hospital Rating: <i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/></div>
                }; 

		if(this.props.match.params.page === pagetitle){
		 
				body =
				<div className="row">
                <div className="col-12">
            	<h3>{hospital_data._hospitalName}</h3>
                </div>
                <div className = "card-hospital-wrapper col-lg-4 col-md-6 col-sm-12 mt-3">
					<img className="card-hospital-img-top" src={image} alt="Event" />
                </div>
                <div className= "description-wrapper col-lg-8 col-md-6 col-sm-12 br-50 mt-3">
                <p>{description}</p>
                </div>
                 
				
               
				<div className=" col-12 mt-4">
                
                <ul className="list-group list-group-flush profile-list">
					<li className="list-group-item small "><strong>Country: {hospital_data._country}</strong> </li>
                    <li className="list-group-item small"><strong>City: {hospital_data._city}</strong> </li>
					<li className="list-group-item small"><strong>Address: {address} </strong></li>
                    <li className="list-group-item small"><strong>Kadena Member Since: {memberSince} </strong></li>
                    <li className="list-group-item small" title={hospital_data._rating}><strong>{stars}</strong></li>
					</ul> 
				
                        

				</div>

			<hr/>
            
            <ActivityPledge Kadena = {this.state.Kadena} blocks = {this.state.latestblocks} account={this.props.match.params.id}/>
			
            </div>;
				}
				
			else {
				body = <HospitalNotFound/>;
				}
                
			}
			
		}

		return (
			<div className="event-page-wrapper">
				<h3><i class="fas fa-hospital-user"i/> Hospital Profile</h3>
				<hr />
				{body}
				<hr/>
				<div className="topics-wrapper">
                <br/>
                <p style ={{textAlign:"center"}}><i class="fas fa-info-circle"></i> Data & information displayed in this site are mock data. It does not represent or in any way connected to any real entity or organization. </p>
                </div>
			</div>
		);
	}

	componentDidMount() {
		this._isMounted = true;
		this.updateIPFS();
		this.loadblockhain();
	}

	componentDidUpdate() {
		this.updateIPFS();
		//this.afterApprove();
	}

	componentWillUnmount() {
		this.isCancelled = true;
		this._isMounted = false;
	}
}

HospitalProfile.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts,
		accounts: state.accounts,
		transactionStack: state.transactionStack
    };
};

const AppContainer = drizzleConnect(HospitalProfile, mapStateToProps);
export default AppContainer;