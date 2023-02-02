import {BrowserRouter} from 'react-router-dom';
import AppRouter from './Components/Router/AppRouter';
import NavBar from './Components/Header/NavBar';
import {useState} from 'react';

function App() {

    const [country, setCountry]=useState('')
    const [countryName, setCountryName]=useState('')
    const [searchFormat, setSearchFormat] = useState('everything');

    return (
      <BrowserRouter>
          <NavBar
              setCountryName={setCountryName}
              searchFormat={searchFormat}
              setCountry={setCountry}
          />
        <AppRouter
            country={country}
            countryName={countryName}
            setSearchFormat={setSearchFormat}
            searchFormat={searchFormat}
        />
      </BrowserRouter>
  );
}

export default App;
