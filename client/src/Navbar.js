import React from "react";

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    Autobooker
                </a>

                <a className="navbar-brand" href="/faq">
                    FAQ
                </a>
            </div>
        </nav>
    )
}

export default Navbar;