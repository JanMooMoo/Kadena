import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import AdminOnly from '../ErrorHandling/AdminOnly';


// Import dApp Components
import HydroLoader from '../Loaders/HydroLoader';
import Web3 from 'web3';


import {Kadena_ABI, Kadena_Address} from '../../config/Kadena';


class AdminPage extends Component
{
  constructor(props, context)
  {
      super(props);

      this.state = {
        blocks : 5000000,
        latestblocks :6000000,
        loadingchain : true,
        active_length : '',
        event_copy:[],
        filter:'all',

        AdminAccount: '0x64F7F7Ce52f38ad110A8cB802a50925944cEd125',
      
        Registration:[],
        Kadena:[],
        account:'',

      };

	    this.contracts = context.drizzle.contracts;
	}

  

  readMoreClick(location)
  {
    this.props.history.push(location);
    window.scrollTo(0, 0);
  }

  

  //Loads Blockhain Data,
  async loadBlockchain(){
   
    const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/72e114745bbf4822b987489c119f858b'));    
    
    const Kadena  =  new web3.eth.Contract(Kadena_ABI, Kadena_Address);
    const blockNumber = await web3.eth.getBlockNumber();

    if (this._isMounted){
        this.setState({Kadena});
        this.setState({blocks:blockNumber - 50000});
        this.setState({latestblocks:blockNumber - 1});
      }

    
        Kadena.events.RegisterHospital({fromBlock:5000000, toBlock:'latest'})
        .on('data',(log)=>{
        this.setState({Registration:[...this.state.Registration,log]})

        var newest = this.state.Registration
        var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);

        this.setState({Registration:newsort,event_copy:newsort,loadingchain:false});
        this.setState({active_length:this.state.Registration.length})
    })

  }
  
    accept = (address) =>{
   
        this.contracts['Kadena'].methods.register.cacheSend(address,true)
        console.log("accept",address)
      
    }

    decline = (address) =>{
    
        this.contracts['Kadena'].methods.register.cacheSend(address,false)
      
    }

    parseDate = (Registration_date) => {
        let date = new Date(parseInt(Registration_date, 10) * 1000);
		let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let RegistrationDate = months[date.getMonth()]+ ". " + date.getDate() + ", " + date.getFullYear() 
        return RegistrationDate    
    }

	render()
  {
    
    let body = '';

   if(this.state.loadingchain){
     body =
     <HydroLoader/>
   }
   else if(this.props.account !== this.state.AdminAccount){
    body =
    <AdminOnly/>
   }
   else{
    body = <div>{this.state.Registration.map((register,index)=>(
        <p className="sold_text col-md-12" key={index}>{register.returnValues.owner} requested as "{register.returnValues.hospitalName}" 
        from {register.returnValues.city},{register.returnValues.country} on {this.parseDate(register.returnValues.time)}
        
        <button className = "accept" onClick={()=>this.accept(register.returnValues.owner)}>Accept</button>
        <button className = "decline" onClick={()=>this.decline(register.returnValues.owner)}>Decline</button></p>
       ))}
    </div>
   }

		return(
      <React.Fragment>
     

			<div className="retract-page-inner-wrapper-alternative">


      <br/><br />

      <div>


        
        <hr/>
         {body}
         <br /><br />

      <div className="topics-wrapper">
      
          <br/>
          <p style ={{textAlign:"center"}}><i class="fas fa-info-circle"></i> Data & information displayed in this site are mock data. It does not represent any real entity or organization. </p>

      </div>
  
         </div></div>
         </React.Fragment>
      
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

AdminPage.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state =>
{
    return {
		contracts: state.contracts,
		accounts: state.accounts
    };
};

const AppContainer = drizzleConnect(AdminPage, mapStateToProps);
export default AppContainer;