import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ActivityCallForHelp extends Component {
    constructor(props) {
        super(props);
         
            this.state = {
                loading: false,
                commited:[],
                Kadena:'',
  
            };
        }
    componentDidMount() {
		this._isMounted = true;
            setTimeout(()=>this.loadblockhain(),1000);
        
    }

   
    

    
    async loadblockhain(){

        this.props.Kadena.getPastEvents("NeedAHand",{filter:{ownerNeed:this.props.account},fromBlock: 5000000, toBlock:'latest'})
    .then(events=>{

    var newest = events;
    var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
    if (this._isMounted){
    this.setState({commited:newsort});
  	}
    }).catch((err)=>console.error(err))
    }


    parseDate = (pledge_date) => {
        let date = new Date(parseInt(pledge_date, 10) * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let pledgeDate = months[date.getMonth()]+ ". " + date.getDate() + ", " + date.getFullYear() 
        return pledgeDate    
    }

    friendlyUrl = (page,eventId) =>{
        let rawTitle = page;
      	var titleRemovedSpaces = rawTitle;
	  	titleRemovedSpaces = titleRemovedSpaces.replace(/ /g, '-');

      	var pagetitle = titleRemovedSpaces.toLowerCase()
      	.split(' ')
      	.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
            
          //window.location.href = "/event/"+pagetitle+"/"+eventId;
          this.props.history.push("/event/"+pagetitle+"/"+eventId);
    }

render(){
    
    //{this.state.commited.map((pledged,index)=>(<h4 className="col-md-12 small" key={index}><strong>{pledged.returnValues.sender}</strong> pledged <a href={"https://rinkeby.etherscan.io/tx/" + pledged.transactionHash} target="blank" className="gold">{pledged.returnValues.committed} {pledged.returnValues.item}</a> to <strong onClick={()=>this.friendlyUrl(pledged.returnValues.receiver,pledged.returnValues.pledgeTo)}>{pledged.returnValues.receiver}</strong> <br/><span className="date-right small">on {this.parseDate(pledged.returnValues.date)}</span></h4>


	return (
        <div className="col-lg-3 pb-4 d-flex align-items-stretch" >
              <div className="dashboard-line-card">   
              <div className="dashboard-events-caption" >
              <h3 title="Pledge Activity"><i class="far fa-chart-bar"></i> Call For Help </h3>
              </div>
              <div className="dashboard-events">
              <div className="dashboard-events-list">
              {this.state.commited.map((pledged,index)=>(<h4 className="col-md-12 small" key={index}><strong>{pledged.returnValues.hospital}</strong> called for help for <strong className="gold" onClick={()=>this.friendlyUrl(pledged.returnValues.title,pledged.returnValues.eventId)}>{pledged.returnValues.amount} of {pledged.returnValues.item}</strong></h4>
                ))}
  					          
              </div>
            
              </div> 
              
              </div>
              </div>
	);
}
}
export default ActivityCallForHelp;
