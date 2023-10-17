import './App.css';
import Сalendar from './components/Calendar/Calendar';

const now = new Date();

function App() {
  return <Сalendar date={now} />
}

export default App;
