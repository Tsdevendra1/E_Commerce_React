import React from 'react';

export default function Logo(props) {
    let redStyle = {'color': 'red'};
    let greenStyle = {'color': 'green'};
    let organgeStyle = {'color': 'orange'};
    return (
        <div className="font-weight-bold">
            <div className="center-vertical">
                <span>Pa</span><span
                style={redStyle}>r</span><span
                style={organgeStyle}>r</span>o<span style={greenStyle}>t</span> <span
                style={organgeStyle}>C</span>lo<span
                style={redStyle}>t</span><span style={greenStyle}>h</span>in<span style={organgeStyle}>g</span>
            </div>
        </div>
    )
}

