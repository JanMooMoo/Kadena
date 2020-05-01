import React, { Component } from 'react';


class ActivityLendAHand extends Component {
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

        this.props.Kadena.getPastEvents("GiveAHand",{filter:{ownerGive:this.props.account},fromBlock: 5000000, toBlock:'latest'})
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
            
          this.props.history.push("/give/"+pagetitle+"/"+eventId);
    }

render(){
    

	return (
        <div className="col-lg-3 pb-4 d-flex align-items-stretch" >
              <div className="dashboard-line-card">   
              <div className="dashboard-events-caption" >
              <h3 title="Pledge Activity"> Lend A Hand </h3>
              </div>
              <div className="dashboard-events">
              <div className="dashboard-events-list">
              {this.state.commited.map((lend,index)=>(<h4 className="col-md-12 small" key={index}><strong>{lend.returnValues.hospital}</strong> lend a hand of <strong className="gold" onClick={()=>this.friendlyUrl(lend.returnValues.title,lend.returnValues.eventId)}>{lend.returnValues.amount} {lend.returnValues.item}</strong></h4>
                ))}
  					          
              </div>
            
              </div> 
              
              </div>
              </div>
	);
}
}
export default ActivityLendAHand;