import React, { useState } from 'react';
import './PostPage.css'; // Import custom CSS
import PostTypeSelector from './PostTypeSelector';
import QuestionPost from './QuestionPost';
import ArticlePost from './ArticlePost';

const PostPage = () => {
  const [postType, setPostType] = useState('question');

  return (
    <div className="container">
      <div className="header">New Post</div>
      <div className="segment">
        <PostTypeSelector postType={postType} setPostType={setPostType} />
        <div className="red-text">
          This section is designed based on the type of the post. It could be developed by conditional rendering. 
          For {postType === 'question' ? 'a question' : 'an article'}, the following section would be appeared.
        </div>
        {postType === 'question' ? <QuestionPost /> : <ArticlePost />}
      </div>
    </div>
  );
};

export default PostPage;
