/* eslint linebreak-style: ["error", "windows"]*/
import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

const Comment = props => (
  <article id={`comment-${props.id}`}>
    <div>
      <FormattedHTMLMessage
        id="comment.meta.author"
        values={{
          email: props.email,
          name: props.name,
        }}
      />
    </div>
    <p>{props.body}</p>
  </article>
);

Comment.propTypes = {
  id: PropTypes.number,
  email: PropTypes.string,
  name: PropTypes.string,
  body: PropTypes.string,
};

Comment.defaultProps = {
  id: null,
  email: null,
  name: null,
  body: null,
};

export default Comment;
