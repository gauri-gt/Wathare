import logo from './logo.svg';
import './App.css';
import TimeScale from './views/timescale';
import Header from './componenets/Header';
import Footer from './componenets/Footer';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <TimeScale></TimeScale>
      <Footer></Footer>
    </div>
  );
}

export default App;
