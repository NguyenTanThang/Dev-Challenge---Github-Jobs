import React, { Component } from 'react'

export default class InputWithIcon extends Component {
    render() {
        const {icon, placeholder, name, id, onChange, value} = this.props;

        return (
            <div className="input-group">
                <div className="input-group__icon">
                    <span className="material-icons">
                        {icon}
                    </span>
                </div>
                <div className="input-group__input">
                    <input id={id} name={name} placeholder={placeholder} value={value} onChange={onChange}/>
                </div>
            </div>
        )
    }
}
