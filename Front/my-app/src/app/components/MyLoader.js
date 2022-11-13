import React from 'react'
import { useState} from "react";
import HashLoader from "react-spinners/HashLoader";

                // This is my loader animation with yellowish color in hashtag icon form, 
                // it loads for 3 seconds and then displays the wanted data 
const MyLoader = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    return (
        <div className="sweet-loading">
            <HashLoader size='80px' color='#FFFF00' timeinseconds={3} style={{
                position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"
            }}
            />
        </div>
    );
}
export default MyLoader