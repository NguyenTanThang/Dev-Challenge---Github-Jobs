import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class Navbar extends Component {
    render() {
        return (
            <nav>
                <div className="navbar">
                    <div className="navbar__brand">
                        <Link to="/">
                            <span>Github</span> Jobs
                        </Link>
                    </div>
                </div>
            </nav>
        )
    }
}
