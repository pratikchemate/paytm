import {atom} from "recoil"
export const userAtom = atom({
    key: 'userAtom', // unique ID (with respect to other atoms/selectors)
    default: {
        username :'',
        firstName:'',
        lastName:''
    }, // default value (aka initial value)
  });