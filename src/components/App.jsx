import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { drizzleConnect } from 'drizzle-react';
import { ToastContainer, toast } from 'react-toastify';
import Web3 from 'web3';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'startbootstrap-simple-sidebar/css/simple-sidebar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/main.css';

import Sidebar from './Sidebar';
import Home from './Home';
import AdminPage from './AdminPage';
import CreateEvent from './CreateEvent/';

import HospitalProfile from './HospitalProfile';
import CallForHelp from './CallForHelp';
import {Kadena_ABI, Kadena_Address} from '../config/Kadena';



import Notify from './Notify';

import NotifyEventSuccess from './NotifyEventSuccess';

import NotifyError from './NotifyError';
import NotifyNetwork from './NotifyNetwork';

import NotifyRequest from './NotifyRequest';
import NotifyPledge from './NotifyPledge';

import PageNeed from './PageNeed';

import NetworkError from './NetworkError';
import LoadingApp from './LoadingApp';

let ethereum= window.ethereum;
let web3=window.web3;

class App extends Component
{

	constructor(props) {
		super(props);
		this.state = {
			sent_tx: [],
			showSidebar: true,
			account:[],


			createEvent:'',
			upload:false,
			done:false,
			error:false,
			afterApprove:false,

			refresh:false,


			accountDetails:[],
			block:500000,

		};
		this.loadBlockchainData = this.loadBlockchainData.bind(this);
	}

	componentDidMount(){
		this.loadBlockchainData()
		this.fallback()
	}

	componentWillUpdate() {
		let sent_tx = this.state.sent_tx;

		for (let i = 0; i < this.props.transactionStack.length; i++) {
			if (sent_tx.indexOf(this.props.transactionStack[i]) === -1) {
				sent_tx.push(this.props.transactionStack[i]);
				this.setState({
					upload:false,
					done:true
				});
				toast(<Notify hash={this.props.transactionStack[i]} />, {
					position: "bottom-right",
					autoClose: true,
					pauseOnHover: true

				});
			}
		}

		if (sent_tx.length !== this.state.sent_tx.length) {
			this.setState({
				sent_tx: sent_tx
			});
		}
	}

fallback(){
	//window.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/72e114745bbf4822b987489c119f858b'));

}

//Get Account
async loadBlockchainData() {

	if(typeof ethereum !=='undefined'){
	// console.log("metamask")
	 await ethereum.enable();
	 web3 = new Web3(ethereum);
	 this.getAccount()
	 window.ethereum.on('accountsChanged', function (accounts) {
		window.location.reload();
	   })
   
	   window.ethereum.on('networkChanged', function (netId) {
		window.location.reload();
	   })

 	}

 	else if (typeof web3 !== 'undefined'){
	console.log('Web3 Detected!')
	 window.web3 = new Web3(web3.currentProvider);
	 this.getAccount()
	 }	

 	else{console.log('No Web3 Detected')
 	window.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/72e114745bbf4822b987489c119f858b'));
	}

	}


	async getAccount(){

		const accounts = await web3.eth.getAccounts()
		this.setState({account: accounts[0]});
		const Kadena  =  new web3.eth.Contract(Kadena_ABI, Kadena_Address);
		this.setState({Kadena:Kadena});
		setInterval(async()=>{
			const get_account = await Kadena.methods.getHospitalStatus(this.state.account).call();
		this.setState({accountDetails:get_account},()=>console.log)	
		},2000)

		const blockNumber = await web3.eth.getBlockNumber();
		this.setState({block:blockNumber})
		Kadena.events.allEvents({filter:{owner:this.state.account},fromBlock:blockNumber, toBlock:'latest'})

        .on('data',(log)=>{
			if(log.returnValues.owner === this.state.account){

				toast(<NotifyRequest hash={log.blockHash} hospital={log.returnValues.hospitalName}/>, {
					position: "bottom-right",
					autoClose: true,
					pauseOnHover: true

				});
			}
			if(log.returnValues.pledgedBy === this.state.account){

				toast(<NotifyPledge hash={log.blockHash} 
					receiver={log.returnValues.receiver} 
					item = {log.returnValues.item}
					committed = {log.returnValues.committed}/>, 
					{
					position: "bottom-right",
					autoClose: true,
					pauseOnHover: true
		
				});
		
			}
		})	
	
	}

