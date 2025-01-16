import './styles.scss';
import { Matrix } from './components/matrix';
import { HexagonAnimation } from './components/hexagon';

function App() {
  return (
    <div className="App">
      <div className="container">
        <header>SYSTEM STATUS: [ONLINE] 👥 VISITORS: [203]</header>

        <h1 className="main-title">PLUP</h1>

        <div className="grid">
          <div className="grid_item">SYSTEM METRICS</div>
          <div className="grid_item">UPDATE LOG</div>
          <div className="grid_item">
            <HexagonAnimation />
          </div>
          <div className="grid_item">
            <Matrix />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
