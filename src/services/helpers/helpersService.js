import React from "react";
import jwt_decode from "jwt-decode";

export default function helpersService() {
  return <div>helpersService</div>;
}

export function makeID(length = 10) {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function paramEncode(param) {
  Object.keys(param)
      .map((index, i)=>{
        param[index] = encodeURIComponent(param[index]);
      });
  let ret = JSON.stringify(param);
  return btoa(ret);
}

export async function paramDecode(param){
  let objUri = JSON.parse(atob(param));
  Object.keys(objUri)
      .map((index, i)=>{
        objUri[index] = decodeURIComponent(objUri[index]);
      });
  return objUri;
}

export async function getTokenVars(token){
    return jwt_decode(token);
}