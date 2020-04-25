import React,{Component} from 'react';
import {Modal} from 'react-bootstrap';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';

export class ModalPledge extends Component{

     _isMounted = false; 

    componentDidMount(){
        this._isMounted = true;
        
        //this.toastinfo();
        //this.loadBlockchainData();
       
       }
       
componentWillUnmount(){

  this._isMounted = false;
}

constructor(props,context){
    super(props)
    this.contracts = context.drizzle.contracts;
    this.account = this.props.accounts[0];
    this.state = {

        summaryModalShow: false,
        hide:this.props.onHide,
        loading:true,
        amount:0,
        
    }

  }

  //amountChange
  amountChange = (event) => {		
    let amount = event.target.value;
    this.setState({
        amount: amount
    },()=>console.log("amount",this.state.amount));
    
}

pledge = ()=>{
    console.log("rarara", this.state.amount)
    console.log("MOdalPage",this.props.account)
    let pledge = this.contracts['Kadena'].methods.pledge.cacheSend(this.props.id,this.state.amount,{from:this.account})
}
  

    render(){
        const{loading} = this.state
        let disabled = false 

        if(this.state.amount < 1 || this.state.amount > this.props.amount - this.props.committed){
            disabled = true
        }
    return( 
      
      <Modal
        {...this.props}
        size="md"
        height="200px"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        
      <Modal.Header className="modalpie" closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        <div className="banana3">Pledge to {this.props.hospital}</div>
      </Modal.Title>
      </Modal.Header> 
        
      <Modal.Body> 
      <h5 className="banana3">Item Needed: {this.props.item}</h5>
      <p className="banana3">Current Amount Committed: {this.props.committed}/{this.props.amount}</p>
      
      <div className="form-group row">
			<div className="col-lg-12">
				<label htmlFor="amount">You Will Pledge: {this.state.amount}</label>
					<div className="input-group mb-3">
					<div className="input-group-prepend">
					<span className="input-group-text">Amount</span>
					</div>
					<input type="number" min="1" className={"form-control "} id="amount" title={"Amount Needed"} autoComplete="off" onChange={this.amountChange} />
			    </div>
						
		    </div>
		</div>
    
            <button className="btn btn-outline-dark" title="Make Your Event Live" onClick={this.pledge} disabled={disabled}>Pledge</button>
            <button className="btn btn-outline-dark ml-2" title="Make Your Event Live" onClick={this.props.onHide}>Cancel</button>
       
      
      </Modal.Body>
            
      

      </Modal>
      )
    }

}

ModalPledge.contextTypes = {
    drizzle: PropTypes.object
}

const mapStateToProps = state => {
    return {
		contracts: state.contracts,
		accounts: state.accounts,
		transactionStack: state.transactionStack
    };
};

const AppContainer = drizzleConnect(ModalPledge, mapStateToProps);
export default AppContainer;