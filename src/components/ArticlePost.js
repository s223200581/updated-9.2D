import React, { useState } from 'react';
import { db, storage } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import ImageUpload from './ImageUpload';
import { Button, Form, Message } from 'semantic-ui-react';

const ArticlePost = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [articleText, setArticleText] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (title && articleText) {
      try {
        const newArticle = {
          title,
          abstract,
          articleText,
          tags: tags.split(',').map(tag => tag.trim()), 
          imageUrl: imageUrl || '', 
          date: new Date(),
        };

        await addDoc(collection(db, 'articles'), newArticle);
        setSuccess(true);
        setError(null);

        // Clear form fields
        setTitle('');
        setAbstract('');
        setArticleText('');
        setTags('');
        setImageUrl(null);
      } catch (error) {
        setError("Error posting article.");
      }
    } else {
      setError("Title and Article Text are required!");
    }
  };

  return (
    <div className="container">
      <Form success={success} error={!!error}>
        <Form.Input
          label="Title"
          placeholder="Enter a descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Field>
          <label>Add an Image</label>
          <ImageUpload setImageUrl={setImageUrl} />
        </Form.Field>
        <Form.TextArea
          label="Abstract"
          placeholder="Enter a brief abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />
        <Form.TextArea
          label="Article Text"
          placeholder="Enter your article text..."
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
        />
        <Form.Input
          label="Tags (Comma Separated)"
          placeholder="Add tags (e.g., Java, React)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Button color="green" onClick={handleSubmit}>Post Article</Button>

        {success && <Message success header="Success!" content="Article posted successfully!" />}
        {error && <Message error header="Error" content={error} />}
      </Form>
    </div>
  );
};

export default ArticlePost;
