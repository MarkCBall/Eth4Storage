// setAddressFromSignature(originalString, signedString) {
//     //code below from https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial
//     const msgBuffer = ethUtil.toBuffer(originalString);
//     const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
//     const signatureBuffer = ethUtil.toBuffer(signedString);
//     const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
//     const publicKey = ethUtil.ecrecover(
//       msgHash,
//       signatureParams.v,
//       signatureParams.r,
//       signatureParams.s
//     );
//     const addressBuffer = ethUtil.publicToAddress(publicKey);
//     const address = ethUtil.bufferToHex(addressBuffer);

//     this.setState({ dateSignature: signedString });
//     this.setState({ date: originalString });
//     this.setState({ verifiedAddress: address });
//     console.log("date", this.state.date);
//     console.log("dadateSignaturete", this.state.dateSignature);
//     console.log("verifiedAddress", this.state.verifiedAddress);
//   }