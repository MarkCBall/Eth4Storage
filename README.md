# Eth4Storage

### The frontend is not handling errors, as such metamask must be initialized recently for funtionality to work. The download page does not automatically update when global state changes - please navigate back to it AFTER logging in.
##### Priom has seen the functionality in class. An account must be created on ethereum and the client must be signed in to access front-end functionality to interface with smart contract account.

This frontend interfaces with a ropstein ethereum smart contract manages authentication based on ethereum addresses and signed messages:
<br><br>
-A user signs into the frontend by the login button. The user is prompted to sign a string representing the current time. The client (in future server) then calculates the address the user signed in from and restricts functionality accordingly. Both client and server are able verify the user owns the ethereum address.
<br><br>
-The solidity smart contract enables on ethereum address to become an "account owner", whereby they can grant permissions to users of their account. Users can currently be given read access or read+write access. The users management page interfaces with the smart contract. 
#### NOTE---You must have created an account AND be logged in with that account to see the account owner's functionality.
<br><br>

# Development notes and areas for requested feedback
Global state (via redux) is created in the header component. How should this be done?
<br><br>
The download page runs calculations based on the global state. How can these calculations only be commenced AFTER the global state is set? Also and possibly related, the component bugs out when local state is calculated in the constructor, a temp fix has been to put this function call in componentDidMount() but it also means that the state is not automatically re-rendered when other state changes?

# File structure
## Solidity (Industry Applications)
The solidity smart contract and associated tests
## Server
No meaningful files here other than playing with cors access. You can skip
## Frontend (Full Stack III)
Contains the frontend that links into the solidity smart contract.
<br>
-The download page is a work in progess. Currently it shows the access granted to the account which is logged in.


<br>
From the terminal do the following commands to start the app on localhost:3000:
NPM Install<br>
NPM Start<br>


