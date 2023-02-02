import React from 'react';
import {Route, Routes} from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import NewsList from '../../pages/NewsList';

const AppRouter = ({country, setSearchFormat, countryName}) => {
  return (
    <div>
      <Routes>
          <Route path="/" element={
              <NewsList
                  formatSearch={'everything'}
                  country={country}
                  countryName={countryName}
                  setSearchFormat={setSearchFormat}

              />
          }/>
          <Route path="/top-news" element={
              <NewsList
                  formatSearch={'top-headlines'}
                  country={country}
                  countryName={countryName}
                  setSearchFormat={setSearchFormat}
              />
          }/>
          <Route path="/top-news/:category" element={
              <NewsList
                  formatSearch={'top-headlines'}
                  country={country}
                  countryName={countryName}
                  setSearchFormat={setSearchFormat}
              />
          }/>
          <Route exact path="*" element={
              <NotFoundPage/>
          }/>
      </Routes>
    </div>
  );
};

export default AppRouter;
