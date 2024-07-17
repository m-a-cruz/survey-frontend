import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/survey.css';
import { useNavigate } from 'react-router-dom';

const Survey = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [choices, setChoices] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetchQuestions();
        fetchCategories();
        fetchChoices();
        fetchInstructions();
        fetchUser();
    }, []);

    const fetchQuestions = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/questions/questions');
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/categories/categories');
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchChoices = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/choices/choices');
            setChoices(data);
        } catch (error) {
            console.error('Error fetching choices:', error);
        }
    };

    const fetchInstructions = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/instructions/instructions');
            setInstructions(data);
        } catch (error) {
            console.error('Error fetching instructions:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUser = async () => {
        try {
            const userId = localStorage.getItem('id');
            const { data } = await axios.get(`http://localhost:3000/user-masterlist/masterlist/${userId}`);
            setUser(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleChange = (e, questionId) => {
        const { value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [questionId]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);

        const requests = Object.entries(formData).map(([key, value]) => {
            const question_id = parseInt(key);
            const answers = String(value);

            return axios.post('http://localhost:3000/responses/response', { question_id, answers }, { withCredentials: true });
        });

        try {
            await Promise.all(requests);
            setFormData({});
            Swal.fire('Success', 'Your responses have been submitted!', 'success');
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire('Error', 'There was an error submitting your responses.', 'error');
        }

        //Update Status ID
        axios.put(`http://localhost:3000/user-masterlist/masterlist/${user.id}`, {
            ...user,
            email: user.email,
            status_id: 1
        });

        //Remove Local Storage ID
        try {
            localStorage.removeItem('id');
            navigate('/');
        } catch (error) {
            console.error('Error: Response not received', error);
        }
    };

    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

    const totalPages = categories.length;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            {categories.length > 0 && (
                <div className="page">
                    <div className="title">{categories[currentPage].name}</div>
                    <form onSubmit={handleSubmit}>
                        <div className="line-border">
                            {questions
                                .filter(q => q.category_id === categories[currentPage].id)
                                .map((q) => (
                                    <div className="question-row" key={q.id}>
                                        <p className="question">{q.question}</p>
                                        <div className="scalability-options">
                                            
                                            {q.question_type === 2 && (
                                                <div className="radio-buttons scale-labels">
                                                    {[5, 4, 3, 2, 1].map((value) => (
                                                        <label key={value}>
                                                            <input
                                                                type="radio"
                                                                name={`question_${q.id}`}
                                                                value={value}
                                                                checked={formData[q.id] === String(value)}
                                                                onChange={(e) => handleChange(e, q.id)}
                                                                required
                                                            />
                                                            {value}
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                            {choices
                                                .filter(c => c.question_id === q.id)
                                                .map((c) => (
                                                    <label key={c.id}>
                                                        <input
                                                            type="radio"
                                                            name={`question_${q.id}`}
                                                            value={c.optionn}
                                                            checked={formData[q.id] === c.optionn}
                                                            onChange={(e) => handleChange(e, q.id)}
                                                            required
                                                        />
                                                        {c.optionn}
                                                    </label>
                                                ))}
                                            {q.question_type === 3 && (
                                                <input
                                                    type="text"
                                                    name={`question_${q.id}`}
                                                    value={formData[q.id] || ''}
                                                    onChange={(e) => handleChange(e, q.id)}
                                                    required
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>

                        <div className="button-container">
                            {currentPage > 0 && <button type="button" onClick={prevPage} className="nav-button">Back</button>}
                            <div className="page-number">Page {currentPage + 1} of {totalPages}</div>
                            {currentPage < totalPages - 1 && (
                                <button type="button" onClick={nextPage} className="nav-button">Next</button>
                            )}
                            {currentPage === totalPages - 1 && (
                                <button type="submit" className="submit-button">Submit</button>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Survey;
