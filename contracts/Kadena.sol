pragma solidity ^0.4.24;
    
import 'openzeppelin-solidity/contracts/lifecycle/Pausable.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';


/**
* @title Kadena
* @dev Is a platform that Hospitals could utilize to connect & form alliance with other hospitals.
* Registered Hopitals in Kadena could call help & post/borrow essential items that they need at the moment or will be needing in the near future.
* Registered Hospital that has extra essential items could also post/give items that they think will be helpful to other hospitals.
* Every registered hospital in Kadena has a rating that corresponds to their actions on the platform.
* Some features/functions will be unavailable to a registered hospital if their rating drops a certain point.
*/

contract Kadena is Pausable {
	using SafeMath for uint;

	struct Hospital {
	    address owner;
	    string name;
	    string country;
	    string city;
	    string ipfs;
	    string status;
	    uint time;
	    bool pending;
	    bool registered;
	    uint rating;
	}
	

	struct NeedHelp {
		address owner;
		string hospital;
		string title;
		string category;
		string item;
		uint amount;
		uint committed;
		bool borrow;
		uint minimum;
		uint endDate;
		string ipfs;
	}
	
	struct GiveHelp {
		address owner;
		string hospital;
		string title;
		string category;
		string item;
		uint amount;
		uint committed;
		bool borrow;
		uint minimum;
		uint endDate;
		string ipfs;
	
	}
	
    Hospital[] private hospital;
	NeedHelp[] private needHelp;
	GiveHelp[] private giveHelp;
	
	mapping(address => uint256[]) private neededEvents;
	mapping(address => uint256[]) private givenEvents;
	mapping(address => Hospital) private registered;


		
    event RegisterHospital(address indexed owner, string hospitalName, string country, string city, string ipfs, uint time, bool pending, bool registered);	
	
	event Registration(address Admin, address indexed applicant, string registeredAs, string status, uint time, bool pending, bool indexed registrationStatus, uint rating);

	event NeedAHand(address indexed ownerNeed, uint eventId, string hospital,string title,string item, uint amount, bool borrow, uint endDate, string ipfs);
	event GiveAHand(address indexed ownerGive, uint eventId, string hospital,string title, string item, uint amount, bool borrow, uint endDate, string ipfs);

    event Pledged(address indexed pledgedBy, string sender , string receiver,uint date, uint indexed eventId, string item, uint committed, address indexed pledgeTo,uint endDate,bool borrow, uint addedRating);
    event Taken(address indexed takenBy, string receiver , string sender,uint date, uint indexed eventId,string item,uint received, address indexed tookFrom,uint endDate,bool borrow, uint addedRating);


    /**
	* @dev Function Request Hospital Registration.
	* @param _hospitalName string - Name of Hospital.
	* @param _country string - The country where the hospital is located.
	* @param _city string - The city where the hospital is located.
	* @param _ipfs - The IPFS hash containing additional information about the Hospital.

	* @notice Requires that the contract is not paused.
	* @notice Requires that the applicant address is not yet registered & does not have a pending registration.
	*/
    
	function registerHospital(
		string _hospitalName,
	    string _country,
	    string _city,
	    string _ipfs
    	)
        whenNotPaused()
		public
		
	{
	    require(registered[msg.sender].registered == false && registered[msg.sender].pending == false, "You are Registered or have pending registration");
	    
		Hospital memory _registerHospital = Hospital({
			owner: msg.sender,
			name: _hospitalName,
		    country: _country,
			city: _city,
			ipfs: _ipfs,
			status: "Unregistered",
			time: now,
			pending: true,
			registered: false,
			rating:0
			
		});
		uint _hospitalID = hospital.push(_registerHospital).sub(1);
		registered[msg.sender].owner = msg.sender;
		registered[msg.sender].name = _hospitalName;
		registered[msg.sender].country = _country;
		registered[msg.sender].city = _city;
		registered[msg.sender].ipfs = _ipfs;
		registered[msg.sender].status = "Unregistered";
		registered[msg.sender].time = now;
		registered[msg.sender].pending = true;
		registered[msg.sender].registered = false;
		emit RegisterHospital(msg.sender, _hospitalName, _country, _city, _ipfs, now, true, false);
	}
	
	/**
	* @dev Function to Accept/Reject or Revoke Registration .
	* @param _applicant address - The Ethereum Address of the applicant.
	* @param _accepted - If true Ethereum Address Registration is accepted.

	* @notice Requires that the contract is not paused.
	* @notice Requires that the approver is the owner of contract.
	* @notice Requires that the applicant address does not have a pending registration.
	*/
	
    function register(address _applicant, bool _accepted)
		public
		onlyOwner()
		whenNotPaused()

	{
	    if(_accepted){
	    require(registered[_applicant].pending , "Status not Pending");
        registered[_applicant].status = "Registered";
		registered[_applicant].time = now;
        registered[_applicant].pending = false;
        registered[_applicant].registered = true;
        registered[_applicant].rating = 35;
	    }
        
        else{
        registered[_applicant].status = "Rejected";
		registered[_applicant].time = now;
        registered[_applicant].pending = false;
        registered[_applicant].registered = false;
  
        }
        emit Registration(msg.sender, registered[_applicant].owner,registered[_applicant].name,registered[_applicant].status,now,registered[_applicant].pending,registered[_applicant].registered,registered[_applicant].rating);
	}
	
	/**
	* @dev Function to show information about the hospital.
	* @param _owner address - The Ethereum Address of the hospital.
	* @return _hospitalName string - The name of the hospital.
	* @return _country string - The country where the hospital is located.
	* @return _city string - The city where the hospital is located.
	* @return _ipfs string - The IPFS hash containing additional information about event.
	* @return _pending bool - If true account has a pending registration.
	* @return _registered bool - If true account is registered.
	* @return _time uint - time of registration.
	* @return _rating uint - The rating of the account.

	*/
	

	function getHospitalStatus(address _owner)
	    public
	    view
	    returns(
	        string _hospitalName,
	        string _country,
	        string _city,
	        string _ipfs,
	        bool _pending, 
	        bool _registered,
	        uint _time,
	        uint _rating
	    ){
	   Hospital memory _registerhospital = registered[_owner];
	    return(

		    _registerhospital.name,
			_registerhospital.country,
			_registerhospital.city,
			_registerhospital.ipfs,
			_registerhospital.pending,
			_registerhospital.registered,
			_registerhospital.time,
			_registerhospital.rating
			
		);
	}
	
	
    /**
	* @dev Function creates the event to Call For Help.
	* @param _title string - The title of the event.
	* @param _category string - The category of the item.
	* @param _item string - The name of item.
	* @param _amount uint - The total amount of items needed.
	* @param _borrow bool - True if the items is expected to be returned in the future.
	* @param _minimumAmount - minimum amount to pledge.
	* @param _endDate - End date of the event.
	* @param _ipfs - The IPFS hash containing additional information about the event.

	* @notice Requires that the contract is not paused.
    * @notice Requires that the sender is registered.
	* @notice Requires that the event time is in the future.
	* @notice Requires that the sender rating is greater than or equal to 20.
    * @notice Requires that the amount is greater than 0.
	*/
	
	function callForHelp(
		string _title,
		string _category,
		string _item,
		uint _amount,
		bool _borrow,
		uint _minimumAmount,
		uint _endDate,
		string _ipfs
	
	)
    whenNotPaused()
		public
	{
	    require(registered[msg.sender].registered == true && registered[msg.sender].pending == false, "You are Not Registered");
	    require(now < _endDate);
	    require(registered[msg.sender].rating > 20);
	    require(_amount > 0 && _minimumAmount <= _amount);
   
		NeedHelp memory _event = NeedHelp({
			owner: msg.sender,
			hospital: registered[msg.sender].name,
			title: _title,
			category: _category,
			item: _item,
			amount: _amount,
			committed:0,
			borrow: _borrow,
			minimum: _minimumAmount,
			endDate: _endDate,
			ipfs: _ipfs
			
			
		});
      	uint _eventId = needHelp.push(_event).sub(1);
		neededEvents[msg.sender].push(_eventId);
		
		if(registered[msg.sender].rating >= 25){
		    uint _subtractedRating = 5;
		    
		}
		else {
		    _subtractedRating = registered[msg.sender].rating - 20;
		   
		}
	    
		registered[msg.sender].rating = registered[msg.sender].rating.sub(_subtractedRating);
		emit NeedAHand(msg.sender, _eventId,registered[msg.sender].name,_title,_item, _amount, _borrow,_endDate,_ipfs); 

	}
	
	/**
	* @dev Function creates the event to Provide Assistance.
	* @param _title string - The title of the event.
	* @param _category string - The category of the item.
	* @param _item string - The name of item.
	* @param _amount uint - The total amount of items to be given.
	* @param _borrow bool - True if the items is expected to be returned in the future.
	* @param _minimumAmount - minimum amount to take.
	* @param _endDate - End date of the event.
	* @param _ipfs - The IPFS hash containing additional information about the event.

	* @notice Requires that the contract is not paused.
    * @notice Requires that the sender is registered.
	* @notice Requires that the event time is in the future.
    * @notice Requires that the amount is greater than 0.
	*/
	
	function provideAssistance(
		string _title,
		string _category,
		string _item,
		uint _amount,
		bool _borrow,
		uint _minimumAmount,
		uint _endDate,
		string _ipfs
	
	)
    whenNotPaused()
		public
	{
	    require(registered[msg.sender].registered == true && registered[msg.sender].pending == false, "You are Not Registered");
	    require(now < _endDate);
	    require(_amount > 0 && _minimumAmount <= _amount);
   
		GiveHelp memory _event = GiveHelp({
			owner: msg.sender,
			hospital: registered[msg.sender].name,
			title: _title,
			category: _category,
			item: _item,
			amount: _amount,
			committed:_amount,
			borrow: _borrow,
		    minimum: _minimumAmount,
			endDate: _endDate,
			ipfs: _ipfs
			
		});
      	uint _eventId = giveHelp.push(_event).sub(1);
		givenEvents[msg.sender].push(_eventId);
		if(registered[msg.sender].rating < 55){
		    uint _addedRating = 5;
		    
		}
		else {
		    _addedRating = 60 - registered[msg.sender].rating;
		    
		}
	    
		if(registered[msg.sender].rating < 60){
		registered[msg.sender].rating = registered[msg.sender].rating.add(_addedRating);}
		
		emit GiveAHand(msg.sender, _eventId,registered[msg.sender].name,_title,_item, _amount, _borrow,_endDate,_ipfs);  
  
	}
	
	/**
	* @dev Function to show information about give assitance event.
	* @param _id uint - Event ID.
	* @return title string - The title of the event.
	* @return category string - The category of needed item.
	* @return item string - The name of the item.
	* @return amount uint - The total amount of items.
	* @return committed uint - The amount of items left.
	* @return borrow bool - True if the item is to be returned in the future.
	* @return startDate uint - Start date of the event.
	* @return endDate uint - End date of the event.
	* @return ipfs string - The IPFS hash containing additional information about event.
	* @return owner address - The owner of the event.

	* @notice Requires that the events exist.
	*/
	
	function provideAssistanceDetails(uint _id)
		public
		view
	    returns(
		    string title,
		    string category,
	    	string item,
	    	uint amount,
	    	uint committed,
	    	bool borrow,
	    	uint minimum,
	    	uint endDate,
	    	string ipfs,
	    	address owner
    	) {
	    require(_id < giveHelp.length);
	    GiveHelp memory _event = giveHelp[_id];
		return(
			_event.title,
			_event.category,
			_event.item,
			_event.amount,
			_event.committed,
			_event.borrow,
			_event.minimum,
			_event.endDate,
			_event.ipfs,
			_event.owner
		);
	}
	
    /**
	* @dev Function to show information about call for help event.
	* @param _id uint - Event ID.
	* @return title string - The title of the event.
	* @return category string - The category of needed item.
	* @return item string - The name of the item.
	* @return amount uint - The amount of items needed.
	* @return commited uint - The amount of items currently committed.
	* @return borrow bool - True if the item is to be returned in the future.
	* @return startDate uint - Start date of the event.
	* @return endDate uint - End date of the event.
	* @return ipfs string - The IPFS hash containing additional information about event.
	* @return owner address - The owner of the event.

	* @notice Requires that the events exist.
	*/
	
	function callForHelpDetails(uint _id)
		public
		view
	    returns(
		    string title,
		    string category,
	    	string item,
	    	uint amount,
	    	uint committed,
	    	bool borrow,
	    	uint minumum,
	    	uint endDate,
	    	string ipfs,
	    	address owner
    	) {
	    require(_id < needHelp.length);
	    NeedHelp memory _event = needHelp[_id];
		return(
			_event.title,
			_event.category,
			_event.item,
			_event.amount,
			_event.committed,
			_event.borrow,
			_event.minimum,
			_event.endDate,
			_event.ipfs,
			_event.owner
		);
	}
	
	/**
	* @dev Function to give item to the needed asstistance pool.
	* @param _eventId - The ID of the Call for Help Event.
	* @param _commit - The amount of the item to commit.
	
    * @notice Requires that the event exist.
    * @notice Requires that the commit is greater than 0.
    * @notice Requires that the amount of items to give is <= total needed items in the pool.
    * @notice Requires that the amount of items to give is <= current needed items in the pool.
    * @notice Requires that the giver is not the creator of the event.
    * @notice Requires that the events hasn't ended yet.
	*/
	
	function pledge(uint _eventId, uint _commit)
	    whenNotPaused()
		public
		
	{   require(registered[msg.sender].registered == true && registered[msg.sender].pending == false, "You are Not Registered");
	    require(_eventId < needHelp.length);
		NeedHelp memory _event = needHelp[_eventId];
		
		require(_commit > 0);
		require(_commit <= needHelp[_eventId].amount && _commit <= needHelp[_eventId].amount.sub(needHelp[_eventId].committed));
		
		 if((needHelp[_eventId].amount - needHelp[_eventId].committed) >= needHelp[_eventId].minimum){
	      require(_commit >= needHelp[_eventId].minimum);
	    }
		require(msg.sender != needHelp[_eventId].owner);
		require(needHelp[_eventId].endDate > now);
		
		
		needHelp[_eventId].committed = needHelp[_eventId].committed.add(_commit);
		if (registered[msg.sender].rating <= 57){
		    uint _addedRating = 3;
	
		}
		else{
		    _addedRating = 60 - registered[msg.sender].rating;
		}
		registered[msg.sender].rating = registered[msg.sender].rating.add(_addedRating);
		emit Pledged(msg.sender,registered[msg.sender].name, registered[needHelp[_eventId].owner].name,now, _eventId,needHelp[_eventId].item, _commit, needHelp[_eventId].owner,needHelp[_eventId].endDate,needHelp[_eventId].borrow, _addedRating);
	}
	
	
	/**
	* @dev Function to take item from the given asstistance pool.
	* @param _eventId - The ID of the Assistance Event.
	* @param _take - The amount of the item to take.
	
    * @notice Requires that the event exist.
    * @notice Requires that the sender rating is greater than or equal to 10.
    * @notice Requires that the amount to take is greater than 0.
    * @notice Requires that the amount to take is greater than minimum.
    * @notice Requires that the amount of items to take is <= current available items in the pool.
    * @notice Requires that the taker is not the creator of the event.
    * @notice Requires that the events hasn't ended yet.
	*/
	
	function take(uint _eventId, uint _take)
	    whenNotPaused()
		public
		
	{	require(registered[msg.sender].registered == true && registered[msg.sender].pending == false, "You are Not Registered");
	    require(_eventId < giveHelp.length);
	  
		GiveHelp memory _event = giveHelp[_eventId];
		
		require(registered[msg.sender].rating > 10);
	    require(_take > 0 && _take <= giveHelp[_eventId].committed);
	    
	    if(giveHelp[_eventId].committed >= giveHelp[_eventId].minimum){
	      require(_take >= giveHelp[_eventId].minimum);
	    }
		require(msg.sender != giveHelp[_eventId].owner);
	    require(giveHelp[_eventId].endDate > now);
		
		giveHelp[_eventId].committed = giveHelp[_eventId].committed.sub(_take);
	
		if (registered[msg.sender].rating >= 13){
		    uint _subtractRating = 3;
		}
		
		else{
		    _subtractRating = registered[msg.sender].rating - 10;
		}
		
		registered[msg.sender].rating = registered[msg.sender].rating.sub(_subtractRating);
		emit Taken(msg.sender,registered[msg.sender].name, registered[giveHelp[_eventId].owner].name,now, _eventId,giveHelp[_eventId].item,_take, giveHelp[_eventId].owner,giveHelp[_eventId].endDate,giveHelp[_eventId].borrow, _subtractRating);
	}
	


	/**
	* @dev Function to show events of the specified address.
	* @param _owner address - The address to query the events of.
	* @return uint[] - Array of events IDs.
	*/
	function needsOf(address _owner) public view returns(uint[]) {
		return neededEvents[_owner];
	}
	
	function assistsOf(address _owner) public view returns(uint[]) {
		return givenEvents[_owner];
	}


	/**
	* @dev Function returns number of all events.
	* @return uint - Number of events.
	*/
	function getNeededCount() public view returns(uint) {
		return needHelp.length;
	}
	
	function getAssistCount() public view returns(uint) {
		return giveHelp.length;
	}
	

	
}