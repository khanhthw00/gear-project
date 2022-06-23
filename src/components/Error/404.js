import React from 'react';
import error from '../../images/error.png';

class ErrorPage extends React.Component {

    render() {
        return (
            <div className="error">
                <img src={error} />
            </div>
        );
    }
};

export default ErrorPage;