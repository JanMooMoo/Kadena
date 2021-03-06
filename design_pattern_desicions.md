# Design Patterns

The following Design Patterns were used in the project:

## Restricting Access
Some functions in the project can be used only by the owner of the contract. This helps to prevent unwanted changes.
For example:
```javascript
 function register(...) onlyOwner() whenNotPaused() public{
		....
	}
```


## Circuit Breaker
The project uses OpenZeppelin's contract **Pausable** to provide *Circuit Breaker Pattern* functional. It gives an ability for the owner to stop some functions in the contract if it is necessary.
For example:
```javascript
function callForHelp(...) whenNotPaused() public {
	...
}
```

## Fail early and fail loud
Functions in the project check the condition required for execution as early as possible in the function body and throw an exception if the condition is not met. It gives the ability to reduce unnecessary code execution in the event that an exception will be thrown.


## Test
Clear
