import React, { useEffect, useState } from 'react'
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false)

    // scroll listener - code snippet that detects when users scroll to make changes to the navbar
    useEffect(() => {
        window.addEventListener("scroll", () =>{
            if (window.scrollY > 100){
                handleShow(true)
            }else handleShow(false)
        })
        return() =>{
            window.removeEventListener("scroll")
        }
    }, [])

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img className="nav__logo" src="https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png" alt="Netflix Logo" />
            <img className="nav__avatar" src="https://pbs.twimg.com/media/DlKNEufWsAAgr2E.jpg" alt="Netflix Logo" />
            
        </div>
    )
}

export default Nav
