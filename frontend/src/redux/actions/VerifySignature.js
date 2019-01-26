import { ADD_SIGNATURE } from "../constants/VerifySignature";
import { CALC_ADDRESS } from "../constants/VerifySignature";
import ethUtil from "ethereumjs-util";


export default {

    addSignature: (dispatch,msg, msgSig) => {
        return (dispatch) =>
            dispatch({
                type: ADD_SIGNATURE,
                payload:
                {
                    msg: msg,
                    msgSig: msgSig
                }
            })
    },
    calcAddress: (dispatch,msg, msgSig) => {
        return (dispatch, state) => {
            //code below from https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial
            const msgBuffer = ethUtil.toBuffer(msg);
            const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
            const signatureBuffer = ethUtil.toBuffer(msgSig);
            const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
            const publicKey = ethUtil.ecrecover(
                msgHash,
                signatureParams.v,
                signatureParams.r,
                signatureParams.s
            );
            const addressBuffer = ethUtil.publicToAddress(publicKey);
            const address = ethUtil.bufferToHex(addressBuffer);

            dispatch({
                type: CALC_ADDRESS,
                payload: address
            })
        }
    },
}
