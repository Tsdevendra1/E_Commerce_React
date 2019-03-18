import * as React from 'react';


export default class LoadingOverlay extends React.Component<{}, {}> {
    render() {
        return (
            <div className="loading-overlay">
                <i id="spinner" className="loading-animation fas fa-spinner fa-spin"></i>
            </div>
        )
    }
}
