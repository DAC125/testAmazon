import React from "react";
import './../CSS/Subtitle.css'

const Subitle = (props) => {
    return(
        <div>
            <h2 className="subtitle">
                {props.subtitle}
            </h2>
        </div>
    )
}

export default Subitle