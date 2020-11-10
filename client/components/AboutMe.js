import React from 'react';

const AboutMe = ({ user }) => {
    return (
        <div id="about-me">
            <h3>About Me</h3>
            <div className="media">
                <div className="pull-left">
                { user.images ? 
                    <img className="media-object" width="150" src={ user.images[0].url } /> : <div />
                }
                </div>
                <div className="media-body">
                <dl className="dl-horizontal">
                    <dt>Display name</dt><dd className="clearfix">{ user.display_name }</dd>
                    <dt>Id</dt><dd>{ user.id }</dd>
                    <dt>Email</dt><dd>{ user.email }</dd>
                    <dt>Link</dt><dd><a href={ user.href }>{ user.href }</a></dd>
                    <dt>Country</dt><dd>{ user.country }</dd>
                </dl>
                </div>
            </div>
        </div>
    )
}

export default AboutMe;