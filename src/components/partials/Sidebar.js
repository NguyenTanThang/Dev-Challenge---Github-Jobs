import React, { Component } from 'react';
import InputWithIcon from "./InputWithIcon";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default class SearchEngine extends Component {

    state = {
        city: "",
        location: ""
    }

    handleChange = (e) => {
        const {onSearch} = this.props;

        if (e.target.name === "location" && e.target.value) {
            onSearch({
                city: ""
            })
            this.setState({
                city: ""
            })
        }

        onSearch({
            [e.target.name]: e.target.value
        })
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    renderRadioControl = (e) => {
        const list = ["London", "New York", "Amsterdam", "Berlin"];

        return list.map((item, index) => {
            return <FormControlLabel key={item + index} value={item.toLowerCase()} control={<Radio color="primary" />} label={item} />
        })
    }

    render() {
        const {handleChange} = this;
        const {city, location} = this.state;

        return (
            <div className='side-bar'>
                <h4>LOCATION</h4>
                <form className="side-bar__form" id="side-bar-form">
                    <div className="form-group">
                        <InputWithIcon icon="public" placeholder="City, state or country" id="location" name="location" onChange={handleChange} value={location}/>
                    </div>
                    <div className="form-group">
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="city" value={city} onChange={handleChange}>
                                {this.renderRadioControl()}
                            </RadioGroup>
                        </FormControl>
                    </div>
                </form>
            </div>
        )
    }
}
