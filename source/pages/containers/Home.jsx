/* eslint linebreak-style: ["error", "windows"]*/
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';
import api from '../../api';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      posts: [],
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.initialFetch();
    window.addEventListener('scroll', this.handleScroll);
  }

  async initialFetch() {
    const posts = await api.posts.getList(this.state.page);
    this.setState({
      posts,
      page: this.state.page + 1,
      loading: false,
    });
  }

  componentWillUnmout() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null;
    }

    return this.setState({ loading: true }, async () => {
      try {
        const posts = await api.posts.getList(this.state.page);

        this.setState({
          posts: this.state.posts.concat(posts),
          page: this.state.page + 1,
          loading: false,
        });
      } catch (error) {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    return (
      <div className="Home">
        <h1>
          <FormattedMessage id="title.home" />
        </h1>
        <section>
          {this.state.posts
            .map(post => <Post key={post.id} {...post} />)
          }
          {this.state.loading && (
            <Loading />
          )}
        </section>
      </div>
    );
  }
}

export default Home;
