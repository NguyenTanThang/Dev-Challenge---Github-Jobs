import React, { Component } from 'react';

import Navbar from "../components/partials/Navbar";
import SearchEngine from "../components/partials/SearchEngine";
import Sidebar from "../components/partials/Sidebar";
import JobItem from "../components/jobs/JobItem";

import {sortJobSync, paginate} from "../utils/utils";
import axios from "axios";
import Pagination from '@material-ui/lab/Pagination';

class HomePage extends Component {

    state = {
        jobList: "",
        searchObject: {
            /*
                city, location, keywords
            */
        },
        currentPage: 1
    }

    async componentDidMount() {
        try {
            const res = await axios.get(`https://jobs.github.com/positions.json?full_time=true`);
            const jobList = res.data;
            this.setState({
                jobList
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    onPageChange = (event, value) => {
        this.setState({
            currentPage: parseInt(value)
        })
    }

    onSearch = (searchObject) => {
        this.setState({
            searchObject
        })
    }

    render() {
        const {onSearch, onPageChange} = this;
        const {currentPage, jobList, searchObject} = this.state;

        if (!jobList) {
            return (<></>);
        }

        let currentJobList = sortJobSync(searchObject, jobList);

        const paginationObject = paginate(currentJobList.length, currentPage, 5);
        const {totalPages, startIndex, endIndex} = paginationObject;

        let returnedJobItems = [];

        for (let index = startIndex; index <= endIndex; index++) {
            const jobItem = currentJobList[index];
            returnedJobItems.push(
                <JobItem jobItem={jobItem} key={jobItem.id}/>
            )
        }

        return (
            <div>
                <Navbar/>
                <SearchEngine onSearch={onSearch}/>
                <div className="home-content">
                    <aside>
                        <Sidebar onSearch={onSearch}/>
                    </aside>
                    <main>
                        <ul className="job-list">
                            {returnedJobItems}
                        </ul>
                        <div className="pagination-container">
                            <Pagination count={totalPages} variant="outlined" shape="rounded" page={currentPage} onChange={onPageChange} color="primary"/>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

export default HomePage;
