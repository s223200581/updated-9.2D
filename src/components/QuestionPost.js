// src/components/QuestionPost.js
import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const QuestionPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async () => {
    if (title && description) {
      try {
        const newQuestion = {
          title,
          description,
          tags: tags.split(',').map(tag => tag.trim()),
          date: new Date(),
        };

        await addDoc(collection(db, 'questions'), newQuestion);

        // Clear fields after submission
        setTitle('');
        setDescription('');
        setTags('');
        alert("Question posted successfully!");
      } catch (error) {
        console.error("Error posting question: ", error);
      }
    } else {
      alert("Title and Description are required!");
    }
  };

  return (
    <div>
      <div className="form-label">Question Title</div>
      <input
        type="text"
        className="form-input"
        placeholder="Enter the question title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="form-label">Description</div>
      <textarea
        className="form-input"
        placeholder="Describe your question"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="form-label">Tags (Comma Separated)</div>
      <input
        type="text"
        className="form-input"
        placeholder="Add tags (e.g., Java, React)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button className="button" onClick={handleSubmit}>Post</button>
    </div>
  );
};

export default QuestionPost;
