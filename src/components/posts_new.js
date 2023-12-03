import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.createPost(props)
    .then(() => { 
      // blog post has been created, navigate the user to the index
      this.context.router.push('/');
     });
  }

  render() {
    const { fields: {userId, title, body } , handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        <div className={`form-group ${userId.touched && userId.invalid ? 'has-danger' : ''}`}>
          <label>ID</label>
          <input type="text" className="form-control" {...userId} />
          <div className="text-help">
            { userId.touched ? userId.error : ''}
          </div>
        </div>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            { title.touched ? title.error : ''}
          </div>
        </div>
        <div className={`form-group ${body.touched && body.invalid ? 'has-danger' : ''}`}>
          <label>Body</label>
          <textarea className="form-control" {...body} />
          <div className="text-help">
            { body.touched ? body.error : ''}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};
  
  if (!values.userId) {
    errors.userId = 'Enter a userId';
  }
  if(!values.title) {
    errors.title = 'Enter a title';
  }
  if(!values.body) {
    errors.body = 'Enter a body';
  }

  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['userId', 'title', 'body'],
  validate
}, null, { createPost })(PostsNew);