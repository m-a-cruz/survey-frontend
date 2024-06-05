import '../Dashboard.css';
import { useState } from 'react';

function Dashboard() {
  // DROPDOWN FUNCTION
  const [dropdown, setDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const dropCategory = (id) => {
    setDropdown(!dropdown);
    setActiveCategory(id);
  };

  const data = [
    {
      id: 1,
      title: "ANALYTICS AND DISTRIBUTION OF RESPONSES",
      categories: [
        { id: 1, title: "BY PROGRAM", content: "Graph for A" },
        { id: 2, title: "BY YEAR LEVEL", content: "Graph for B" },
        { id: 3, title: "BY CLASSIFICATION", content: "Graph for C" },
        { id: 4, title: "BY TYPE OF STUDENTS", content: "Graph for D" },
        { id: 5, title: "FACTORS THAT CONTRIBUTE TO STUDENT SUCCESS", content: "Graph for E" },
        { id: 6, title: "IMPORTANCE OF STUDENT SUPPORT", content: "Graph for E" },
        { id: 7, title: "FACILITIES AND SERVICES USAGE", content: "Graph for E" },
        { id: 8, title: "MOST FREQUENTLY USE FACILITY/SERVICES", content: "Graph for E" },
        { id: 9, title: "STUDENT SENTIMENTS ON COLLEGE FACILITIES", content: "Graph for E" },
        { id: 10, title: "STUDENT SUGGESTIONS FOR IMPROVEMENT", content: "Graph for E" },
      ]},
    {
      id: 2,
      title: "DAILY STUDENT LIFE EXPERIENCES",
      categories: [
        { id: 1, title: "TEACHING QUALITY AND INSTRUCTION", content: "Graph for C" },
        { id: 2, title: "INSTRUCTOR ENGAGEMENT", content: "Graph for D" },
        { id: 3, title: "COURSES AND PROGRAM", content: "Graph for D" },
        { id: 4, title: "EXPERIENTIAL LEARNING PROGRAMS", content: "Graph for D" },
        { id: 5, title: "WORKLOAD, ACTIVITIES AND ASSESSMENTS", content: "Graph for D" },
        { id: 6, title: "LEARNING ENVIRONMENT", content: "Graph for D" },
        { id: 7, title: "STUDENT SENTIMENTS ON CCS TEACHING QUALITY AND INSTRUCTION", content: "Graph for D" },
      ]},
    {
      id: 3,
      title: "EFFECTIVENESS OF SERVICES TOWARDS STUDENT NEEDS",
      categories: [
        { id: 1, title: "ON ACADEMIC GROWTH AND DEVELOPMENT", content: "Graph for E" },
        { id: 2, title: "ON PERSONAL GROWTH AND DEVELOPMENT", content: "Graph for E" },
        { id: 3, title: "STUDENT SENTIMENTS TOWARDS THE LRC", content: "Graph for E" },
        { id: 4, title: "STUDENTS SENTIMENTS TOWARDS THE GTC", content: "Graph for E" },
        { id: 5, title: "STUDENT SUPPORT SUGGESTIONS", content: "Graph for E" },
        { id: 6, title: "STUDY HABITS CHALLENGES AND FACTORS", content: "Graph for E" },
        { id: 7, title: "STUDENT SUPPORT SUGGESTIONS", content: "Graph for E" },  
      ]},
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {data.map((header) => (
          <div key={header.id}>
            <h2 className="dashboard-title">{header.title}</h2>
            <div className="categories-container">
              {header.categories.map((category) => (
                <div className="button-wrapper" key={category.id}>
                  <button onClick={() => dropCategory(category.id)} className="toggle-button">
                    <span>{category.title}</span>
                    <span className="toggle-icon">{dropdown && activeCategory === category.id ? '▼' : '▲'}</span>
                  </button>
                  {dropdown && activeCategory === category.id && (
                    <div className="dropdown-content">{category.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;