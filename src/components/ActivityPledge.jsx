import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';


class ActivityPledge extends Component {
    constructor(props) {
        super(props);
         
            this.state = {
                load:true,
                loading: false,
                loaded: false,

                commited:[],
                latestblocks:5000000,
                Kadena:'',
  
            };
        }
    componentDidMount() {
		this._isMounted = true;
            setTimeout(()=>this.loadblockhain(),1000);
        
    }

   
    

    
    async loadblockhain(){
        console.log("asasas",this.props.account)
        this.props.Kadena.getPastEvents("Pledged",{filter:{pledgedBy:this.props.account},fromBlock: 5000000, toBlock:'latest'})
    .then(events=>{

    this.setState({load:true})
    var newest = events;
    var newsort= newest.concat().sort((a,b)=> b.blockNumber- a.blockNumber);
    if (this._isMounted){
    this.setState({commited:newsort,check:newsort});
    this.setState({load:false})
    this.setState({active_length:this.state.commited.length});
        console.log("check",this.state.commited)
  	}
    }).catch((err)=>console.error(err))
    }


    parseDate = (pledge_date) => {
        let date = new Date(parseInt(pledge_date, 10) * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let pledgeDate = months[date.getMonth()]+ ". " + date.getDate() + ", " + date.getFullYear() 
        return pledgeDate    
    }

render(){
    
    

	return (
        <div className="col-lg-3 pb-4 d-flex align-items-stretch" >
              <div className="dashboard-line-card">   
              <div className="dashboard-events-caption" >
              <h3 title="Pledge Activity"><i class="far fa-chart-bar"></i> Pledged </h3>
              </div>
              <div className="dashboard-events">
              <div className="dashboard-events-list">
              {this.state.commited.map((pledged,index)=>(<h4 className="sold_text col-md-12 small" key={index}>{pledged.returnValues.sender} pledged <a href={"https://rinkeby.etherscan.io/tx/" + pledged.transactionHash} target="blank" className="gold">{pledged.returnValues.committed} {pledged.returnValues.item}</a> to <strong className="black">{pledged.returnValues.receiver}</strong> <br/><span className="date-right small">on {this.parseDate(pledged.returnValues.date)}</span></h4>
                    ))}
  					          
              </div>
            
              </div> 
              
              </div>
              </div>
	);
}
}
export default ActivityPledge;