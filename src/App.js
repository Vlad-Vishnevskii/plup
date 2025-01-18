import { useState, useEffect, useRef } from 'react';
import {
  AiIcon,
  HexagonAnimation,
  Matrix,
  MatrixIcon,
  ProcessorIcon,
  LampIcon,
  DynamicScrollText,
  LinkIcon,
  MonitorIcon,
  CloseIcon,
} from './components';
import { SYSTEMS_METRICS } from './constants/systemMetrics';
import Modal from 'react-modal';
import './styles.scss';

Modal.setAppElement('#root');

const handleDisableBodyScroll = () => {
  document.body.style.overflow = 'hidden';
};

const handleEnableBodyScroll = () => {
  document.body.style.overflow = 'unset';
};

function App() {
  const [activeMetric, setActiveMetric] = useState(0);
  const sourceRef = useRef(null); // Ссылка на блок-источник
  const targetRef = useRef(null); // Ссылка на блок-приемник
  const [sourceHeight, setSourceHeight] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [chatArr, setChatArr] = useState([
    { text: 'PLUP Terminal v1.0.0', isOwn: false, id: 0 },
    { text: 'Type your message and press Enter...', isOwn: false, id: 1 },
  ]);
  const [messageValue, setMessageValue] = useState('');
  const [loading, setLoading] = useState(true); // Стейт для загрузки
  const [progress, setProgress] = useState(0); // Стейт для процента прогресса
  const [message, setMessage] = useState('Initializing'); // Стейт для текста прелоадера

  function openModal() {
    setIsOpen(true);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && messageValue) {
      setChatArr((prev) => [
        ...prev,
        {
          text: messageValue,
          isOwn: true,
          id: prev.length,
        },
      ]);

      setTimeout(() => {
        setChatArr((prev) => [
          ...prev,
          {
            text: 'Could you provide more details about your request?',
            isOwn: false,
          },
        ]);
      }, 1000);

      setMessageValue('');
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  // Эффект для симуляции загрузки
  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 10); // Увеличиваем прогресс на 10% каждые 500мс
      } else {
        clearInterval(progressInterval); // Останавливаем таймер, когда прогресс достигает 100%
      }
    }, 300);

    // Эффект для изменения текста
    const messageInterval = setInterval(() => {
      switch (progress) {
        case 0:
          setMessage('Initializing');
          break;
        case 30:
          setMessage('Loading resources');
          break;
        case 60:
          setMessage('Almost there');
          break;
        case 90:
          setMessage('Finalizing');
          break;
        case 100:
          setMessage('Completed');
          break;
        default:
          setMessage('Loading...');
      }
    }, 300);

    // После 2 секунд скрываем прелоадер и показываем основной контент
    setTimeout(() => {
      clearInterval(messageInterval);
      setLoading(false);
    }, 3500);

    // Очистка интервалов
    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [progress]);

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
  }, [loading]);

  if (loading) {
    return (
      <div className="loaderContainer">
        <div className="loader">
          <span className="spiner"></span>
          <div className="progressBar">
            <div className="progress" style={{ width: `${progress}%` }} />
          </div>
          <p className="progress-message">{message}</p>
          <p className="progress-message">{progress}%</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <div>
            SYSTEM STATUS: [ONLINE] 👥 VISITORS: [
            {SYSTEMS_METRICS[activeMetric].visitors}]
          </div>
          <button className="button">
            <MonitorIcon /> CA
          </button>
        </header>
        <div className="top-links">
          <a className="button" href="#">
            <LinkIcon /> X
          </a>
          <button className="button button--disabled">
            <MonitorIcon /> DEPLOY <span>SOON</span>
          </button>
        </div>
        <h1 className="main-title">PLUP</h1>
        <div className="top-links">
          <button onClick={openModal} className="button">
            💬 CHAT
          </button>

          <button className="button button--disabled">
            👤 AGENT <span>SOON</span>
          </button>
        </div>
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
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={handleDisableBodyScroll}
        onAfterClose={handleEnableBodyScroll}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="Modal_title">
          <span>
            <MatrixIcon /> PLUP TERMINAL
          </span>
          <button className="Modal_close-btn" onClick={closeModal}>
            <CloseIcon />
          </button>
        </h2>
        <div className="Modal_content">
          {chatArr.map((item) => (
            <p
              key={item.id}
              class={`message ${item.isOwn ? 'message--own' : ''}`}
            >
              {item.text}
            </p>
          ))}
        </div>
        <div className="Modal_bottom">
          <span>{'>'}</span>
          <input
            type="text"
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={handleKeyDown}
          />
        </div>
      </Modal>
    </div>
  );
}

export default App;
