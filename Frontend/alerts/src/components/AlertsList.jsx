import React, { useEffect, useState } from "react";
import axios from "axios";
import mail from '../assets/mail.png';


function AlertsList() {
  const [metrics, setMetrics] = useState([]); // State to store the metrics data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle error if fetching fails

  // Fetch metrics data from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/metrics")
      .then((response) => {
        setMetrics(response.data); // Store the data from backend
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        setError("Error fetching metrics"); // Handle errors if request fails
        setLoading(false);
      });
  }, []);

  // Render loading, error, or the data itself
  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Failed Request Metrics</h2>
      <table>
        <thead>
          <tr>
            <th>IP Address</th>
            <th>Reason</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric._id}>
              <td>{metric.ip}</td>
              <td>{metric.reason}</td>
              <td>{new Date(metric.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* <div id="alerts">
        <p>Gmail Alerts</p>
        <img src={mail} width={900} />
      </div> */}
    
    </div>
  );
}

export default AlertsList;
