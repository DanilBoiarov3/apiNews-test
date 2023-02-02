import {BrowserRouter} from 'react-router-dom';
import AppRouter from './Components/Router/AppRouter';
import NavBar from './Components/Header/NavBar';
import {useState} from 'react';

function App() {

    const [country, setCountry]=useState('')
    const [activeCategory, setActiveCategory] = useState('');
    const [isTopNewsActive, setIsTopNewsActive] = useState(false);

    return (
      <BrowserRouter>
          <NavBar
              setCountry={setCountry}
              activeCategory={activeCategory}
              isTopNewsActive={isTopNewsActive}
              setActiveCategory={setActiveCategory}
              setIsTopNewsActive={setIsTopNewsActive}
          />
        <AppRouter
            country={country}
            isTopNewsActive={isTopNewsActive}
        />
      </BrowserRouter>
  );
}

export default App;
