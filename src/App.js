import { useState, useEffect, useRef } from 'react';
import {
  AiIcon,
  HexagonAnimation,
  Matrix,
  MatrixIcon,
  ProcessorIcon,
  LampIcon,
  DynamicScrollText,
} from './components';
import { SYSTEMS_METRICS } from './constants/systemMetrics';
import { ReactTyped } from 'react-typed';
import './styles.scss';

function App() {
  const [activeMetric, setActiveMetric] = useState(0);
  const sourceRef = useRef(null); // Ссылка на блок-источник
  const targetRef = useRef(null); // Ссылка на блок-приемник
  const [sourceHeight, setSourceHeight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prevActiveMetric) =>
        prevActiveMetric < SYSTEMS_METRICS.length - 1 ? prevActiveMetric + 1 : 0
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === sourceRef.current) {
          // Обновляем высоту, если изменяется размер источника
          setSourceHeight(entry.contentRect.height);
        }
      }
    });

    if (sourceRef.current) {
      observer.observe(sourceRef.current);
    }

    return () => {
      if (sourceRef.current) {
        observer.unobserve(sourceRef.current);
      }
    };
  }, []);

  return (
    <div className="App">
      <div className="container">
        <header>
          SYSTEM STATUS: [ONLINE] 👥 VISITORS: [
          {SYSTEMS_METRICS[activeMetric].visitors}]
        </header>
        <h1 className="main-title">PLUP</h1>
        <div className="grid">
          <div
            className="grid_item"
            ref={targetRef}
            style={{
              height: `${sourceHeight}px`, // Высота синхронизирована
            }}
          >
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
          <div
            className="grid_item"
            style={{
              height: `${sourceHeight}px`, // Высота синхронизирована
            }}
          >
            <h2 className="grid_title">UPDATE LOG</h2>
            <DynamicScrollText />
          </div>
          <div className="grid_item">
            <h2 className="grid_title">
              <AiIcon />
              AI SYSTEM STATUS
            </h2>
            <ul className="grid_list">
              <li className="grid_list-item">
                <h3>
                  <ProcessorIcon />
                  Model Version
                </h3>
                <p>2.4.1</p>
              </li>
              <li className="grid_list-item">
                <h3>
                  <ProcessorIcon />
                  Neural Pathways
                </h3>
                <p>1.1T Active</p>
              </li>
              <li className="grid_list-item">
                <h3>
                  <LampIcon />
                  Knowledge Base
                </h3>
                <p>{SYSTEMS_METRICS[activeMetric].knowledge_base}TB Indexed</p>
              </li>
              <li className="grid_list-item">
                <h3>
                  <LampIcon />
                  Response Time
                </h3>
                <p>{SYSTEMS_METRICS[activeMetric].responce_time}ms Avg</p>
              </li>
              <li className="grid_list-item">
                <h3>
                  <ProcessorIcon />
                  Accuracy
                </h3>
                <p>{SYSTEMS_METRICS[activeMetric].accuracy}%</p>
              </li>
              <li className="grid_list-item">
                <h3>
                  <LampIcon />
                  System Uptime
                </h3>
                <p>{SYSTEMS_METRICS[activeMetric].system_update}%</p>
              </li>
            </ul>
            <div className="grid_frame">
              <pre>
                Active Tasks: {SYSTEMS_METRICS[activeMetric].active_tasks} |
                Queue: {SYSTEMS_METRICS[activeMetric].queue} | Load: Optimal
              </pre>
            </div>
          </div>
          <div className="grid_item" ref={sourceRef}>
            <h2 className="grid_title matrix-text">
              <MatrixIcon /> SYSTEM ACTIVE
            </h2>
            <Matrix />
          </div>
          <div className="grid_item">
            <h2 className="grid_title">
              <MatrixIcon /> PROCESS MATRIX
            </h2>
            <HexagonAnimation />
          </div>

          <div className="grid_item">
            <h2 className="grid_title">
              <AiIcon />
              COGNITIVE ARCHITECTURE
            </h2>
            <ul className="grid_list grid_list--white">
              <li className="grid_list-item">
                <h3>
                  <AiIcon width={14} height={14} /> Neural Pathways
                </h3>
                <p>
                  Advanced neural network with 12.4B parameters optimized for
                  complex decision making and pattern recognition.
                </p>
              </li>
              <li className="grid_list-item">
                <h3>
                  <ProcessorIcon />
                  Processing Units
                </h3>
                <p>
                  Distributed quantum processing architecture capable of
                  handling 1.2M operations per second.
                </p>
              </li>
              <li className="grid_list-item">
                <h3>
                  <LampIcon />
                  Learning Systems
                </h3>
                <p>
                  Self-improving algorithms with reinforcement learning
                  capabilities and adaptive neural plasticity.
                </p>
              </li>
            </ul>
            <div className="grid_frame">
              <pre>
                System Status: OPERATIONAL | Neural Load: 87% | Learning Rate:
                1.2e-4
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
