import React, { Component } from 'react';

class ActivityTake extends Component {
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

        this.props.Kadena.getPastEvents("Taken",{filter:{takenBy:this.props.account},fromBlock: 5000000, toBlock:'latest'})
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

    friendlyUrl = (hospitalName,EthAddress) =>{
        let rawTitle = hospitalName;
      	var titleRemovedSpaces = rawTitle;
	  	titleRemovedSpaces = titleRemovedSpaces.replace(/ /g, '-');

      	var pagetitle = titleRemovedSpaces.toLowerCase()
      	.split(' ')
      	.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
            
          window.location.href = "/hospital/"+pagetitle+"/"+EthAddress;
          //this.props.history.push("/hospital/"+pagetitle+"/"+EthAddress);
    }

render(){
    
    

	return (
        <div className="col-lg-3 pb-4 d-flex align-items-stretch" >
              <div className="dashboard-line-card">   
              <div className="dashboard-events-caption" >
              <h3 title="Pledge Activity"> Taken </h3>
              </div>
              <div className="dashboard-events">
              <div className="dashboard-events-list">
              {this.state.commited.map((taken,index)=>(<h4 className="col-md-12 small" key={index}><strong>{taken.returnValues.receiver}</strong> took <a href={"https://rinkeby.etherscan.io/tx/" + taken.transactionHash} target="blank" className="gold">{taken.returnValues.received} {taken.returnValues.item}</a> from <strong onClick={()=>this.friendlyUrl(taken.returnValues.sender,taken.returnValues.tookFrom)}>{taken.returnValues.sender}</strong> <br/><span className="date-right small">on {this.parseDate(taken.returnValues.date)}</span></h4>
                    ))}
  					          
              </div>
            
              </div> 
              
              </div>
              </div>
	);
}
}
export default ActivityTake;
