import React, { Component } from 'react';
import {calculateDateDiffInDays} from "../../utils/utils";

import {Link} from "react-router-dom";

class JobItem extends Component {
    render() {
        const {company_logo, company, title, created_at, location, id} = this.props.jobItem;

        return (
            <Link className="job-item" to={`jobs/${id}`}>
                <div className="job-item__brand">
                    {company_logo ? <img className="img-fluid" src={company_logo} alt={company}/> : <div className="job-item-brand__not-found">
                        <p>Not Found</p>
                    </div>}
                </div>
                <div className="job-item__desc">
                    <h5>{company}</h5>
                    <h4>{title}</h4>
                    <div className="job-item-desc__footer">
                        <div className="job-item-desc-footer__job-type">
                            <p>Full time</p>
                        </div>
                        <div className="job-item-desc-footer__info">
                            <ul>
                                <li>    
                                    <span className="material-icons">
                                        public
                                    </span>
                                    <p>{location}</p>
                                </li>
                                <li>
                                    <span className="material-icons">
                                        access_time
                                    </span>
                                    <p>{calculateDateDiffInDays(created_at)} days ago</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default JobItem;
