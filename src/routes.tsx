import Chat from './components/chat/Chat'
import Login from './components/login/Login'
import { CHAT_ROUTE, LOGIN_ROUTE } from './utils/consts'

export const PublicRoutes = [
	{
		path: LOGIN_ROUTE,
		component: Login,
	},
]
export const PrivateRoutes = [
	{
		path: CHAT_ROUTE,
		component: Chat,
	}
]
