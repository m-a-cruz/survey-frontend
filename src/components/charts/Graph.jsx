import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function Graph() {

    
  return (
    <div>
      <h2>Graph from API Data</h2>
      <Line data={chartData} />
    </div>
  )
}

export default Graph
