import './App.css'
import NpcGenerator from './components/NpcGenerator'

function App() {

  return (
    <div>
      <h1 className='site-header'>Monster of the Week Bystander Generator</h1>
      <p className='intro-paragraph'>Creating monsters and mysteries is fun. Creating dozens of random Bystanders <br /> who may, or may not, be interacted with by the players is not. Use this Chat GPT <br /> powered app to generate up to 9 random NPCs at a time.</p>
      <div className="card">
        <NpcGenerator />
      </div>
    </div>
  )
}

export default App
