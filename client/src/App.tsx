import Bench from './components/Bench';
import Gold from './components/Gold';
import Percentages from './components/Percentages';
import ShopButtons from './components/ShopButtons';
import ShopUnits from './components/ShopUnits';
import Level from './components/Level';
import Traits from './components/Traits';
import './App.css';
import GameForm from './components/GameForm';

function App() {
  return (
    <div className="App">
      <div className='UpperSection'>
        <div className='TraitsContainer'>
          <Traits/>
        </div>
        <div className='GameFormContainer'>
          <GameForm/>
        </div>
      </div>
      <div className='LowerSection'>
        <div className='BenchContainer'>
          <Bench/>
        </div>
        <div className='DashboardContainer'>
          <Level/>
          <Percentages/>
          <Gold/>
        </div>
        <div className='ShopContainer'>
          <ShopButtons/>
          <ShopUnits/>
        </div>
      </div>
    </div>
  );
}

export default App;
