import React, { useState } from "react";
import Survey1 from "./surveyForms/survey1";
import Survey2 from "./surveyForms/survey2";

function Survey() {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = [
    { id: 1, name: "Page 1", component: <Survey1 /> },
    { id: 2, name: "Page 2", component: <Survey2 /> },
  ];

  // Function to handle next page click
  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      
    }
  };

  // Function to handle previous page click
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {/* Components for Pagination */}
      <div key={pages[currentPage].id}>{pages[currentPage].component}</div>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <div>
          <button
            onClick={prevPage}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </div>
        <div>
          <button
            onClick={nextPage}
            className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Survey;
