import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddPostModal = () => {
  const { showAddPostModal, setShowAddPostModal, addNewPost, setShowToast } =
    useContext(PostContext);

  const initializeNewPost = {
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  };

  const [newPost, setNewPost] = useState(initializeNewPost);

  const { title, description, url, status } = newPost;

  const handleOnChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    resetAddNewPostData();
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addNewPost(newPost);
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
    resetAddNewPostData();
  };

  const resetAddNewPostData = () => {
    setNewPost(initializeNewPost);
    setShowAddPostModal(false);
  };

  return (
    <Modal show={showAddPostModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleOnSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={handleOnChange}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleOnChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="youtube tutorial URL"
              name="url"
              value={url}
              onChange={handleOnChange}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
