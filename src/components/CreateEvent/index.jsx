import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';

import ipfs from '../../utils/ipfs';

import Form from './Form';
import Loader from './Loader';
import Error from './Error';
import Done from './Done';

import CallForHelp from './CallForHelp';
import LendAHand from './LendAHand';

class CreateEvent extends Component {
	constructor(props, context) {
		super(props);

		this.state = {
			done: false,
			upload: false,
			stage: 0,
			title: null,
			error: false,
			error_text: 'IPFS Error',
			ipfs: null,
			fileImg: null,
			newsNumber:null,
			data: {
				name: null,
				country:null,
				city:null,
				address: null,
				description:null,
				contact:null,
				id:0,	
			},

			callForHelp:{
				title:null,
				category:null,
				item:null,
				amount:0,
				borrow:false,
				minimum:0,
				enddate:0,
				remarks:null,
				id:0
			},

			lendAHand:{
				title:null,
				category:null,
				item:null,
				amount:0,
				borrow:false,
				minimum:0,
				enddate:0,
				remarks:null,
				id:0
			},
			
			help:false,
			lend:false,
			editIpfs:false,
			eventId:null,

			txType:"Registration"
		};

		this.contracts = context.drizzle.contracts;
	}

	
	callForHelp = (title,category,item,amount,borrow,minimum,enddate,remarks,file,id) =>{
		console.log("checking",title,category,item,amount,borrow,minimum,enddate,remarks)
		this.setState({
			help:true,
			upload: true,
			redirect:false,
			stage: 25,
			title: 'Uploading event image...',
			callForHelp: {
				title:title,
				category:category,
				item:item,
				amount:parseInt(amount, 10),
				borrow:borrow,
				minimum:minimum,
				enddate:enddate,
				remarks:remarks,
				id: parseInt(id, 10)
			}
		}, () => {
			this.stageUpdater(90);
			this.readFile(file);
		});
	}

	lendAHand = (title,category,item,amount,borrow,minimum,enddate,remarks,file,id) =>{
		console.log("checking",title,category,item,amount,borrow,minimum,enddate,remarks)
		this.setState({
			lend:true,
			upload: true,
			redirect:false,
			stage: 25,
			title: 'Uploading event image...',
			lendAHand: {
				title:title,
				category:category,
				item:item,
				amount:parseInt(amount, 10),
				borrow:borrow,
				minimum:minimum,
				enddate:enddate,
				remarks:remarks,
				id: parseInt(id, 10)
			}
		}, () => {
			this.stageUpdater(90);
			this.readFile(file);
		});
	}

	
	registerHospital = (name, country, city, address,description, contact,file,id) => {
		console.log(this.contracts)
		this.setState({

			upload: true,
			redirect:false,
			stage: 25,
			title: 'Uploading event image...',
			data: {
				name: name,
				country: country,
				city: city,
				address: address,
				description: description,
				contact: contact,

				id: parseInt(id, 10)
			}
		}, () => {
			this.stageUpdater(90);
			this.readFile(file);
		});
	}

	

	readFile = (file) => {
		let reader = new window.FileReader();
		console.log(file);
		reader.readAsDataURL(file);
		if(this.state.help === true){
		reader.onloadend = () => this.uploadHelp(reader);	
		}
		else if(this.state.lend === true){
		reader.onloadend = () => this.uploadLend(reader);		
		}
		else{
		reader.onloadend = () => this.convertAndUpload(reader);
		}
	}

	uploadHelp = (reader) => {
		let pinit = process.env.NODE_ENV === 'production';
		let data = [];
		if(this.state.help === true){
			 data = JSON.stringify({
				image: reader.result,
				remarks: this.state.callForHelp.remarks,
		})}
		
		let buffer = Buffer.from(data);

		ipfs.add(buffer, {pin: pinit}).then((hash) => {
			this.setState({
				stage: 95,
				title: 'Creating transaction...',
				ipfs: hash[0].hash
			});
			
			this.transactionHelp();
			 
		}).catch((error) => {
			this.setState({
				error: true,
				error_text: 'IPFS Error'
			});
		});
	};

	uploadLend = (reader) => {
		let pinit = process.env.NODE_ENV === 'production';
		let data = [];
		if(this.state.lend === true){
			 data = JSON.stringify({
				image: reader.result,
				remarks: this.state.lendAHand.remarks,
		})}
		
		let buffer = Buffer.from(data);

		ipfs.add(buffer, {pin: pinit}).then((hash) => {
			this.setState({
				stage: 95,
				title: 'Creating transaction...',
				ipfs: hash[0].hash
			});
			
			this.transactionLend();
			 
		}).catch((error) => {
			this.setState({
				error: true,
				error_text: 'IPFS Error'
			});
		});
	};

