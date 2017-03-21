import axios from 'axios';

const initialState = {
  posts: []
}

export default (state=initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case RETRIEVE_POSTS:
      newState.posts = action.posts;
      break;
    case CREATE_POST:
      console.log(action.post);
      newState.posts = [...newState.posts, action.post];
      break;
    default:
      return state;
  }

  return newState;
}

// CONSTANTS
const RETRIEVE_POSTS = 'RETRIEVE_POSTS';
const CREATE_POST = 'CREATE_POST';

// ACTION CREATERS
const retrieve = (posts) => ({
  type: RETRIEVE_POSTS,
  posts
});

const create = (post) => ({
  type: CREATE_POST,
  post: post.data
});

// THUNKS
export const retrievePosts = () =>
  dispatch =>
    axios.get('/api/posts')
    .then((posts) => dispatch(retrieve(posts.data)))
    .catch((err) => console.error(err.message));

export const createPost = (post) =>
  dispatch =>
    axios.post('/api/posts', post)
      .then((post) => dispatch(create(post)))
      .catch((err) => console.error(err.message));
