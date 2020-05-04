import React, { Component } from 'react';

class ActivityPledge extends Component {
    constructor(props) {
        super(props);
         
            this.state = {
                loading: true,
                commited:[],
                Kadena:'',
  
            };
        }
    componentDidMount() {
		this._isMounted = true;
            setTimeout(()=>this.loadblockhain(),1000);
        
    }

    
    async loadblockhain(){

    this.props.Kadena.getPastEvents("Pledged",{filter:{pledgedBy:this.props.account},fromBlock: 5000000, toBlock:'latest'})
    .then(events=>{
    if (this._isMounted){
    var newest = events;
    var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
    
    this.setState({commited:newsort,loading:false});
    
  	}
    }).catch((err)=>console.error(err))
    }


    parseDate = (pledge_date) => {
        let date = new Date(parseInt(pledge_date, 10) * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let pledgeDate = months[date.getMonth()]+ ". " + date.getDate() + ", " + date.getFullYear() 
        return pledgeDate    
    }

    friendlyUrl = (hospitalName,EthAddress) =>{
        let rawTitle = hospitalName;
      	var titleRemovedSpaces = rawTitle;
	  	titleRemovedSpaces = titleRemovedSpaces.replace(/ /g, '-');

      	var pagetitle = titleRemovedSpaces.toLowerCase()
      	.split(' ')
      	.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
            
          window.location.href = "/hospital/"+pagetitle+"/"+EthAddress;
    }

render(){
    let body = ''
    if(this.state.loading){
     body = <div style ={{textAlign:"center"}}>
      <h5 className="spin mt-5 small"><i className="fas fa-spinner"></i></h5>
    </div>
    }
    else if(this.state.commited.length === 0 && !this.state.loading){
        body = <div style ={{textAlign:"center"}}>
            <h5 className="linkDisplay mt-5 small"><strong>No Activity</strong></h5>
        </div>
        }
    
        else body =
        <div className="dashboard-events-list">
              {this.state.commited.map((pledged,index)=>(<h4 className="col-md-12 small" key={index}><strong>{pledged.returnValues.sender}</strong> pledged <a href={"https://rinkeby.etherscan.io/tx/" + pledged.transactionHash} target="blank" className="gold">{pledged.returnValues.committed} {pledged.returnValues.item}</a> to <strong onClick={()=>this.friendlyUrl(pledged.returnValues.receiver,pledged.returnValues.pledgeTo)}>{pledged.returnValues.receiver}</strong> <br/><span className="date-right small">on {this.parseDate(pledged.returnValues.date)}</span></h4>
                    ))}
  					          
              </div>

	return (
        <div className="col-lg-3 pb-4 d-flex align-items-stretch" >
              <div className="dashboard-line-card">   
              <div className="dashboard-events-caption" >
              <h3 title="Pledge Activity"> Pledged </h3>
              </div>

              <div className="dashboard-events">
                {body}
              </div> 
              
              </div>
              </div>
	);
}
}
export default ActivityPledge;
