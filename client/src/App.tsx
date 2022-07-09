import React, { Suspense } from 'react';

import './App.scss';

const HomePage = React.lazy(() => import('./pages/Home'))

function App() {
  return <>
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </Suspense>
  </>


}


export default App;