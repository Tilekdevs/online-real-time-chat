import Chat from './components/Chat'
import Login from './components/Login'
import { CHAT_ROUTE, LOGIN_ROUTE } from './utils/consts'

export const PublicRoutes = [
	{
		path: LOGIN_ROUTE,
		component: Login
	}
];
export const PrivateRoutes = [
	{
		path: CHAT_ROUTE,
		component: Chat
	}
];