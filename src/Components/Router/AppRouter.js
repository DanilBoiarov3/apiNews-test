import React from 'react';
import {Route, Routes} from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import NewsList from '../../pages/NewsList';

const AppRouter = ({country, isTopNewsActive}) => {
  return (
    <div>
      <Routes>
          <Route path="/" element={
              <NewsList
                  country={country}
                  isTopNewsActive={isTopNewsActive}
              />
          }/>
          <Route path="/top-news" element={
              <NewsList
                  country={country}
                  isTopNewsActive={isTopNewsActive}
              />
          }/>
          <Route path="/top-news/:category" element={
              <NewsList
                  country={country}
                  isTopNewsActive={isTopNewsActive}
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
