import {defaultTimeoutSec} from './config.js'

const timeout = function (s) {  
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };
  
export const getJSON = async function (url, t=defaultTimeoutSec) {
    try {
        const res = await Promise.race([fetch(url), timeout(t)]);
        if (!res.ok) throw new Error(`Could not load recipe : ${res.message}, ${res.status}`)
        const data = await res.json();
        return data;
    } catch (err) {
        throw err
    }
}