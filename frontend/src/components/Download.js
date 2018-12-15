import React, { Component } from 'react';
import {connect} from 'react-redux';


class Download extends Component {
    constructor(props) {
        super(props);
        this.state = {
          rArr:{},
          wArr:{}
        }
        //this loads before global state is set sometimes
        //how could we force this to only happen if global state is finished loading?
      }

      componentDidMount(){

        //this is confusing me, if I put this into the constructor I get the error:
            //Warning: Can't call setState on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the Download component.
            //WHY?????
        //because of this 'fix' you need to navigate away and navigate back to this page to update...
        this.logAccountsForAddress(this.props.verifiedAddress)
      }

    addElemToPermissionsArr(elem){
        //i'm sure this can be done better but leaving it for now

        this.setState(prevState => ({
            rArr: { ...prevState.rArr , [elem.acctN]:true  }
        }))

        this.setState(prevState => ({
            wArr: { ...prevState.rArr , [elem.acctN]:elem.canWrite  }
        }))
    }
    


    //returns an array of users for a given account number
    getUserArray(acctN) {
        let accounts = this.props.state.todo.accounts;
        let arrIndex = accounts.findIndex(o => o.key === acctN);
        if (arrIndex>=0 && accounts[arrIndex].users)
            return (accounts[arrIndex].users)
        return []

    }
    //returns an array of strings with the permissions the logged in metamask's account has
    logAccountsForAddress(address){
    
        let accts = this.props.state.todo.accounts;
        //loop through all accounts
        for (let i=0;i<accts.length;i++){
            //loop through the users of the specific account
            let userArr = this.getUserArray(accts[i].key);
            for (let j=0;j<userArr.length;j++){
                //check if the logged in account has permission as a user
                if (userArr[j].addy === address)
                    if (userArr[j].canWrite){
                        this.addElemToPermissionsArr({acctN:accts[i].key,canWrite:true})
                    }
                    else{
                        this.addElemToPermissionsArr({acctN:accts[i].key,canWrite:false})
                    }
            }
        }
    }

    render() {
        return (
            <div className="main-tile">
                <h1>This is the download page</h1>
                <p>Login to see what you have access to</p>
                
                <p>In future you can click on an account number and be taken to relevant upload/download page of that account</p>
                <p>NOTE!!! --- YOU MUST NAVIGATE TO THIS PAGE AFTER LOGGING IN TO RENDER ANYTHING</p>
                <p>(THIS PAGE IS IN DEVELOPMENT)</p>

                <div className='container'>
                    <div className="row">
                        <div className="col-1">
                            Account #
                        </div>
                        <div className="col-1">
                            Can Read
                        </div>
                        <div className="col-1">
                            CanWrite
                        </div>
                    </div>
                
                    {Object.keys(this.state.rArr).map( (x)=>(
                        <div className="row" key={x}>
                            <div className="col-1">
                                {x}
                            </div>
                            <div className="col-1">
                                {this.state.rArr[x]?"yes":"no"}
                            </div>
                             <div className="col-1">
                             {this.state.wArr[x]?"yes":"no"}
                            </div>
                        </div>      
                    ))}       
    
                </div>
     
                <button onClick={()=> console.log(
                    this.state.readArr,
                    this.state.writeArr,
                    this.state.rArr,
                    this.state.wArr                
                )}>Console.log permissions for debugging</button>

            </div>
        );
    };
};

const mapStateToProps = function(state){
    return{
        state
    }
}
export default connect(mapStateToProps)(Download)
