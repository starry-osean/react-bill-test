import logo from './logo.svg';
import './App.css';
import Sum from '@/test'
function App() {
  const total=Sum(1,3)
  console.log(total);
  
  return (
    <div className="App">
    
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
    </div>
  );
}

export default App;
