import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import './css/Dashboard.css';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Doughnut, Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {
  const [dropdownState, setDropdownState] = useState({
    4: false,
    5: false,
    6: false,
    7: false,
  });

  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataAnalysis, setDataAnalysis] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [choices, setChoices] = useState([]);
  const [choicesResponses, setChoicesResponse] = useState([]);
  const [scaleResponses, setScaleResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [filteredDataChoices, setFilteredDataChoices] = useState([]);
  const [filteredDataScale, setFilteredDataScale] = useState([]);

  const scaleLabels = [
    { id: 1, label: 'Extremely', value: 1 },
    { id: 2, label: 'Significantly', value: 2 },
    { id: 3, label: 'Neutral', value: 3 },
    { id: 4, label: 'Slightly', value: 4 },
    { id: 5, label: 'Not at all', value: 5 },
  ];

  const toggleDropdown = (id, content) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    if (dropdownState[id]) {
      setIsModalOpen(false);
    } else {
      setModalContent(content);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDropdownState({
      4: false,
      5: false,
      6: false,
      7: false,
    });
  };

  useEffect(() => {
    fetchDataAnalysis();
    fetchSubcategories();
    fetchScaleResponses();
    fetchChoices();
    fetchChoicesResponses();
    fetchQuestions();
  }, []);

  const fetchDataAnalysis = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/data-analysis/analysis');
      setDataAnalysis(data);
    } catch (error) {
      console.error('Error fetching data analysis:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/subcategories/subcategories');
      setSubcategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const fetchChoices = async () => {
    try {
      const response = await fetch('http://localhost:3000/choices/choices');
      const choices = await response.json();
      setChoices(choices);
    } catch (error) {
      console.error('Error fetching choices:', error);
    }
  };

  const fetchChoicesResponses = async () => {
    try {
      const response = await fetch('http://localhost:3000/choices-response/choices');
      const data = await response.json();
      setChoicesResponse(data);
    } catch (error) {
      console.error('Error fetching choices responses:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:3000/questions/questions');
      const questions = await response.json();
      setQuestions(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const fetchScaleResponses = async () => {
    try {
      const response = await fetch('http://localhost:3000/scales-response/scales');
      const data = await response.json();
      setScaleResponses(data);
    } catch (error) {
      console.error('Error fetching scale responses:', error);
    }
  };

  useEffect(() => {
    // FOR MULTIPLE CHOICES || QUESTION TYPE 1
    if (choices.length && choicesResponses.length) {
      const updatedFilteredChoices = choices.map((choice) => {
        const dataCount = choicesResponses.reduce((ac, entry) => {
          if (entry.answers === choice.optionn && entry.question_id === choice.question_id) {
            ac[choice.optionn] = (ac[choice.optionn] || 0) + 1;
          }
          return ac;
        }, {});
        return { label: choice.optionn, count: dataCount[choice.optionn] || 0, question_id: choice.question_id };
      });
      setFilteredDataChoices(updatedFilteredChoices);
    }

    // FOR SCALES || QUESTION TYPE 2
    if (scaleResponses.length && scaleLabels.length) {
      const updatedFilteredScales = questions
        .filter((question) => question.question_type === 2)
        .map((question) =>
          scaleLabels.map((scaleLabel) => {
            const dataCount = scaleResponses.reduce((ac, entry) => {
              if (entry.answer === scaleLabel.value && entry.question_id === question.id) {
                ac[scaleLabel.value] = (ac[scaleLabel.value] || 0) + 1;
              }
              return ac;
            }, {});
            return { label: scaleLabel.label, count: dataCount[scaleLabel.value] || 0, question_id: question.id };
          })
        ).flat();
      setFilteredDataScale(updatedFilteredScales);
    }
  }, [choices, choicesResponses, scaleResponses, questions]);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {dataAnalysis.map((header) => (
          <div key={header.id}>
            <h2
              className="dashboard-title"
              onClick={() => toggleDropdown(header.id, `Content for ${header.title}`)}
              style={{ cursor: 'pointer' }}
            >
              {header.title} {dropdownState[header.id] ? '▼' : '▲'}
            </h2>

            {subcategories
              .filter((subcategory) => subcategory.analysis_id === header.id)
              .map((subcategory) => (
                <div className="categories-container">
                <div className="button-wrapper" key={subcategory.id}>
                  <button
                    onClick={() => toggleDropdown(subcategory.id, subcategory.content)}
                    className="toggle-button"
                  >
                    <span>{subcategory.subcategory}</span>
                    <span className="toggle-icon">
                      {dropdownState[subcategory.id] ? '▼' : '▲'}
                    </span>
                  </button>
                  {dropdownState[subcategory.id] && (
                    <div>
                      {questions
                        .filter(
                          (question) =>
                            question.subcategory_id === subcategory.id
                        )
                        .map((question) => (
                          (question.question_type === 1) ? (
                            <div key={question.id}>
                              <Pie
                                options={{
                                  maintainAspectRatio: false,
                                }}
                                width={400}
                                height={400}
                                data={{
                                  labels: filteredDataChoices
                                    .filter((item) => item.question_id === question.id)
                                    .map((item) => item.label.split(':')[0]),
                                  datasets: [
                                    {
                                      data: filteredDataChoices
                                        .filter((item) => item.question_id === question.id)
                                        .map((item) => item.count),
                                      backgroundColor: [
                                        'rgba(43, 63, 229, 0.8)',
                                        'rgba(250, 192, 19, 0.8)',
                                        'rgba(253, 135, 135, 0.8)',
                                        'rgba(255, 99, 132, 0.8)',
                                        'rgba(54, 162, 235, 0.8)',
                                        'rgba(255, 206, 86, 0.8)',
                                        'rgba(75, 192, 192, 0.8)',
                                        'rgba(153, 102, 255, 0.8)',
                                      ],
                                      borderColor: [
                                        'rgba(43, 63, 229, 1)',
                                        'rgba(250, 192, 19, 1)',
                                        'rgba(253, 135, 135, 1)',
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                      ],
                                      borderWidth: 1,
                                    },
                                  ],
                                }}
                              />
                            </div>  
                          ) : (
                            <div key={question.id}>
                              <Pie
                                options={{
                                  maintainAspectRatio: false,
                                }}
                                width={400}
                                height={400}
                                data={{
                                  labels: filteredDataScale
                                    .filter((item) => item.question_id === question.id)
                                    .map((item) => item.label),
                                  datasets: [
                                    {
                                      data: filteredDataScale
                                        .filter((item) => item.question_id === question.id)
                                        .map((item) => item.count),
                                      backgroundColor: [
                                        'rgba(43, 63, 229, 0.8)',
                                        'rgba(250, 192, 19, 0.8)',
                                        'rgba(253, 135, 135, 0.8)',
                                        'rgba(255, 99, 132, 0.8)',
                                        'rgba(54, 162, 235, 0.8)',
                                        'rgba(255, 206, 86, 0.8)',
                                        'rgba(75, 192, 192, 0.8)',
                                        'rgba(153, 102, 255, 0.8)',
                                      ],
                                      borderColor: [
                                        'rgba(43, 63, 229, 1)',
                                        'rgba(250, 192, 19, 1)',
                                        'rgba(253, 135, 135, 1)',
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                      ],
                                      borderWidth: 1,
                                    },
                                  ],
                                }}
                              />
                            </div>
                          )
                        ))}
                    </div>
                  )}
                </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
