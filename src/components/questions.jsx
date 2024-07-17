import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './css/questions.css';

const Questions = () => {
  const [categories, setCategories] = useState([]);
  const [category_id, setCategoryId] = useState('1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingMultipleChoice, setIsAddingMultipleChoice] = useState(false);
  const [multipleChoices, setMultipleChoices] = useState([{ option: '' }]);

  useEffect(() => {
    fetchCategories();
  }, []);

// FETCHING DATA
const fetchCategories = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/categories/categories');
      setCategories(data);
    //   console.log(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddMultipleChoices = () => {
    setIsAddingMultipleChoice(true);
    setIsModalOpen(true);
  }

  const handleAddOption = () => {
    setMultipleChoices([...multipleChoices, { option: '' }]);
  }

  const handleOptionChange = (index, event) => {
    const newChoices = multipleChoices.map((choice, i) => {
      if (i === index) {
        return { ...choice, option: event.target.value };
      }
      return choice;
    });
    setMultipleChoices(newChoices);
  }

  const handleSubmit = () => {
    console.log("Multiple Choices: ", multipleChoices);
    setIsModalOpen(false);
  }

  return (
    <>
      <div className="container">
        <h1 className="title">QUESTION FORM:</h1>
        <div className="line-border">
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><strong>Category:</strong></label>
          <select required id="category" value={category_id} onChange={event => setCategoryId(event.target.value)}
            className="subtitle bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <form className="question-form">
          <label htmlFor="instruction" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instruction:</label>
          <input type="text" id="instruction" className="form-input" placeholder="INSTRUCTION HERE..." />
        </form>
        <form className="question-form">
          <label htmlFor="question" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Question:</label>
          <input required type="text" id="question" className="form-input" placeholder="QUESTION HERE..." />
        </form>
        <div className="button-group">
          <button className="question-button" onClick={handleAddMultipleChoices}>MULTIPLE CHOICE</button>
          <button className="question-button">SCALE</button>
          <button className="question-button">COMMENT</button>
        </div>
        <div className="button-solo">
          <button className="submit-button">+ CONFIRM</button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Add Multiple Choices</h2>
        {multipleChoices.map((choice, index) => (
          <div key={index}>
            <input
              type="text"
              value={choice.option}
              onChange={(event) => handleOptionChange(index, event)}
              placeholder={`Option ${index + 1}`}
            />
          </div>
        ))}
        <button onClick={handleAddOption}>Add Option</button>
        <button onClick={handleSubmit}>Submit</button>
      </Modal>
    </>
  )
}

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Questions;
