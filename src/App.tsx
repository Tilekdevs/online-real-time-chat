import { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './components/AppRouter'
import NavBar from './components/navbar/NavBar'
import { Context } from './contexts/FirebaseProvider'
import Loader from './components/Loader'

function App() {
	const context = useContext(Context)

	if (!context) return null

	const { loading } = context

  if(loading) return <Loader/>

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
		</BrowserRouter>
	)
}

export default App
