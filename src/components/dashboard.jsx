import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import './css/Dashboard.css';

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
  }, []);

  const fetchDataAnalysis = async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/data-analysis/analysis');
        setDataAnalysis(data);
        // console.log(data);
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/subcategories/subcategories`);
      setSubcategories(data);
      // console.log(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  // const data = [
  //   {
  //     id: 1,
  //     title: "ANALYTICS AND DISTRIBUTION OF RESPONSES",
  //     categories: [
  //       { id: 1, title: "BY PROGRAM", content: "Graph for A" },
  //       { id: 2, title: "BY YEAR LEVEL", content: "Graph for B" },
  //       { id: 3, title: "BY CLASSIFICATION", content: "Graph for C" },
  //       { id: 4, title: "BY TYPE OF STUDENTS", content: "Graph for D" },
  //       { id: 5, title: "FACTORS THAT CONTRIBUTE TO STUDENT SUCCESS", content: "Graph for E" },
  //       { id: 6, title: "IMPORTANCE OF STUDENT SUPPORT", content: "Graph for E" },
  //       { id: 7, title: "FACILITIES AND SERVICES USAGE", content: "Graph for E" },
  //       { id: 8, title: "MOST FREQUENTLY USE FACILITY/SERVICES", content: "Graph for E" },
  //       { id: 9, title: "STUDENT SENTIMENTS ON COLLEGE FACILITIES", content: "Graph for E" },
  //       { id: 10, title: "STUDENT SUGGESTIONS FOR IMPROVEMENT", content: "Graph for E" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "DAILY STUDENT LIFE EXPERIENCES",
  //     categories: [
  //       { id: 11, title: "TEACHING QUALITY AND INSTRUCTION", content: "Graph for C" },
  //       { id: 12, title: "INSTRUCTOR ENGAGEMENT", content: "Graph for D" },
  //       { id: 13, title: "COURSES AND PROGRAM", content: "Graph for D" },
  //       { id: 14, title: "EXPERIENTIAL LEARNING PROGRAMS", content: "Graph for D" },
  //       { id: 15, title: "WORKLOAD, ACTIVITIES AND ASSESSMENTS", content: "Graph for D" },
  //       { id: 16, title: "LEARNING ENVIRONMENT", content: "Graph for D" },
  //       { id: 17, title: "STUDENT SENTIMENTS ON CCS TEACHING QUALITY AND INSTRUCTION", content: "Graph for D" },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: "EFFECTIVENESS OF SERVICES TOWARDS STUDENT NEEDS",
  //     categories: [
  //       { id: 18, title: "ON ACADEMIC GROWTH AND DEVELOPMENT", content: "Graph for E" },
  //       { id: 19, title: "ON PERSONAL GROWTH AND DEVELOPMENT", content: "Graph for E" },
  //       { id: 20, title: "STUDENT SENTIMENTS TOWARDS THE LRC", content: "Graph for E" },
  //       { id: 21, title: "STUDENTS SENTIMENTS TOWARDS THE GTC", content: "Graph for E" },
  //       { id: 22, title: "STUDENT SUPPORT SUGGESTIONS", content: "Graph for E" },
  //       { id: 23, title: "STUDY HABITS CHALLENGES AND FACTORS", content: "Graph for E" },
  //       { id: 24, title: "STUDENT SUPPORT SUGGESTIONS", content: "Graph for E" },
  //     ],
  //   },
  //   { id: 4, title: "STUDY HABITS CHALLENGES AND FACTORS", categories: [] },
  //   { id: 5, title: "STUDENTS PLANS AFTER GRADUATION", categories: [] },
  //   { id: 6, title: "GENERAL IMPRESSION OF THE COLLEGE INSTRUCTORS", categories: [] },
  //   { id: 7, title: "OTHER SUGGESTIONS FOR OVERALL STUDENT LIFE EXPERIENCES IMPROVEMENT", categories: [] },
  // ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {dataAnalysis.map((header) => (
          <div key={header.id}>
            <h2
              className='dashboard-title'
              // onClick={() => toggleDropdown(header.id, `Content for ${header.title}`)}
              // style={{ cursor: header.categories.length === 0 ? 'pointer' : 'default' }}
            >
              {header.title} {(dropdownState[header.id] ? '▼' : '▲')}
            </h2>

            {subcategories.filter((subcategory) => subcategory.analysis_id === header.id).map((subcategory) => (
              <div className='buttion-wrapper' key={subcategory.id}>
                <button
                  onClick={() => toggleDropdown(subcategory.id, subcategory.content)}
                  className='toggle-button'
                >
                  <span>{subcategory.subcategory}</span>
                  <span className='toggle-icon'>
                    {dropdownState[subcategory.id] ? '▼' : '▲'}
                  </span>
                </button>
                {dropdownState[subcategory.id] && (
                  <div>Content</div>
                )}
              </div>
            ))}
          </div>
        ))}



        {/* {data.map((header) => (
          <div key={header.id}>
            <h2
              className="dashboard-title"
              // onClick={() => toggleDropdown(header.id, `Content for ${header.title}`)}
              // style={{ cursor: header.categories.length === 0 ? 'pointer' : 'default' }}
            >
              {header.title} {header.categories.length === 0 && (dropdownState[header.id] ? '▼' : '▲')}
            </h2>
            {header.categories.length > 0 ? (
              <div className="categories-container">
                {header.categories.map((category) => (
                  <div className="button-wrapper" key={category.id}>
                    <button onClick={() => toggleDropdown(category.id, category.content)} className="toggle-button">
                      <span>{category.title}</span>
                      <span className="toggle-icon">
                        {dropdownState[category.id] ? '▼' : '▲'}
                      </span>
                    </button>
                    {dropdownState[category.id] && (
                      <div></div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              dropdownState[header.id] && (
                <div></div>
              )
            )}
          </div>
        ))} */}
        {/* <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} /> */}
      </div>
    </div>
  );
}

export default Dashboard;