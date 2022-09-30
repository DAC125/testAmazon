import React, { useState } from "react";
import './../CSS/Header.css'

const Header = () => {
    const [header, setHeader] = useState(false);

    const changeBackground = () => {
        if(window.scrollY >= 50) {
            setHeader(true);
        } else {
            setHeader(false);
        }
    }

    window.addEventListener('scroll',changeBackground);

    return (
        <div className={header ? 'header active' : 'header'}>
            <div className={header ? 'content active' : 'content'}>
                <a id="logo" href="https://www.munisarchi.go.cr/" rel="noreferrer" target="_blank">
                    <p>
                        <span>Municipalidad</span>
                        <span>de Sarchí</span>
                    </p>
                </a>
            </div>


        </div>
    )
}

export default Header