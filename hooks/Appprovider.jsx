import { useState } from "react";
import AppContext from "./AppContext";

const Appprovider = (props) => {
    const [cart, setcart] = useState([]);
    const [user, setuser] = useState();
    const value = {
        cart,
        setcart,
        user,
        setuser,
    };
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default Appprovider