import React from 'react';
import error from '../../images/error.png';

class Error403 extends React.Component {

    componentDidMount() {
        sessionStorage.removeItem("user");
    }
    render() {
        return (
            <div className="error">
                <img src={error} />
            </div>
        );
    }
};

export default Error403;