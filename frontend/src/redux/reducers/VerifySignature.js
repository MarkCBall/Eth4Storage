import { ADD_SIGNATURE } from "../constants/VerifySignature";
import { CALC_ADDRESS } from "../constants/VerifySignature";



const initialState = {

    msg: "(Not logged in)",
    msgSig: "default signature",
    verifiedAddress: "(Not logged in)"
};

export default function (state = initialState, action) {
    switch (action.type) {

        case ADD_SIGNATURE:
        return { ...state, ...action.payload }


        case CALC_ADDRESS:
        return { ...state, verifiedAddress:action.payload }

        default:
        return state;
    }
}

