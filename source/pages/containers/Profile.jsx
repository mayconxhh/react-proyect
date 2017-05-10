/* eslint linebreak-style: ["error", "windows"]*/
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import api from '../../api';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      user: {},
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const [
      user,
      posts,
    ] = await Promise.all([
      api.users.getSingle(this.props.match.params.id),
      api.users.getPosts(this.props.match.params.id),
    ]);

    this.setState({
      user,
      posts,
      loading: false,
      email: user.email,
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <section className="Profile">
        <h2>
          <FormattedMessage
            id="title.profile"
            values={{
              name: this.state.user.name,
            }}
          />
        </h2>
        <fieldset>
          <legend>
            <FormattedMessage id="profile.field.basic" />
          </legend>
          <input type="email" value={this.state.email} disabled />
        </fieldset>
        {this.state.user.address && (
          <fieldset>
            <legend>
              <FormattedMessage id="profile.field.address" />
            </legend>
            <address>
              {this.state.user.address.street}<br />
              {this.state.user.address.suite}<br />
              {this.state.user.address.city}<br />
              {this.state.user.address.zipcode}<br />
            </address>
          </fieldset>
        )}
        <section>
          {this.state.posts
            .map(post => <Post key={post.id} {...post} user={this.state.user} />)
          }
        </section>
      </section>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Profile.defaultProps = {
  match: {
    params: {
      id: null,
    },
  },
};

export default Profile;
