import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './css/survey.css';
import { useNavigate } from 'react-router-dom';

const Survey = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [choicesResponses, setChoicesResponses] = useState([]);
    const [scaleResponses, setScaleResponses] = useState([]);
    const [textResponses, setTextResponses] = useState([]);
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

    const handleChange = (e, questionId, question_type) => {
        const { value } = e.target;

            if(question_type === 1) {
                setChoicesResponses(prevChoicesResponses => ({
                    ...prevChoicesResponses,
                    [questionId]: value
                }));
            }else if(question_type === 2) {
                setScaleResponses(prevScaleResponses => ({
                    ...prevScaleResponses,
                    [questionId]: value
                }));
            }else if(question_type === 3) {
                setTextResponses(prevTextResponses => ({
                    ...prevTextResponses,
                    [questionId]: value
                }));
            }
        // setFormData(prevFormData => ({
        //     ...prevFormData,
        //     [questionId]: value  
        // }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requests_choices = Object.entries(choicesResponses).map(([key, value]) => {
            const question_id = parseInt(key);
            const answer = value;
            
            const multipleChoice = axios.post('http://localhost:3000/choices-response/choice', { answer, question_id }, { withCredentials: true });
           
            return multipleChoice;
        })
        const requests_scale = Object.entries(scaleResponses).map(([key, value]) => {
            const question_id = parseInt(key);
            const answer = parseInt(value);
            
            const scale = axios.post('http://localhost:3000/scales-response/scale', { question_id, answer }, { withCredentials: true });
            
            return scale;
        })
        const requests_comment = Object.entries(textResponses).map(([key, value]) => {
            const question_id = parseInt(key);
            const answer = value;

            return axios.post('http://localhost:3000/comment-response/comment', { question_id, answer }, { withCredentials: true });
        });

        try {
            await Promise.all(requests_choices, requests_scale, requests_comment);
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

                            {/* QUESTIONS WITH MULTIPLE CHOICE */}
                            {questions
                                .filter(q => q.category_id === categories[currentPage].id && q.question_type === 1)
                                .map((q) => (
                                    <div className="question-row" key={q.id}>
                                        <p className="question">{q.question}</p>
                                        <div className="choices">
                                            {choices
                                                .filter(c => c.question_id === q.id)
                                                .map((c) => (
                                                    <label key={c.id}>
                                                        <input
                                                            type="radio"
                                                            name={`question_${q.id}`}
                                                            value={c.optionn}
                                                            checked={choicesResponses[q.id] === c.optionn}
                                                            onChange={(e) => handleChange(e, q.id, q.question_type)}
                                                            required
                                                        />
                                                        {c.optionn}
                                                    </label>
                                                ))} 
                                        </div>
                                    </div>
                                ))
                            }

                            {/* QUESTIONS WITH SCALE */}
                            {instructions.filter(i => i.category_id === categories[currentPage].id).map((i) => (
                                <div key={i.id}>
                                    <p>{i.instruction}</p>
                                    {questions
                                        .filter(q => q.category_id === categories[currentPage].id && q.question_type === 2)
                                        .map((q) => (
                                            <div className="question-row" key={q.id}>
                                                <p className="question">{q.question}</p>
                                                    {[5, 4, 3, 2, 1].map((value) => (
                                                        <label key={value}>
                                                            <input
                                                                type="radio"
                                                                name={`question_${q.id}`}
                                                                value={value}
                                                                checked={scaleResponses[q.id] === String(value)}
                                                                onChange={(e) => handleChange(e, q.id, q.question_type)}
                                                                required
                                                            />
                                                            {value}
                                                        </label>
                                                    ))}
                                            </div>
                                        ))
                                    }
                                </div>
                            ))}
                            {/* {questions
                                .filter(q => q.category_id === categories[currentPage].id && q.question_type === 2)
                                .map((q) => (
                                        <div className="question-row" key={q.id}>
                                        <p className="question">{q.question}</p>
                                            {[5, 4, 3, 2, 1].map((value) => (
                                                <label key={value}>
                                                    <input
                                                        type="radio"
                                                        name={`question_${q.id}`}
                                                        value={value}
                                                        checked={scaleResponses[q.id] === String(value)}
                                                        onChange={(e) => handleChange(e, q.id, q.question_type)}
                                                        required
                                                    />
                                                    {value}
                                                </label>
                                            ))}
                                        </div>
                                ))
                            } */}

                            {/* QUESTIONS WITH TEXT/COMMENT */}
                            {questions
                                .filter(q => q.category_id === categories[currentPage].id && q.question_type === 3)
                                .map((q) => (
                                    <div className="question-row" key={q.id}>
                                        <p className="question">{q.question}</p>
                                        <input
                                            type="text"
                                            name={`question_${q.id}`}
                                            value={textResponses[q.id] || ''}
                                            onChange={(e) => handleChange(e, q.id, q.question_type)}
                                            required
                                        />
                                    </div>
                                ))
                            }

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
