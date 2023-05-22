import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import './App.css'

// Replace your code here
const App = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const getApiData = async () => {
    setLoading(true)
    await fetch('https://apis.ccbp.in/tg/packages', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => {
        setList(res.packages)
        setLoading(false)
      })
  }

  useEffect(() => {
    getApiData()
  }, [])

  return (
    <div className="main-container">
      <div className="heading-container">
        <h1>Travel Guide</h1>
      </div>
      {loading ? (
        <div data-testid="loader">
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        </div>
      ) : (
        <ul>
          {list.map(eachCountry => (
            <li key={eachCountry.id}>
              <div>
                <div>
                  <img src={eachCountry.image_url} alt={eachCountry.name} />
                </div>
                <div>
                  <h1>{eachCountry.name}</h1>
                  <p>{eachCountry.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
