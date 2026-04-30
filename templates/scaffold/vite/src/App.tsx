import { useState } from 'react'
import './App.css'

const PROJECT_NAME = '{{project-name}}'
const PROJECT_OBJECTIVE = '{{project-objective}}'

function App() {
  const [ready, setReady] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo-mark">⬡</div>
        <h1>{PROJECT_NAME}</h1>
        <p className="tagline">{PROJECT_OBJECTIVE}</p>
      </header>

      <main className="app-main">
        <div className="card">
          <button
            className={`ignition-btn ${ready ? 'active' : ''}`}
            onClick={() => setReady((r: boolean) => !r)}
          >
            {ready ? 'ENGINE ONLINE' : 'IGNITE'}
          </button>
          <p className="hint">
            Edit <code>src/App.tsx</code> to start building
          </p>
        </div>
      </main>

      <footer className="app-footer">
        <span>Built with Forge · Vite · React · TypeScript</span>
      </footer>
    </div>
  )
}

export default App
