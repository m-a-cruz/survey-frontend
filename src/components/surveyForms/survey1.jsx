import React, { useState } from 'react';

function Survey1() {
    const [responses, setResponses] = useState({});

    // Sample Questions
    const questions = [
        { id: "1", Q: "Program: " },
        { id: "2", Q: "Year Level: " },
        { id: "3", Q: "Type of students: " },
        { id: "4", Q: "Classification: " },
    ];

    // Sample Scales
    const choices = [
        { id: "1", title: "program", value: [
            { id: 1, title: "BS Computer Science", type: "radio", value: "BS Computer Science" },
            { id: 2, title: "BS Information System", type: "radio", value: "BS Information System" },
        ]
        },
        { id: "2", title: "year level", value: [
            { id: 1, title: "1st Year", type: "radio", value: "1st Year" },
            { id: 2, title: "2nd Year", type: "radio", value: "2nd Year" },
            { id: 3, title: "3rd Year", type: "radio", value: "3rd Year" },
            { id: 4, title: "4th Year", type: "radio", value: "4th Year" },
        ]
        },
        { id: "3", title: "type of student", value: [
            { id: 1, title: "Transferee Student", type: "radio", value: "Transferee" },
            { id: 2, title: "Returnee Student", type: "radio", value: "Returnee" },
            { id: 3, title: "Shiftee Student", type: "radio", value: "Shiftee" },
            { id: 4, title: "Regular Student", type: "radio", value: "Regular" },
        ]
        },
        { id: "4", title: "classification", value: [
            { id: 1, title: "Fulltime Student", type: "radio", value: "Fulltime Student" },
            { id: 2, title: "Working Student", type: "radio", value: "Working Student" },
            { id: 3, title: "Scholar", type: "radio", value: "Scholar" },
            { id: 4, title: "Student Assistant", type: "radio", value: "Student Assistant" },
        ]
        },
    ];

    // Function to handle radio input change
    const handleRadioChange = (questionId, choiceValue) => {
        setResponses({
            ...responses,
            [questionId]: choiceValue
        });
    };

    return (
        <div className='container'>
            <div className='container m-5 p-1 flex-col'>
                {questions.map((question) => (
                    <div key={question.id} className="m-2 inline-flex">
                        <div className="mb-2 inline-flex">
                            {question.Q}
                            <div className="flex-wrap inline-flex">
                                {choices[question.id - 1].value.map((choice) => (
                                    <div key={choice.id} className='m-2 inline-flex items-center'>
                                        <input
                                            type="radio"
                                            id={`choice-${choice.id}`}
                                            name={`question-${question.id}`}
                                            value={choice.value}
                                            checked={responses[question.id] === choice.value}
                                            onChange={() => handleRadioChange(question.id, choice.value)}
                                        />
                                        <label htmlFor={`choice-${choice.id}`} className="ml-1">{choice.title}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Survey1;
