import './App.css';
import Сalendar from './components/Сalendar/Сalendar';

const now = new Date();

function App() {
  return (
    <Сalendar date={now} />
  );
}

export default App;
