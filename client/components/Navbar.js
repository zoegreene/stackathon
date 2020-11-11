import React from 'react';
import { connect } from 'react-redux'
import { getUser } from '../redux/user';
import { getParam } from '../redux/hashParam';


class Navbar extends React.Component {

    componentDidMount() {
        const { getParam, getUser, hashParam } = this.props;

        getParam();
        if (hashParam.access_token) {
            getUser(hashParam.access_token);
        }
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                <nav>
                    <div>CUT FOR TIME</div>
                    <div className="user-info">
                        { user.display_name ? 
                            <div>{ user.display_name.toUpperCase() }</div> : <div />
                        }   
                        { user.images ? 
                            <img className="media-object" width="30" src={ user.images[0].url } /> : <div />
                        }
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        hashParam: state.hashParam
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: (accessToken) => dispatch(getUser(accessToken)),
        getParam: () => dispatch(getParam())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