	refresh = () =>{
		if(this.state.refresh){
		this.setState({refresh:false},()=>console.log())}
		else{
			this.setState({refresh:true},()=>console.log())
			}
	}

	render() {

		let body;
		let connecting = false;

		if (!this.props.drizzleStatus.initialized) {
			console.log(this.props.drizzleStatus.initialized)
			body =
				<div>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route component={LoadingApp} />
					</Switch>
				</div>
			;
			connecting = true;
		} else if (this.props.web3.status === 'failed') {

			body =
				<div>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route component={NetworkError} />
					</Switch>
				</div>
			;
			connecting = true;
		} else if(
				(this.props.web3.status === 'initialized' && Object.keys(this.props.accounts).length === 0) ||
				(process.env.NODE_ENV === 'production' && this.props.web3.networkId !== 4)
				)
			{
			  console.log("web3",process.env.NODE_ENV)
			  
			  body = 
			  		<div>
			  		<Route exact path="/" render={props => <CallForHelp  {...props} account ={this.state.account} block={this.state.block} kadena={this.state.Kadena}/>} />
					<Route path="/needhelp/:page"  render={props => <CallForHelp  {...props} account ={this.state.account} block={this.state.block} kadena={this.state.Kadena}/> }  />
					<Route path="/event/:page/:id"  render={props => <PageNeed {...props} kadena={this.state.Kadena}/>}/>
					<Route path="/hospital/:page/:id"  render={props => <HospitalProfile {...props}/>}/>
					<Route path="/createevent" render={props=><CreateEvent  {...props}
					upload={this.state.upload}
					done = {this.state.done}
					error = {this.state.error}
					account ={this.state.account}/>}/>
					<Route path="/how-it-works" component={Home} />
					<Route path="/admin" render={props =><AdminPage {...props} account = {this.state.account}/>}/>
					</div>
			}
		
		else {
			body =
				<div>
					<Route exact path="/" render={props => <CallForHelp  {...props} account ={this.state.account} block={this.state.block} kadena={this.state.Kadena}/>} />
					<Route path="/needhelp/:page"  render={props => <CallForHelp  {...props} account ={this.state.account} block={this.state.block} kadena={this.state.Kadena}/>}  />
					<Route path="/event/:page/:id"  render={props => <PageNeed {...props} kadena={this.state.Kadena}/>}/>
					<Route path="/hospital/:page/:id"  render={props => <HospitalProfile {...props}/>}/>
					<Route path="/createevent" render={props=><CreateEvent  {...props}
					upload={this.state.upload}
					done = {this.state.done}
					error = {this.state.error}
					account ={this.state.account}/>}/>
					<Route path="/how-it-works" component={Home} />
					<Route path="/admin" render={props =><AdminPage {...props} account = {this.state.account}/>}/>
					
				</div>
			;
		}

		return(
			<Router>

				<div id="wrapper" className="toggled">

					<Sidebar connection={!connecting} account={this.state.account} accountDetails = {this.state.accountDetails} connect = {this.loadBlockchainData} refresh = {this.refresh}/>
					<div id="page-content-wrapper" className="sidebar-open">
						<div className="branding">
						<h1>KaDenA</h1>
						<p>Hospital Alliance</p>
						</div>
						<div className="container-fluid">
							<div className="page-wrapper-inner">
								<div>
									{body}
								</div>
							</div>
						</div>
					</div>
					<ToastContainer />

				</div>
				
			</Router>
		);
	}
}

const mapStateToProps = state => {
    return {
		drizzleStatus: state.drizzleStatus,
		web3: state.web3,
		accounts: state.accounts,
		transactionStack: state.transactionStack,
		transactions: state.transactions
    };
};

const AppContainer = drizzleConnect(App, mapStateToProps);
export default AppContainer;
