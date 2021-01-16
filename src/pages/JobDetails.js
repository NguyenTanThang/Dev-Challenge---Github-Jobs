import React, { Component } from 'react';

import Navbar from "../components/partials/Navbar";

import axios from "axios";
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import {calculateDateDiffInDays} from "../utils/utils";

class HomePage extends Component {

    state = {
        jobItem: ""
    }

    async componentDidMount() {
        try {
            const jobID = this.props.match.params.jobID;
            const res = await axios.get(`/positions/${jobID}.json`);
            const jobItem = res.data;
            this.setState({
                jobItem
            })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {jobItem} = this.state;

        if (!jobItem) {
            return (<></>)
        }

        const {how_to_apply, title, description, created_at, company_logo, location, company} = jobItem;
        
        return (
            <div>
                <Navbar/>
                <div className="jobs-details-content home-content">
                    <aside>
                        <div className="title-back">
                            <Link to="/">
                                <span className="material-icons">
                                    arrow_right_alt
                                </span>
                                <p>Back to search</p>
                            </Link>
                        </div>
                        <div className="apply">
                            <h4>HOw to Apply</h4>
                            {parse(how_to_apply)}
                        </div>
                    </aside>
                    <main>
                        <div className="job-details__header">
                            <div className="job-details-header__name">
                                <h4>{title}</h4>
                                <p className="full-time-tag">
                                    Full time
                                </p>
                            </div>
                            <div className="job-details-header__time">
                                <span className="material-icons">
                                    access_time
                                </span>
                                <p>{calculateDateDiffInDays(created_at)} days ago</p>
                            </div>
                        </div>

                        <div className="job-details__sub-header">
                            <div className="job-details-sub-header__logo">
                                {company_logo ? <img className="img-fluid" src={company_logo} alt={company}/> : <div className="job-item-brand__not-found">
                                <p>N/A</p>
                            </div>}
                            </div>
                            <div className="job-details-sub-header__company-details">
                                <h4>{company}</h4>
                                <div className="job-details-sub-header-company-details__date-posted">
                                    <span className="material-icons">
                                        public
                                    </span>
                                    <p>{location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="job-details__description">
                            {parse(description)}
                        </div>

                    </main>
                </div>
            </div>
        )
    }
}

export default HomePage;
