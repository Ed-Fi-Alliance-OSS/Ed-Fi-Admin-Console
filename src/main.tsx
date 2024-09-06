import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

/*
 <React.StrictMode>
  </React.StrictMode>

*/

fetch(`${import.meta.env.BASE_URL || './'}config.json`).then(resp => resp.json()).then(config => {
  // console.log(`basePath is ${config.app.basePath}`)

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter basename={config.app.basePath}>
      <App appConfig={config} />
    </BrowserRouter>)
}).catch(err => console.log("The config file fetching failed: ", err))