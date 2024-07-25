import React, { useState } from 'react';
import Chart from "react-apexcharts";
import "./Dashboard.css";

function Dashboard() {
  const userData = JSON.parse(localStorage.getItem('user')) || [];
  const defaultUser = {
    uploadCount: 0 ,
    cocoSsdCount:0,
    mobileNetCount:0,
    email:''// Initialize with a default value
  };
  const user = userData.length > 0 ? userData[0] : defaultUser;

  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'March', 'April', 'May', 'June','July','Aug','Sep','Oct','Nov','Dec']
    }
  });
console.log(user.uploadCount)
  const [chartSeries, setChartSeries] = useState([
    {
      name: "series-1",
      data: [25, 40, 45, 50, 70, 91,user.uploadCount,0,0,0,0,0]
    }
  ]);

  const [options, setOptions] = useState({
    legend: {
      position: 'bottom',
    },
  });

  const [series, setSeries] = useState([user.cocoSsdCount, user.mobileNetCount]);
  const [labels, setLabels] = useState(['Object Detection', 'MobileNet Count']);
  console.log(user.uploadCount)
  return (
    <div className="app" style={{ minHeight: '100vh', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}> {/*changes */}
        <div className="mixed-chart">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            width="500"
          />
        </div>
        <div className="donut">
          <Chart options={{ ...options, labels }} series={series} type="donut" width="380" />
        </div>
      </div>
      <div style={{ marginTop: '5px', fontWeight: 'bold', color: 'white' }}>
       <br></br>
       <br></br>
       
        User Usage
        
      </div>
    </div>
  );
}

export default Dashboard;