	transactionHelp = () => {
		let id = this.contracts['Kadena'].methods.callForHelp.cacheSend( 
			   this.state.callForHelp.title,
			   this.state.callForHelp.category,
			   this.state.callForHelp.item,
			   this.state.callForHelp.amount,
			   this.state.callForHelp.borrow === 'true' ? true:false,	
			   this.state.callForHelp.minimum,
			   this.state.callForHelp.enddate,
			   this.state.ipfs)	
			   this.setState({help:false},()=>console.log())			
		this.transactionChecker(id)
		//this.setRedirect();
	}

	transactionLend = () => {
		let id = this.contracts['Kadena'].methods.provideAssistance.cacheSend( 
			this.state.lendAHand.title,
			this.state.lendAHand.category,
			this.state.lendAHand.item,
			this.state.lendAHand.amount,
			this.state.lendAHand.borrow === 'true' ? true:false,	
			this.state.lendAHand.minimum,
			this.state.lendAHand.enddate,
			this.state.ipfs)	
			this.setState({lend:false},()=>console.log())
			   	
		this.transactionChecker(id)
		//this.setRedirect();
	}
	

    convertAndUpload = (reader) => {
		let pinit = process.env.NODE_ENV === 'production';
		let data = [];

			data = JSON.stringify({
			image: reader.result,
			address: this.state.data.address,
			description: this.state.data.description,
			contact:this.state.data.contact
		})
		
		let buffer = Buffer.from(data);

		ipfs.add(buffer, {pin: pinit}).then((hash) => {
			this.setState({
				stage: 95,
				title: 'Creating transaction...',
				ipfs: hash[0].hash
			});

			this.uploadRegistration();
			 
			//this.transactionChecker(id)

		}).catch((error) => {
			this.setState({
				error: true,
				error_text: 'IPFS Error'
			});
		});
	};

	uploadRegistration = () => {
		let id = this.contracts['Kadena'].methods.registerHospital.cacheSend(
			this.state.data.name,
			this.state.data.country,
			this.state.data.city,
			this.state.ipfs)

		this.transactionChecker(id)
		//this.setRedirect();
	}

	createNewEvent= () =>{
	this.setState({error:false,
			done:false,
			upload:false},()=>console.log())
	}

	transactionChecker = (id) => {
		let tx_checker = setInterval(() => {
			let tx = this.props.transactionStack[id];
			console.log(tx)
			console.log(tx_checker)
			if (typeof tx !== 'undefined') {
				this.setState({
					upload: false,
					done: true
				});
				clearInterval(tx_checker);
			}
		}, 100);
	}

	stageUpdater = (max) => {
		let updater = setInterval(() => {
			if (this.state.stage < max) {
				this.setState({
					stage: this.state.stage + 1
				});
			} else {
				clearInterval(updater);
			}
		}, 500);
	}

	typeChange = (event) =>{
		let type = event.target.value;

		this.setState({
			txType: type
		},()=>(console.log(this.state.txType)));
	}

	render() {

		let disabled = true;
		if(this.props.account.length !== 0){
			disabled = false;
		}

		

		if (this.state.done) {
			return <Done createNewEvent = {this.createNewEvent}/>
			;
		}

		let body =
			this.state.upload ?
				<Loader progress={this.state.stage} text={this.state.title} /> :
				<React.Fragment>
					<div className="row">
							<Form registerHospital={this.registerHospital} account={this.props.account} />
					</div>
				</React.Fragment>
		;

		if (this.state.error ) {
			body= <Error message={this.state.error_text} createNewEvent = {this.createNewEvent}/>;
		}

		else if(this.state.txType === "Call for Help"){
			body = 
			this.state.upload ?
			<Loader progress={this.state.stage} text={this.state.title} /> :
			<div className="row">	
			<CallForHelp callForHelp={this.callForHelp}  account={this.props.account}/>
			</div>
		}

		else if(this.state.txType === "Lend a Hand"){
			
			body = 
			this.state.upload  ?
			<Loader progress={this.state.stage} text={this.state.title} /> :
			<div className="row">	
			<LendAHand lendAHand={this.lendAHand}  account={this.props.account}/>
			</div>
		}

		return (
			<div className="home-wrapper">
				
				<div className="row txType">
					<label htmlFor="transactionType">What do you want to do?</label>
					<select className="form-control" id="transactionType" title="Type of Transaction" onChange={this.typeChange}>
						<option value="Registration" key="1">Registration</option>
						<option value="Call for Help" key="2">Call for Help</option>
						<option value="Lend a Hand" key="3">Lend a Hand</option>
					</select>
				</div>

				{disabled && <div className = "row alert-connection col-lg-6 mb-6">
				<div className="connection-box">
                    <p className="mt-1 mb-1">
                    <span role="img" aria-label="halt">⚠️ You are on VIEW ONLY mode. You won't be able to submit because you are not connected to a network.</span>
                    </p>
                </div>	
				</div>}

				<hr />
				{body}
			</div>
		);
	}
}

CreateEvent.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts,
		transactionStack: state.transactionStack
    };
};

const AppContainer = drizzleConnect(CreateEvent, mapStateToProps);
export default AppContainer;
