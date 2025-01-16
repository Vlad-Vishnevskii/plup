import { useState, useEffect } from 'react';
import { AiIcon, HexagonAnimation, Matrix } from './components';
import { SYSTEMS_METRICS } from './constants/systemMetrics';
import './styles.scss';

function App() {
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prevActiveMetric) =>
        prevActiveMetric < SYSTEMS_METRICS.length - 1 ? prevActiveMetric + 1 : 0
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <header>SYSTEM STATUS: [ONLINE] 👥 VISITORS: [203]</header>
        <h1 className="main-title">PLUP</h1>
        <div className="grid">
          <div className="grid_item">
            <h2 className="grid_title">SYSTEM METRICS</h2>
            <div className="metric_item">
              <span>CPU LOAD:</span>
              <span>{`${SYSTEMS_METRICS[activeMetric].cpu_load}%`}</span>
            </div>
            <div className="metric_item">
              <span>MEMORY:</span>
              <span>{`${SYSTEMS_METRICS[activeMetric].memory}/1TB`}</span>
            </div>
            <div className="metric_item">
              <span>TEMPERATURE:</span>
              <span>{`${SYSTEMS_METRICS[activeMetric].temperature}°C`}</span>
            </div>
          </div>
          <div className="grid_item">UPDATE LOG</div>
          <div className="grid_item">
            <AiIcon />
            AI SYSTEM STATUS
          </div>
          <div className="grid_item">
            <Matrix />
          </div>
          <div className="grid_item">
            <HexagonAnimation />
          </div>

          <div className="grid_item"> COGNITIVE ARCHITECTURE</div>
        </div>
      </div>
    </div>
  );
}

export default App;
