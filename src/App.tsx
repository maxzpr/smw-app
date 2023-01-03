import '@/styles/app.scss'
import { RealtimeProvider } from './contexts/RealtimeContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './routes'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RealtimeProvider url=':3001'>
          <Routes>
            {routes.map(r => <Route path={r.path} element={<r.element />} key={r.key} />)}
          </Routes>
        </RealtimeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
