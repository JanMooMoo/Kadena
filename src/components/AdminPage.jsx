import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// Import dApp Components
import HydroLoader from './HydroLoader';
import Web3 from 'web3';


import {Kadena_ABI, Kadena_Address} from '../config/Kadena';


// TODO: Make slides dynamic: import slidesJson from '../config/slides.json';



let numeral = require('numeral');

class AdminPage extends Component
{
  constructor(props, context)
  {
      super(props);

      this.state = {
        openEvents : '',
        blocks : 5000000,
        latestblocks :6000000,
        loadingchain : true,
        Events_Blockchain : [],
        active_length : '',
        isOldestFirst:false,
        event_copy:[],
        filter:'all',

        Registration:[],
        Kadena:[],
        account:'',

      };

	    this.contracts = context.drizzle.contracts;
	    this.perPage = 6;
      this.toggleSortDate = this.toggleSortDate.bind(this);
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

    const dateTime = Date.now();
    const dateNow = Math.floor(dateTime / 1000);

    if (this._isMounted){
        this.setState({Kadena});
        this.setState({blocks:blockNumber - 50000});
        this.setState({latestblocks:blockNumber - 1});
        this.setState({Events_Blockchain:[]});}

    
        Kadena.events.RegisterHospital({fromBlock:5000000, toBlock:'latest'})
        .on('data',(log)=>{
        this.setState({Registration:[...this.state.Registration,log]})

        var newest = this.state.Registration
        var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);

        this.setState({Registration:newsort,event_copy:newsort});
        this.setState({active_length:this.state.Registration.length})
        console.log(Date(parseInt(this.state.Registration[0].returnValues.time, 10) * 1000))
    })

  }

  searchChange = (e) =>{
    let {value} = e.target
    this.setState({filter:value},()=>{
    if(this.state.filter !== 'all'){
    var filter = this.state.event_copy;
    filter = filter.filter((events)=>{
      return events.returnValues
    })  
      }
    })
  }
 //Search Active Events By Name
  updateSearch=(e)=>{
    let {value} = e.target
    this.setState({value},()=>{
    if(this.state.value !== ""){
   
    var filteredEvents = this.state.event_copy;

    filteredEvents = filteredEvents.filter((events)=>{
    return events.returnValues.name.toLowerCase().search(this.state.value.toLowerCase()) !==-1;
    })
    }else{ filteredEvents = this.state.event_copy}

  this.setState({Events_Blockchain:filteredEvents});
    this.props.history.push("/cases/"+1)
  })}


  //Search Active Events By Name
  searchByName=(e)=>{
    let {value} = e.target
    this.setState({value},()=>{
    if(this.state.value !== ""){
   
    var filteredEvents = this.state.event_copy;

    filteredEvents = filteredEvents.filter((events)=>{
    return events.returnValues.status.toLowerCase().search(this.state.value.toLowerCase()) !==-1;
    })
    }else{ filteredEvents = this.state.event_copy}

  this.setState({Events_Blockchain:filteredEvents});
    this.props.history.push("/cases/"+1)
  })}

  //Sort Active Events By Date(Newest/Oldest)
  toggleSortDate=(e)=>{
    let {value} = e.target
    this.setState({value},()=>{
    const{Events_Blockchain}=this.state
    const{ended}=Events_Blockchain
    var newPolls = ended

     if(this.state.isOldestFirst){
        newPolls = Events_Blockchain.concat().sort((a,b)=> b.returnValues.eventId - a.returnValues.eventId)
        }
    else {
        newPolls = Events_Blockchain.concat().sort((a,b)=> a.returnValues.eventId - b.returnValues.eventId)
      }

      this.setState({
      isOldestFirst: !this.state.isOldestFirst,
      Events_Blockchain:newPolls
      });
    })}

    accept = (address) =>{
      if(this.props.account.length !== 0){
      this.contracts['Kadena'].methods.register(address,true).send({from:this.props.account})
      }
    }

    decline = (address) =>{
      if(this.props.account.length !== 0){
        this.contracts['Kadena'].methods.register(address,false).send({from:this.props.account})
      }
    }

    parseDate = (Registration_date) => {
        let date = new Date(parseInt(Registration_date, 10) * 1000);
		let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let RegistrationDate = months[date.getMonth()]+ ". " + date.getDate() + ", " + date.getFullYear() 
        console.log(RegistrationDate)
        return RegistrationDate    
    }

	render()
  {
    let x = this.props.account
    console.log("admin",this.props.account)
    
    let body = '';
    let loader = <HydroLoader/>

   

    body = <div>{this.state.Registration.map((register,index)=>(
        <p className="sold_text col-md-12" key={index}>{register.returnValues.owner} requested as "{register.returnValues.hospitalName}" 
        from {register.returnValues.city},{register.returnValues.country} on {this.parseDate(register.returnValues.time)}
        
        <button className = "accept" onClick={()=>this.accept(register.returnValues.owner)}>Accept</button>
        <button className = "decline" onClick={()=>this.decline(register.returnValues.owner)}>Decline</button></p>
       ))}
    </div>


		return(
      <React.Fragment>
     

			<div className="retract-page-inner-wrapper-alternative">


      <br/><br />

      <div className="input-group input-group-lg">
        <div className="input-group-prepend ">
            
        <span className="input-group-text search-icon" id="inputGroup-sizing-lg"><i className="fa fa-search"></i>&nbsp;Location</span>
        </div>
        <input type="text" placeholder="Search" value={this.state.value} onChange={this.updateSearch.bind(this)} className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
      </div>
      <br /><br />

      <div>

        <div className="row row_mobile">
         <h2 className="col-lg-10 col-md-9 col-sm-8"><i className="fa fa-calendar-alt"></i> Recent Registration Request</h2>
         <button className="btn sort_button col-lg-2 col-md-3 col-sm-3" value={this.state.value} onClick={this.toggleSortDate} onChange={this.toggleSortDate.bind(this)}>{this.state.isOldestFirst ?'Sort: Oldest':'Sort: Newest'}</button>
        </div>
        <div className="row row_mobile">
        <span className="col-lg-10 col-md-9 col-sm-8"></span>
        {this.state.Events_Blockchain.length !== this.state.active_length && this.state.Events_Blockchain.length !== 0 && <h5 className="result col-lg-2 col-md-3 col-sm-3">Results: {this.state.Events_Blockchain.length}</h5>}
        <div >
        </div>
        </div>
        <hr/>
         {body}
         <br /><br />
         


      <div className="topics-wrapper">
      
          <br/>
          <p style ={{textAlign:"center"}}><i class="fas fa-info-circle"></i> Data & information displayed in this site are translated from reports from Philippine <a href='https://www.gov.ph/' target="blank">Department of Health</a> & <a href="https://www.who.int/" target="blank">World Health Organization</a>. Will continue to monitor cases and update site.</p>

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