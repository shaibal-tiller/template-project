import React from "react";
import { useContext } from "react";
const AppContext= React.createContext()
export const GetContext = () => {
    const myContext = useContext(AppContext);
    return myContext
}

export default AppContext;