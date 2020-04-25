import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// Import dApp Components
import HydroLoader from './HydroLoader';
import Event from './Event';
import Web3 from 'web3';
import {Kadena_ABI, Kadena_Address} from '../config/Kadena';


class CallForHelp extends Component
{
  constructor(props, context)
  {
      super(props);

      this.state = {
        blocks : 5000000,
        latestblocks :6000000,
        loadingchain : true,
        Events_Blockchain : [],
        active_length : '',
        isOldestFirst:false,
        event_copy:[],
        filter:'all',
        Kadena:[],
        needHelpActive:[],
        needHelpDeactive:[],
        pledgeModalShow: false,

      };

	    this.contracts = context.drizzle.contracts;
        this.Count = this.contracts['Kadena'].methods.getNeededCount.cacheCall();


      
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
    if (this._isMounted){
    this.setState({Kadena});}
    
    const blockNumber = await web3.eth.getBlockNumber();
    
    if (this._isMounted){
    this.setState({blocks:blockNumber - 50000});
    this.setState({latestblocks:blockNumber - 1,
                    needHelpActive:[],
                    needHelpDeactive:[]});
    }
  
    Kadena.getPastEvents("NeedAHand",{fromBlock: 5000000, toBlock:this.state.latestblocks})
    .then(events=>{
    if (this._isMounted){
    this.setState({loadingchain:true})
    
    var newsort= events.concat().sort((a,b)=> 
    b.blockNumber- a.blockNumber);
    
    this.setState({needHelpActive:newsort,event_copy:newsort});
    this.setState({active_length:this.state.needHelpActive.length})
    this.setState({loadingchain:false});}
    console.log(this.state.needHelpActive)}).catch((err)=>console.error(err))
    
    //Listens for New Events
    Kadena.events.NeedAHand({fromBlock: this.state.blockNumber, toBlock:'latest'})
    .on('data', (log) => setTimeout(()=> {
    if (this._isMounted){

    this.setState({needHelpActive:[...this.state.needHelpActive,log]});
    var newest = this.state.needHelpActive
    var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);

    this.setState({needHelpActive:newsort,event_copy:newsort});
    this.setState({active_length:this.state.needHelpActive.length})}
    },10000))
    
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



	render()
  {
    
 
    let overall = '';
    
    let body = '';
    let loader = <HydroLoader/>

    

    if (typeof this.props.contracts['Kadena'].getNeededCount[this.Count] !== 'undefined' && this.state.active_length !== 'undefined') {
      
      let count = this.state.needHelpActive.length
     
			 if (overall === 0 ) {
				body = <p className="text-center not-found"><span role="img" aria-label="thinking">🤔</span>&nbsp;No events found. <a href="/createevent">Try creating one.</a></p>;
      } 
      
      else {
        
				let currentPage = Number(this.props.match.params.page);
				if (isNaN(currentPage) || currentPage < 1) currentPage = 1;

				let end = currentPage * this.perPage;
				let start = end - this.perPage;
				if (end > count) end = count;
				let pages = Math.ceil(count / this.perPage);

        let events_list = [];
        
        for (let i = start; i < end; i++) {
          events_list.push(<Event inquire={this.props.inquire}
            key={this.state.needHelpActive[i].returnValues.eventId}
            id={this.state.needHelpActive[i].returnValues.eventId}
            ipfs={this.state.needHelpActive[i].returnValues.ipfs}
            owner={this.state.needHelpActive[i].returnValues.ownerNeed} 
            account = {this.props.account}/>);
        }
        

        //events_list.reverse();

				let pagination = '';
				if (pages > 1) {
          let links = [];
          
          if (pages > 5 && currentPage >= 3){
            for (let i = currentPage - 2; i <= currentPage + 2 && i<=pages; i++) {
                 let active = i === currentPage ? 'active' : '';
               links.push(
                <li className={"page-item " + active} key={i}>
								<Link to={"/cases/" + i}  className="page-link">{i}</Link>
                </li>
              );
            } 
          }

          else if (pages > 5 && currentPage < 3){
            for (let i = 1 ; i <= 5 && i<=pages; i++) {
              let active = i === currentPage ? 'active' : '';
              links.push(
                <li className={"page-item " + active} key={i}>
								<Link to={"/cases/" + i}  className="page-link">{i}</Link>
                </li>
              );
            } 
          } 
					else{
            for (let i = 1; i <= pages; i++) {
						let active = i === currentPage ? 'active' : '';
						links.push(
							<li className={"page-item " + active} key={i}>
								<Link to={"/cases/" + i}  className="page-link">{i}</Link>
							</li>
						);
					}
        }
					pagination =
						<nav>
							<ul className="pagination justify-content-center">
								{links}
							</ul>
						</nav>
					;
				}

        body =<div >
						<div className="row user-list mt-4">
							{this.state.loadingchain? loader:events_list}
						</div>
						{pagination}
					</div>

   
				;
			}
    }


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
         <h2 className="col-lg-10 col-md-9 col-sm-8"><i className="fa fa-calendar-alt"></i> Recent Cases</h2>
         
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

CallForHelp.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state =>
{
    return {
		contracts: state.contracts,
		accounts: state.accounts
    };
};

const AppContainer = drizzleConnect(CallForHelp, mapStateToProps);
export default AppContainer;
