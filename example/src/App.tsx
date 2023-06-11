import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import Photo from './photo';
import { List } from './Page/List';
import { Home } from './Page/Home';

function Layout() {
  return <Outlet />;
}

function Layout2() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/photo" element={<Layout />}>
          <Route path="/photo/:member" element={<Photo />} />
        </Route>

        <Route path="/" element={<Layout2 />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>

        <Route path="/list" element={<Layout2 />}>
          <Route path="/list" element={<List />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
