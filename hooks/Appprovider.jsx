import { useState } from "react";
import AppContext from "./AppContext";

const Appprovider = (props) => {
    const [cart, setcart] = useState([]);
    const value = {
        cart,
        setcart,
    };
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default Appprovider