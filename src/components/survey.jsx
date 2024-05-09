import React, { useState, useEffect } from 'react';

function Survey() {
  const instructionPerPage = 1; // Number of instructions per page
  const questionsPerPage = 5; // Number of questions per page
  const [currentPage, setCurrentPage] = useState(0); // State variable to track current page
  const [responsesScale, setResponsesScale] = useState({}); // State variable to store responses
  const [responsesMultipleChoice, setResponsesMultipleChoice] = useState({}); // State variable to store multiple choice responses

  // Sample Questions
  const questions = [
    { id: "1", Q: "Strong math and science skills" },
    { id: "2", Q: "Motivation, interest, and passion for the chosen field of study" },
    { id: "3", Q: "High quality of instruction and teaching" },
    { id: "4", Q: "Good problem-solving and analytical skills" },
    { id: "5", Q: "Ability to learn and apply new concepts quickly" },

    { id: "6", Q: "Strodfghdfhgdfhg" },
    { id: "7", Q: "Motidfghdfghdffor the chosen field of study" },
    { id: "8", Q: "High quality ghd and teaching" },
    { id: "9", Q: "Good probledskills" },
    { id: "10", Q: "Ability to lehconcepts quickly" },

    { id: "11", Q: "1" },
    { id: "12", Q: "2" },
    { id: "13", Q: "3" },
    { id: "14", Q: "4" },
    { id: "15", Q: "5" },
  ];

  // Sample Instructions
  const instructions = [
    { I: "Please answer each question as accurately as possible. Your responses will be used to help us improve your experience with the survey. Thank you for your time." },
    { I: "adfasdfasfd" },
    { I: "adfasdfasfdgfsfdgsgsdfg" },
  ];

  // Sample Scales
  const scales = [
    { id: "radio-5", title: "5", type: "radio", value: 5 },
    { id: "radio-4", title: "4", type: "radio", value: 4 },
    { id: "radio-3", title: "3", type: "radio", value: 3 },
    { id: "radio-2", title: "2", type: "radio", value: 2 },
    { id: "radio-1", title: "1", type: "radio", value: 1 }
  ];

  // Calculate the index range for the current page for instructions
  const startIndex = currentPage * instructionPerPage;
  const endIndex = Math.min(startIndex + instructionPerPage, instructions.length);

  // Calculate the index range for the current page for questions
  const startQuestionIndex = currentPage * questionsPerPage;
  const endQuestionIndex = Math.min(startQuestionIndex + questionsPerPage, questions.length);

  // Function to handle next page click
  const nextPage = () => {
    if (currentPage < Math.ceil(instructions.length / instructionPerPage) - 1) {
      setCurrentPage(currentPage + 1);
      console.log(responsesScale); //Console display the temporary responses
    }
  };

  // Function to handle previous page click
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };

  // Function to handle radio input change
  const handleRadioChange = (questionId, value) => {
    setResponsesScale({
      ...responsesScale,
      [questionId]: value
    });
  };

  // Update responses when navigating to previous page
  useEffect(() => {
    const prevPageQuestions = questions.slice(startQuestionIndex, endQuestionIndex);
    const prevPageResponses = { ...responsesScale };
    prevPageQuestions.forEach(question => {
      if (!prevPageResponses[question.id]) {
        prevPageResponses[question.id] = '';
      }
    });
    setResponsesScale(prevPageResponses);
  }, [currentPage]);

  return (
    <>
      <div className='container'>
        <div className='container m-2 p-1'>
          {instructions.slice(startIndex, endIndex).map((instruction, index) => (
            <p key={index}>{instruction.I}
              <div className='flex justify-center items-center flex-col m-5'>
                <p>5 - Extremely Contributing</p>
                <p>4 - Significantly Contributing</p>
                <p>3 - Moderately Contributing</p>
                <p>2 - Slightly Contributing</p>
                <p>1 - Not At All Contributing</p>
              </div>
              <div className='m-5'>
                {questions.slice(startQuestionIndex, endQuestionIndex).map((question, index) => (
                  <div className='w-auto' key={startQuestionIndex + index}>
                    <div className='max-w-screen-md flex flex-wrap items-end justify-between mx-auto'>
                      <div><p>{question.Q}</p></div>
                      <div className='flex-start items-end'>
                        {scales.map((scale) => (
                          <div className='flex-start justify-center inline-flex items-center flex-col m-0 p-1' key={scale.id}>
                            <label name={question.id} htmlFor={scale.id}>{scale.title}</label>
                            <input
                              name={question.id}
                              value={scale.value}
                              id={scale.id}
                              type={scale.type}
                              required
                              checked={responsesScale[question.id] === scale.value} // Check if response matches scale value
                              onChange={() => handleRadioChange(question.id, scale.value)} // Pass question id and scale value to handleRadioChange
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </p>
          ))}
        </div>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          <div>
            <button onClick={prevPage} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous
            </button>
          </div>
          <div>
            <button onClick={nextPage} className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Survey;
