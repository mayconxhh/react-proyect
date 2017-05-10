/* eslint linebreak-style: ["error", "windows"]*/
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../api';

class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: props.user || null,
      comments: props.comments || null,
    };
  }

  async componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    if (!!this.state.user && !!this.state.comments) return this.setState({ loading: false });
    const [
      user,
      comments,
    ] = await Promise.all([
      !this.state.user ? api.users.getSingle(this.props.userId) : Promise.resolve(null),
      !this.state.comments ? api.posts.getComments(this.props.id) : Promise.resolve(null),
    ]);

    return this.setState({
      loading: false,
      user: user || this.state.user,
      comments: comments || this.state.comments,
    });
  }

  render() {
    return (
      <article id={`post-${this.props.id}`}>
        <Link to={`/post/${this.props.id}`}><h2>{this.props.title}</h2></Link>
        <p>{this.props.body}</p>
        {!this.state.loading && (
          <div>
            <Link to={`/user/${this.state.user.id}`}>
              {this.state.user.name}
            </Link>
            <span>
              <FormattedMessage
                id="post.meta.comments"
                values={{
                  amount: this.state.comments.length,
                }}
              />
            </span>
            <Link to={`/post/${this.props.id}`}>
              <FormattedMessage id="post.meta.readMore" />
            </Link>
          </div>
        )}
      </article>
    );
  }
}

Post.propTypes = {
  id: PropTypes.number,
  userId: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  comments: PropTypes.arrayOf(
    PropTypes.object,
  ),
};

Post.defaultProps = {
  id: null,
  userId: null,
  title: null,
  body: null,
  user: null,
  comments: null,
};

export default Post;
