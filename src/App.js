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
  NetworkIcon,
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
  const [isMobileView, setIsMobileView] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 700);
    };

    // Установить первоначальное состояние
    handleResize();

    // Добавить обработчик события
    window.addEventListener('resize', handleResize);

    // Удалить обработчик при размонтировании
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobileView) {
    return (
      <div className="loaderContainer">
        <p className="progress-message">This website is desktop-only.</p>
        <p className="progress-message">
          Please access it from a desktop computer.
        </p>
      </div>
    );
  }

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
        <h1 class="text">
          <span class="letter letter-1">P</span>
          <span class="letter letter-2">L</span>
          <span class="letter letter-3">U</span>
          <span class="letter letter-4">P</span>
        </h1>
        {/* <h1 className="main-title">PLUP</h1> */}
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
              <span className="metric_name">
                <ProcessorIcon /> CPU LOAD:
              </span>
              <span>{`${SYSTEMS_METRICS[activeMetric].cpu_load}%`}</span>
            </div>
            <div className="metric_item">
              <span className="metric_name">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" x2="2" y1="12" y2="12"></line>
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                  <line x1="6" x2="6.01" y1="16" y2="16"></line>
                  <line x1="10" x2="10.01" y1="16" y2="16"></line>
                </svg>
                MEMORY:
              </span>
              <span>{`${SYSTEMS_METRICS[activeMetric].memory}/1TB`}</span>
            </div>
            <div className="metric_item">
              <span className="metric_name">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
                </svg>
                TEMPERATURE:
              </span>
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
                  <NetworkIcon />
                  Neural Pathways
                </h3>
                <p>1.1T Active</p>
              </li>
              <li className="grid_list-item">
                <h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
                    <path d="M3 12A9 3 0 0 0 21 12"></path>
                  </svg>
                  Knowledge Base
                </h3>
                <p>{SYSTEMS_METRICS[activeMetric].knowledge_base}TB Indexed</p>
              </li>
              <li className="grid_list-item">
                <h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  Response Time
                </h3>
                <p>{SYSTEMS_METRICS[activeMetric].responce_time}ms Avg</p>
              </li>
              <li className="grid_list-item">
                <h3>
                  <AiIcon width={16} height={16} />
                  Accuracy
                </h3>
                <p>{SYSTEMS_METRICS[activeMetric].accuracy}%</p>
              </li>
              <li className="grid_list-item">
                <h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      width="18"
                      height="11"
                      x="3"
                      y="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
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
