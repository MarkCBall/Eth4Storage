# Transcript Blockchain project

This frontend interfaces with a ropstein ethereum smart contract manages authentication based on ethereum addresses and signed messages:
<br><br>
-A user signs into the frontend by the login button. The user is prompted to sign a string, the client and server then calculates the address the user signed in from and restricts functionality accordingly. Both client and server are able verify the user owns the ethereum address.
<br><br>
-The solidity smart contract enables on ethereum address to become an "account owner" representing a student, whereby they can grant permissions to users of their account. They can grant access to school administrators to add transcript data or to other users to view their transcript information.
<br><br>
On the upload page, administrators are able to upload a string representing transcript grades/info.Similarly, all the uploaded data is displayed on the download page to both admin and view only permissioned users. This data is restricted by the smart contract and account number.

#### NOTE---You must have created an account AND be logged in with that account to see the account owner's functionality.
<br><br>


From the terminal do the following commands to start the app on<br>
NPM Install in the MyServer Directory<br>
NPM Start in the MyServer Directory<br>
NPM Install in the frontend Directory<br>
NPM Start in the frontend Directory<br>


