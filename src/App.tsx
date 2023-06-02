import './App.css'
import NpcGenerator from './components/NpcGenerator'

function App() {

  return (
    <div>
      <h1 className='site-header'>Monster of the Week Bystander Generator</h1>
      <p className='intro-paragraph'>Creating monsters and mysteries is fun. Creating dozens of random Bystanders <br /> whom the players may not even interact with, isn't. Use this Chat GPT <br /> powered app to generate up to 9 random NPCs at a time.</p>
      <div className="card">
        <NpcGenerator />
      </div>
      <footer>
        <p className='footer-p'>by Westley Thompson for the C20G Hackathon May 2023 </p>
        <p className='footer-p'>Chat GPT, Monster of the Week, and all other licensed/trademarked content belong to their respective owners. The creator of this site claims no ownership over them.</p>
        <p className='footer-p'>The characters generated here are done so by a machine learning algorithm. Any semblance to a person, living or dead, is purely coincidental.</p>
      </footer>
    </div>
  )
}

export default App
