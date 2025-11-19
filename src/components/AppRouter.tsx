import { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Context } from '../contexts/FirebaseProvider'
import { PrivateRoutes, PublicRoutes } from '../routes'
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts'
import type { User } from "firebase/auth"; 

export default function AppRouter() {
	const context = useContext(Context)

	if (!context) return null

	const { auth } = context

	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(currentUser => {
			setUser(currentUser) 
			setLoading(false)
		})
		return unsubscribe
	}, [auth])

	if (loading) return null

	return user ? (
		<Routes>
			{PrivateRoutes.map(({ path, component: Component }) => (
				<Route key={path} path={path} element={<Component />} />
			))}
			<Route path='*' element={<Navigate to={CHAT_ROUTE} />} />
		</Routes>
	) : (
		<Routes>
			{PublicRoutes.map(({ path, component: Component }) => (
				<Route key={path} path={path} element={<Component />} />
			))}
			<Route path='*' element={<Navigate to={LOGIN_ROUTE} />} />
		</Routes>
	)
}
