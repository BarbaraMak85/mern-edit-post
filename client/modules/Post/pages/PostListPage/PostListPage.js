import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget/PostCreateWidget';

// Import Actions
import { addPostRequest, fetchPosts, deletePostRequest, voteUpPostRequest, voteDownPostRequest } from '../../PostActions';
import { toggleAddPost } from '../../../App/AppActions';

// Import Selectors
import { getShowAddPost } from '../../../App/AppReducer';
import { getPosts } from '../../PostReducer';

class PostListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  handleDeletePost = post => {
    console.log(post);
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deletePostRequest(post));
    }
  };

  handleAddPost = (name, title, content) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addPostRequest({ name, title, content }));
  };
  handleVoteUpPost = post => {
    this.props.dispatch(voteUpPostRequest(post));
    // this.props.dispatch(addPostRequest({ name, title, content }));
  };
  handleVoteDownPost = post => {
    this.props.dispatch(voteDownPostRequest(post));
    // this.props.dispatch(addPostRequest({ name, title, content }));
  };

  render() {
    return (
      <div>
        <PostCreateWidget addPost={this.handleAddPost} showAddPost={this.props.showAddPost} />
        <PostList handleDeletePost={this.handleDeletePost} handleVoteDownPost={this.handleVoteDownPost} handleVoteUpPost={this.handleVoteUpPost} posts={this.props.posts}/>  
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PostListPage.need = [() => { return fetchPosts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPost: getShowAddPost(state),
    posts: getPosts(state),
  };
}

PostListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

PostListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(PostListPage);
