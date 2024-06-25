import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './css/questions.css';

const Questions = () => {
    // const [addingQuestion, setAddingQuestion] = useState(null);
    const [categories, setCategories] = useState([]);
    const [category_id, setCategoryId] = useState('1');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingMultipleChoice, setIsAddingMultipleChoice] = useState(false);


    const data =[
      
        { id: 1, title: "MULTIPLE CHOICE", content: "option" },
        { id: 2, title: "SCALE", content: "Lexicon"},
        { id: 3, title: "COMMENT", content: "TEXT INPUT" },
    ]

    useEffect(() => {
        fetchCategories();
      }, []);

    // FETCHING QUESTIONS
    const fetchCategories = async () => {
        try {
          const { data } = await axios.get('http://localhost:3000/categories/categories');
          setCategories(data);
        //   console.log(data);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };

      // ADDING MULTIPLE CHOICES
      const handleAddMultipleChoices = () => {
        
        setIsAddingMultipleChoice(true);
        setIsModalOpen(true);
      }


  return (
    <>
      <div className="container">
        <h1 className="title">QUESTION FORM:</h1>
        <div className="line-border">
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"><strong>Category:</strong></label>
              <select id="category" defaultValue={categories.id} value={category_id} onChange={event => setCategoryId(event.target.value)}
              className="subtitle bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
              {categories.map((category) => (
                  <option  key={category.id} placeholder="CHOOSE CATEGORY HERE" value={category.id}>{category.name}</option>
              ))}
              </select>
        </div>
        <form className="question-form">
            <label htmlFor="question" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Question:</label>
            <input type="text" id="question" className="form-input" placeholder="QUESTION HERE..." />
        </form>
        <div className="button-group">
            <button className="question-button" value="1" onClick={handleAddMultipleChoices}>MULTIPLE CHOICE</button>
            <button className="question-button">SCALE</button>
            <button className="question-button">COMMENT</button>
        </div>
        <div className="button-solo">
            <button className="submit-button">+ CONFIRM</button>
        </div>
      </div>
    </>
  )
}

export default Questions;
