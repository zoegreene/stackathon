import React from 'react';
import { connect } from 'react-redux'
import { getUser } from '../redux/user';


class Navbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hashParams: {},
        };
        this.getHashParams = this.getHashParams.bind(this);
    }

    componentDidMount() {
        this.getHashParams();
        if (this.state.hashParams.access_token) {
            this.props.getUser(this.state.hashParams.access_token);
        }
    }

    getHashParams() {
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           this.state.hashParams[e[1]] = decodeURIComponent(e[2]);
        }
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                <nav>
                    <div>CUT FOR TIME</div>
                    { user.images ? 
                        <img className="media-object" width="30" src={ user.images[0].url } /> : <div />
                    }
                    { user.display_name ? 
                        <div>{ user.display_name.toUpperCase() }</div> : <div />
                    }   
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: (accessToken) => dispatch(getUser(accessToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

