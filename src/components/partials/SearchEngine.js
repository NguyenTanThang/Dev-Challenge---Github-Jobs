import React, { Component } from 'react';
import InputWithIcon from "./InputWithIcon";

export default class SearchEngine extends Component {

    state = {
        keywords: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {keywords} = this.state;
        const {onSearch} = this.props;

        onSearch({
            keywords
        })
    }

    render() {
        const {handleChange, onSubmit} = this;
        const {keywords} = this.state;

        return (
            <div className='search-engine'>
                <form className="search-engine__form" id="search-engine-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <InputWithIcon icon="work_outline" placeholder="Title, companies, expertise or benefits" id="keywords" name="keywords" onChange={handleChange} value={keywords} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Search</button>
                    </div>
                </form>
            </div>
        )
    }
}
