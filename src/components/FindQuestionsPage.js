import React, { useState } from 'react';
import { Card, Button, Input, Dropdown, Form, Segment, Label, Modal, Header, Icon, Message } from 'semantic-ui-react';
import Draggable from 'react-draggable';
import './FindQuestionsPage.css'; // Importing a CSS file for custom styles

const initialQuestions = [
  { id: 1, title: 'Car Mustang', description: 'Mat Black', tag: 'tag1', date: '2024-09-10' },
  { id: 2, title: 'Car Audi A8', description: 'Grey Metallic', tag: 'tag2', date: '2024-09-11' },
  // Add more questions as needed
];

const tagOptions = [
  { key: 'tag1', text: 'Tag 1', value: 'tag1' },
  { key: 'tag2', text: 'Tag 2', value: 'tag2' },
  // Add more tags as needed
];

const FindQuestionsPage = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [filteredQuestions, setFilteredQuestions] = useState(initialQuestions);
  const [filter, setFilter] = useState({ title: '', tag: '', date: '' });
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: '', description: '', tag: '', date: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleFilterChange = (e, { name, value }) => {
    setFilter({ ...filter, [name]: value });
    filterQuestions({ ...filter, [name]: value });
  };

  const filterQuestions = (filters) => {
    const { title, tag, date } = filters;
    const filtered = questions.filter((q) =>
      (title ? q.title.toLowerCase().includes(title.toLowerCase()) : true) &&
      (tag ? q.tag === tag : true) &&
      (date ? q.date === date : true)
    );
    setFilteredQuestions(filtered);
  };

  const handleAddQuestion = () => {
    const newQ = { ...newQuestion, id: questions.length + 1 };
    setQuestions([...questions, newQ]);
    setFilteredQuestions([...questions, newQ]);
    setNewQuestion({ title: '', description: '', tag: '', date: '' });
    setSuccessMessage('Question added successfully!');

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleOpenModal = (question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedQuestion(null);
    setIsModalOpen(false);
  };

  const handleDeleteQuestion = (id) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    setQuestions(updatedQuestions);
    setFilteredQuestions(updatedQuestions);
  };

  return (
    <div className="container">
      {/* Success Message */}
      {successMessage && (
        <Message positive>
          {successMessage}
        </Message>
      )}

      {/* Filter Section */}
      <Segment raised>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input
              label="Filter by Title"
              placeholder="Enter title"
              name="title"
              value={filter.title}
              onChange={handleFilterChange}
            />
            <Form.Input
              label="Filter by Date"
              placeholder="YYYY-MM-DD"
              name="date"
              value={filter.date}
              onChange={handleFilterChange}
            />
            <Form.Dropdown
              label="Filter by Tag"
              placeholder="Select tag"
              name="tag"
              selection
              options={tagOptions}
              value={filter.tag}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Form>
      </Segment>

      {/* Question Cards */}
      <Segment>
        <Card.Group itemsPerRow={3}>
          {filteredQuestions.map((q) => (
            <Draggable key={q.id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Icon name="car" /> {q.title}
                  </Card.Header>
                  <Card.Meta>{q.date}</Card.Meta>
                  <Card.Description>
                    {q.description.substring(0, 50) + '...'}
                  </Card.Description>
                  <Label>{q.tag}</Label>
                </Card.Content>
                <Card.Content extra>
                  <Button color="red" size="mini" onClick={() => handleDeleteQuestion(q.id)}>
                    Delete
                  </Button>
                  <Button primary size="mini" onClick={() => handleOpenModal(q)}>
                    View Details
                  </Button>
                </Card.Content>
              </Card>
            </Draggable>
          ))}
        </Card.Group>
      </Segment>

      {/* Add New Question Form */}
      <Segment raised>
        <Form>
          <Form.Input
            label="Title"
            placeholder="Enter title"
            value={newQuestion.title}
            onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
          />
          <Form.TextArea
            label="Description"
            placeholder="Enter description"
            value={newQuestion.description}
            onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
          />
          <Form.Input
            label="Date"
            placeholder="YYYY-MM-DD"
            value={newQuestion.date}
            onChange={(e) => setNewQuestion({ ...newQuestion, date: e.target.value })}
          />
          <Form.Dropdown
            label="Tag"
            placeholder="Select tag"
            selection
            options={tagOptions}
            value={newQuestion.tag}
            onChange={(e, { value }) => setNewQuestion({ ...newQuestion, tag: value })}
          />
          <Button color="blue" onClick={handleAddQuestion}>
            Add Question
          </Button>
        </Form>
      </Segment>

      {/* Modal for Expanded Question */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        size="small"
        closeIcon
      >
        {selectedQuestion && (
          <>
            <Header icon="question circle" content={selectedQuestion.title} />
            <Modal.Content>
              <p><strong>Date:</strong> {selectedQuestion.date}</p>
              <p><strong>Tag:</strong> {selectedQuestion.tag}</p>
              <p><strong>Description:</strong></p>
              <p>{selectedQuestion.description}</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={handleCloseModal}>
                <Icon name="remove" /> Close
              </Button>
            </Modal.Actions>
          </>
        )}
      </Modal>
    </div>
  );
};

export default FindQuestionsPage;
