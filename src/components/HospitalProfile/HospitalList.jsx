import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';


// Import dApp Components
import HydroLoader from '../Loaders/HydroLoader';
import HospitalRow from './HospitalRow';
import Web3 from 'web3';
import {Kadena_ABI, Kadena_Address} from '../../config/Kadena';


class HospitalList extends Component
{
  constructor(props, context)
  {
      super(props);

      this.state = {
        blocks : 5000000,
        latestblocks :6000000,
        loadingchain : true,
        active_length : '',
        Kadena:[],
        registerdHospital:[],
      };

	    this.contracts = context.drizzle.contracts; 
	}

  

  //Loads Blockhain Data,
  async loadBlockchain(){
   
    const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b')); 
    const Kadena  =  new web3.eth.Contract(Kadena_ABI, Kadena_Address);
		this.setState({Kadena:Kadena});
		
    const blockNumber = await web3.eth.getBlockNumber();
    
    if (this._isMounted){
    this.setState({blocks:blockNumber - 50000});
    this.setState({latestblocks:blockNumber - 1});

    this.state.Kadena.getPastEvents("Registration",{fromBlock: 5000000, toBlock:this.state.latestblocks})
    .then(events=>{

    if (this._isMounted){
 
      var newest = events;
      var newsort= newest.concat().sort((a,b)=> 
      a.returnValues.registeredAs.localeCompare(b.returnValues.registeredAs));
      this.setState({registerdHospital:newsort});
      this.setState({active_length:this.state.registerdHospital.length})
      this.setState({loadingchain:false});}
     }).catch((err)=>console.error(err))
     
     
     this.state.Kadena.events.Registration({fromBlock: this.state.blockNumber, toBlock:'latest'})
    .on('data', (log) => setTimeout(()=> {
    this.setState({registerdHospital:[...this.state.registerdHospital,log]});
    var newest = this.state.registerdHospital
    var newsort= newest.concat().sort((a,b)=>a.returnValues.registeredAs.localeCompare(b.returnValues.registeredAs));

    this.setState({registerdHospital:newsort});
    this.setState({active_length:this.state.registerdHospital.length})
     },10000))
    }
     
    }

  
	render()
  {
    let body = '';
    if (this.state.active_length !== 'undefined') {
      
      if(this.state.loadingchain){
        body = <HydroLoader/>
      }
      
      else {

        body =<div>
              <div className="table-wrapper" >
                <table className="table-size">
                 <thead>
                <tr>
                 <th>No.</th>
                 <th>Hospital Name</th>
                 <th>Country</th>
                 <th>City</th>
                <th>Address</th>
	              <th>Rating</th>
                <th>Member Since</th>
                </tr>
              </thead>
              
              <tbody>
              {this.state.registerdHospital.map((hospital,index)=> <HospitalRow key ={index} organizer = {hospital.returnValues.applicant} count={index} history = {this.props.history}/> )}   
              </tbody>
              </table>  
             </div>

						</div>;
			        }
            }


		return(
			<div className="retract-page-inner-wrapper-alternative">
      <br/><br />
      <div>

        <div className="row row_mobile">
        <h2 className="col-lg-10 col-md-9 col-sm-8"><i class="fas fa-hospital-alt "/> List of Hospitals</h2>
        </div>
        <hr/>

         {body}
         <br/><br/>

      <div className="topics-wrapper">    
      <br/>
      <p style ={{textAlign:"center"}}><i class="fas fa-info-circle"></i> Data & information displayed in this site are mock data. It does not represent or in any way connected to real entity or organization. </p>
      </div>
  
      </div>
      </div>
      
		);
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadBlockchain();
  
  }

  componentWillUnmount() {
    this.isCancelled = true;
    this._isMounted = false;
  }




}

HospitalList.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state =>
{
    return {
		contracts: state.contracts,
		accounts: state.accounts
    };
};

const AppContainer = drizzleConnect(HospitalList, mapStateToProps);
export default AppContainer;