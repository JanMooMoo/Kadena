import React,{Component} from 'react';
import {Modal} from 'react-bootstrap';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';

export class ModalPledge extends Component{


    componentDidMount(){
        this._isMounted = true;
       
       }
       
componentWillUnmount(){
  this._isMounted = false;
}

constructor(props,context){
    super(props)
    this.contracts = context.drizzle.contracts;
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
    },()=>console.log());
    
}

pledge = ()=>{
    this.contracts['Kadena'].methods.pledge.cacheSend(this.props.id,this.state.amount)
    }
  
  

    render(){
      let minimum = this.props.minimum
        let disabled = false 
      
        if(this.state.amount < 1 || this.state.amount > this.props.amount - this.props.committed){
            disabled = true
        }
        if(Number(this.props.amount) - Number(this.props.committed) >=Number(this.props.minimum)){
            if(Number(this.state.amount) < Number(this.props.minimum)){
             disabled = true;
            }
        
          }
          else{
            minimum = Number(this.props.amount) - Number(this.props.committed)
            if(Number(this.state.amount) !== Number(minimum)){
              disabled = true;
             }
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
					<small className="form-text text-muted">Minimum of {minimum} items to pledge.</small>	
		    </div>
		</div>
    
            <button className="btn btn-outline-dark" title="Pledge" onClick={this.pledge} disabled={disabled}>Pledge</button>
            <button className="btn btn-outline-dark ml-2" title="Cancel" onClick={this.props.onHide}>Cancel</button>
       
      
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