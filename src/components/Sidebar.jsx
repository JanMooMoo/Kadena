import React, { Component } from 'react';
import {Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import makeBlockie from 'ethereum-blockies-base64';


class Sidebar extends Component
{

	constructor(props, context)
  {
	  super(props);
	  
	}
	

	sidebarClick()
	{
		this.props.refresh()
		var isActive = this.context.router.route.location.pathname;
		var activeClassName = "";
		var linkLocation = this.props.to;

		if (isActive === linkLocation) {
			activeClassName = 'nav-item active';
		} else {
			activeClassName = 'nav-item';
		}
		
	}


	toggleSidebarClass = () => {
    const oldSidebarClassName = document.getElementById('sidebar-wrapper').className;
    const newSidebarClassName = oldSidebarClassName === 'my-sidebar sidebar-closed' ? 'my-sidebar sidebar-open' : 'my-sidebar sidebar-closed'

		const oldPageWrapperClassName = document.getElementById('page-content-wrapper').className;
		const newPageWrapperClassName = oldPageWrapperClassName === 'sidebar-closed' ? 'sidebar-open' : 'sidebar-closed'

    document.getElementById('sidebar-wrapper').className = newSidebarClassName;
		document.getElementById('page-content-wrapper').className = newPageWrapperClassName;
  }



	render() {

		let registration = "Unknown"
		let ethAccount = "Unknown"
		let Hospital = "Unknown"
		let rating = 0;
		
		if(this.props.connection === true && this.props.account.length !== 0){			
			ethAccount = this.props.account.slice(0, 16) + '...';
			Hospital = this.props.accountDetails[0];
			rating = this.props.accountDetails[7];

			if(!this.props.accountDetails[4] && !this.props.accountDetails[5]){
			registration = "Unregistered"}

			else if(this.props.accountDetails[4]){
			registration = "Pending"}

			else{
				registration = "Registered"
			}
		}
		

		let user =
			<div>
				<div className="user-status-icon">
				<img src='/images/FlagPH2.png' alt="flag"></img>
				</div>
			</div>
		;

		
		let stars ='';

		if (rating < 20 ){
			stars = <div className="rating" title="Account Rating" ><i class="far fa-star"/><i class="far fa-star"/><i class="far fa-star"/><i class="far fa-star"/><i class="far fa-star"/></div>}
		else if (rating <= 25){
			stars = <div className="rating" title="Account Rating"><i class="fas fa-star"/><i class="far fa-star"/><i class="far fa-star"/><i class="far fa-star"/><i class="far fa-star"/></div>}
		else if (rating <= 30){
			stars = <div className="rating" title="Account Rating"><i class="fas fa-star"/><i class="fas fa-star"/><i class="far fa-star"/><i class="far fa-star"/><i class="far fa-star"/></div>}
		else if (rating <= 35){
			stars = <div className="rating" title="Account Rating"><i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/><i class="far fa-star"/><i class="far fa-star"/></div>}
		else if (rating <=40){
			stars = <div className="rating" title="Account Rating"><i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/><i class="far fa-star"/></div>}
		else {
			stars = <div className="rating" title="Account Rating"><i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/><i class="fas fa-star"/></div>
		};

		
		let account =
			<div className="profile">
				<p className="mt-3 small" title="Account Status"><span>Status: <span className={registration}>{registration}</span></span></p>
				<p className="mt-3 small" title={this.props.account}><span >{ethAccount}</span></p>
				<p className="mt-3 small" title="Hospital Name"><span>{Hospital}</span></p>
				<p className="mt-3 small" title={rating}><span>Rating: {rating} {stars}</span></p>
			</div>
		;

		if (this.props.connection === true && this.props.account.length !== 0) {
			user =
				<div>
					<div className="user-status-icon">
						<a href="/"><img src={makeBlockie(this.props.account)} alt={this.props.account} /></a>
					</div>
					{/* {this.props.account} */}
				</div>
			;


		}
		if(this.props.account.length === 0)

		 return (
			<div id="sidebar-wrapper" className="my-sidebar sidebar-closed">
				<div className="hamburgerNav" onClick={this.toggleSidebarClass}>
					<i className="fa fa-bars"></i>
				</div>
				<div className="user-status mt-5">
					{user}
				</div>
					<div className="menu mt-4">
					<div className = "toggleHidden">
					<h5 className="kadena">KaDEnA</h5>
					{account}
					</div>
					</div>
					<div className="menu mt-4">
					<ul className="nav flex-column">
						<li>
							<NavLink to="/needhelp/1" className="nav-link" activeClassName="nav-link-active" onClick={() => {this.sidebarClick(this)}}><i className="fa fa-search"  title="Need Help"></i> <span className="toggleHidden"> Need Help Section</span></NavLink>
						</li>

						<li>
							<NavLink to="/givehelp/1" className="nav-link" activeClassName="nav-link-active"onClick={() => {this.sidebarClick(this)}} ><i class="fas fa-search-plus" title="Give Help"></i> <span className="toggleHidden"> Give Help Section</span></NavLink>
						</li>
						<li>
							<a href="http://covid-19-ph-app.herokuapp.com/" target ="blank" className="nav-link"><i class="fas fa-map-marker-alt" title="Covid-19 Philippines"></i> <span className="toggleHidden"> Covid-19 Cases Philippines</span></a>
						</li>
					</ul>
					<h5 className="mt-5 toggleHidden">Manage</h5>
					<ul className="nav flex-column">
						
						<li>
							<NavLink to="/register" className="nav-link" activeClassName="nav-link-active" onClick={() => {this.sidebarClick(this)}}><i className="fa fa-edit"  title="Edit"></i> <span className="toggleHidden">Register/Create Post</span></NavLink>
						</li>
						<li>
							<NavLink to="/hospital-list" className="nav-link" activeClassName="nav-link-active" onClick={() => {this.sidebarClick(this)}}><i class="fas fa-list-ul" title="List of Hospitals"></i> <span className="toggleHidden"> List of Hospitals</span></NavLink>
						</li>
						
					</ul>
					<h5 className="mt-5 toggleHidden">Tools</h5>

					<ul className="nav flex-column">

					<li>
						<NavLink to="/about" className="nav-link" activeClassName="nav-link-active" onClick={() => {this.sidebarClick(this)}}><i class="fas fa-dice-d20" title="About"></i> <span className="toggleHidden">About</span></NavLink>
					</li>
					
					<li>
						<NavLink to="/how-it-works" className="nav-link" activeClassName="nav-link-active" onClick={() => {this.sidebarClick(this)}}><i className="fa fa-question-circle" title="How It Works"></i> <span className="toggleHidden">How It Works</span></NavLink>
					</li>
					
					<li>
							<NavLink to="/requirements" className="nav-link" activeClassName="nav-link-active" onClick={() => {this.sidebarClick(this)}}><i class="fas fa-prescription" title = "Requirements"></i> <span className="toggleHidden">Requirements</span></NavLink>
						</li>

					<li >
					<div className="nav-link" onClick={() => {this.props.connect()}}><i className="fas fa-plug" title="Connect Eth Account"></i> <span className="toggleHidden"> Connect Wallet</span></div>
					</li>	
					</ul>
					
					<br />
					<a aria-label="Homepage" target ="blank" title="GitHub" className="github footer-octicon d-none d-lg-block mx-lg-4" href="https://github.com/JanMooMoo/Kadena">
      			<svg height="32" className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill="rgb(162, 183, 207)" fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
					</a>
				</div>
			</div>

		)

		else return (
			<div id="sidebar-wrapper" className="my-sidebar sidebar-closed">
				<div className="hamburgerNav" onClick={this.toggleSidebarClass}>
					<i className="fa fa-bars"></i>
				</div>
				<div className="user-status mt-5">
					{user}
				</div>
					<div className="menu mt-4">
					<div className = "toggleHidden">
					<h5 className="kadena">KaDEnA</h5>
					{account}
					</div>
					</div>
					<div className="menu mt-4">
					<ul className="nav flex-column">
					<li>
							<NavLink to="/needhelp/1" className="nav-link" activeClassName="nav-link-active" onClick={() => {this.sidebarClick(this)}}><i className="fa fa-search"  title="Need Help"></i> <span className="toggleHidden"> Need Help Section</span></NavLink>
						</li>

						<li>
							<NavLink to="/givehelp/1" className="nav-link" activeClassName="nav-link-active"onClick={() => {this.sidebarClick(this)}} ><i class="fas fa-search-plus" title="Give Help"></i> <span className="toggleHidden"> Give Help Section</span></NavLink>						
						</li>
						<li>
							<a href="http://covid-19-ph-app.herokuapp.com/" target ="blank" className="nav-link"><i class="fas fa-map-marker-alt" title="Covid-19 Philippines"></i> <span className="toggleHidden"> Covid-19 Cases Philippines</span></a>
						</li>
							
					</ul>
					<h5 className="mt-5 toggleHidden">Manage </h5>
					<ul className="nav flex-column">
						
						<li>
							<NavLink to="/myhospital" className="nav-link" activeClassName="nav-link-active" onClick={() => {this.sidebarClick(this)}}><i class="fas fa-hospital-symbol" title="Hospital Profile"></i> <span className="toggleHidden">Hospital Profile</span></NavLink>
						</li>

						<li>
							<NavLink to="/register" className="nav-link" activeClassName="nav-link-active" onClick={() => {this.sidebarClick(this)}}><i className="fa fa-edit"  title="Edit"></i> <span className="toggleHidden">Register/Create Post</span></NavLink>
						</li>

						<li>
							<NavLink to="/hospital-list" className="nav-link" activeClassName="nav-link-active" onClick={() => {this.sidebarClick(this)}}><i class="fas fa-list-ul" title="List of Hospitals"></i> <span className="toggleHidden"> List of Hospitals</span></NavLink>
						</li>						

					</ul>

					<h5 className="mt-5 toggleHidden">Tools</h5>
					<ul className="nav flex-column">
						
						<li>
							<NavLink to="/about" className="nav-link" activeClassName="nav-link-active" onClick={() => {this.sidebarClick(this)}}><i class="fas fa-dice-d20" title="About"></i> <span className="toggleHidden">About</span></NavLink>
						</li>

						<li>
							<NavLink to="/how-it-works" className="nav-link" activeClassName="nav-link-active" onClick={() => {this.sidebarClick(this)}}><i className="fa fa-question-circle" title="How It Works"></i> <span className="toggleHidden">How It Works</span></NavLink>
						</li>
						
						<li>
							<NavLink to="/requirements" className="nav-link" activeClassName="nav-link-active" onClick={() => {this.sidebarClick(this)}}><i class="fas fa-prescription" title = "Requirements"></i> <span className="toggleHidden">Requirements</span></NavLink>
						</li>

						<li>
							<NavLink to="/admin" className="nav-link" activeClassName="nav-link-active" onClick={() => {this.sidebarClick(this)}}><i class="fas fa-user-lock" title="Admin Page"></i> <span className="toggleHidden">Admin</span></NavLink>
						</li>
						
					</ul>
					<a aria-label="Homepage" target ="blank"title="GitHub" className="github footer-octicon d-none d-lg-block mx-lg-4 mt-3" href="https://github.com/JanMooMoo/Kadena">
      			<svg height="32" className="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill="rgb(162, 183, 207)" fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
					</a>
				</div>
			</div>
		);
		
	}
}

Sidebar.contextTypes = {
    router: PropTypes.object
};

export default Sidebar;


