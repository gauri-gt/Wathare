import React, { useState, useEffect } from 'react';
import '../css/timescale.css'; // Import CSS for styling
import { fetchData } from '../services/dataService';

const TimeScale = () => {
  const [duration, setDuration] = useState('8hr'); // State to track selected duration
  const [data, setData] = useState([]);
  const [startTime, setStartTime] = useState("2024-01-21");
  const [tableData, setTableData] = useState([]);
  const countOneAndZeros = () => {
    const tableData = [];
    const hourCounts = {};

    // Iterate through the data
    data.forEach(doc => {
      const timestamp = new Date(doc.ts);
      const hour = timestamp.getHours();

      // Initialize counts for each hour
      if (!hourCounts[hour]) {
        hourCounts[hour] = { ones: 0, zeros: 0, missingData: 0 };
      }

      // Update counts based on machine status
      if (doc.machine_status === 1) {
        hourCounts[hour].ones++;
      } else if (doc.machine_status === 0) {
        hourCounts[hour].zeros++;
      }
    });
    for (const hour in hourCounts) {
      tableData.push({
        hour: `${hour}:00 - ${hour + 1}:00`,
        ones: hourCounts[hour].ones,
        zeros: hourCounts[hour].zeros,
        missingData: 3600 - (hourCounts[hour].ones + hourCounts[hour].zeros)
      });
      setTableData([...tableData]);
    }
  }
  useEffect(() => {
    fetchData(startTime)
      .then((data) => {
        console.log(data);
        setData([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
    countOneAndZeros();
  }, [duration, startTime]);
  // Calculate segment width based on number of data points
  const segmentWidth = 100 / data.length;

  // Function to handle duration change
  const handleDurationChange = (newDuration) => {
    if (newDuration === "next") {
      setStartTime("2024-01-21T16:")
    }
    else if (newDuration === "8hr") {
      setDuration("8hr")
      setStartTime("2024-01-21")
    }
    else if (newDuration === "1hr") {
      setDuration("1hr")
      setStartTime("2024-01-21T15:")
    }
  };

  return (
    <div>
      {/* Controller bar */}
      <div className="controller-bar">
        <span className="title">Machine Status Scale</span>
        <select value={duration} onChange={(e) => handleDurationChange(e.target.value)}>
          <option value="1hr">1 Hour</option>
          <option value="8hr">8 Hours</option>
          <option value="1week">1 Week</option>
          <option value="1month">1 Month</option>
        </select>
        <button onClick={() => handleDurationChange('previous')}>&lt;</button>
        <button onClick={() => handleDurationChange('next')}>&gt;</button>

      </div>

      {/* Time scale */}
      <div className="time-scale-container">
        <div className="time-scale">
          {/* Map over machine status data to render colored segments */}
          {data && data.map((data, index) => (
            <div
              key={index}
              className={`segment segment-${data.machine_status === 0 ? '0' : data.machine_status === 1 ? '1' : 'missing'}`}
              style={{ width: `${segmentWidth}%`, left: `${index * segmentWidth}%` }}
            />
          ))}
        </div>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Hour</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Number of 1s</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Number of 0s</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Number of Missing Data</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(row => (
            <tr key={row.hour}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{row.hour}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{row.ones}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{row.zeros}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{row.missingData}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default TimeScale;
