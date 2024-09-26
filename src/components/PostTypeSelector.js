import React from 'react';

const PostTypeSelector = ({ postType, setPostType }) => (
  <div className="radio-group">
    <label>Select Post Type:</label>
    <label>
      <input 
        type="radio" 
        name="postType" 
        value="question" 
        checked={postType === 'question'}
        onChange={() => setPostType('question')} 
      /> Question
    </label>
    <label>
      <input 
        type="radio" 
        name="postType" 
        value="article" 
        checked={postType === 'article'}
        onChange={() => setPostType('article')} 
      /> Article
    </label>
  </div>
);

export default PostTypeSelector;
