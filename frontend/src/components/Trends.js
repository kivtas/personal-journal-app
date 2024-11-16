import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for chart.js v3+
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Trends() {
  const [chartData, setChartData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/entries`);
        const entries = response.data;

        // Map timestamps and sentiments to arrays for the chart
        const timestamps = entries.map(entry => new Date(entry.timestamp).toLocaleDateString());
        const sentiments = entries.map(entry => entry.sentiment);

        setChartData({
          labels: timestamps,
          datasets: [
            {
              label: 'Sentiment Over Time',
              data: sentiments,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
        setError('Error fetching sentiment data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Sentiment Trends</h1>
      {error && <p>{error}</p>}
      <div style={{ width: '80%', margin: '0 auto' }}>
        {chartData.labels ? (
          <Line data={chartData} />
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}

export default Trends;
