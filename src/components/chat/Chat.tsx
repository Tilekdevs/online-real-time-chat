import {
	addDoc,
	collection,
	limit,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	Timestamp,
} from 'firebase/firestore'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../contexts/FirebaseProvider'
import Loader from '../Loader'
import styles from './Chat.module.scss'

interface Message {
	id: string
	text: string
	uid: string
	displayName: string
	photoURL?: string
	createdAt: Timestamp
}

export default function Chat() {
	const context = useContext(Context)
	const [messages, setMessages] = useState<Message[]>([])
	const [newMessage, setNewMessage] = useState('')
	const messagesEndRef = useRef<HTMLDivElement>(null)

	if (!context) return null
	const { auth, db } = context 
	const messagesRef = collection(db, 'messages')

	useEffect(() => {
		const q = query(messagesRef, orderBy('createdAt', 'asc'), limit(100))
		const unsubscribe = onSnapshot(q, snapshot => {
			const msgs: Message[] = snapshot.docs
				.map(doc => {
					const data = doc.data() as Omit<Message, 'id'>
					if (!data.createdAt) return null
					return { id: doc.id, ...data }
				})
				.filter(Boolean) as Message[]
			setMessages(msgs)
			messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
		})

		return unsubscribe
	}, [])

	const sendMessage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!newMessage.trim()) return

		try {
			await addDoc(messagesRef, {
				text: newMessage,
				uid: auth.currentUser?.uid,
				displayName: auth.currentUser?.displayName || 'Аноним',
				photoURL: auth.currentUser?.photoURL || '',
				createdAt: serverTimestamp(),
			})
			setNewMessage('')
		} catch (err) {
			console.error('Ошибка при отправке сообщения:', err)
			alert('Не удалось отправить сообщение. Проверьте консоль.')
		}
	}

	return (
		<div className={styles.chatWrapper}>
			<div className={styles.messages}>
				{messages.length === 0 ? (
					<Loader />
				) : (
					messages.map(msg => (
						<div
							key={msg.id}
							className={
								msg.uid === auth.currentUser?.uid
									? styles.myMessage
									: styles.otherMessage
							}
						>
							<span className={styles.name}>{msg.displayName}:</span>
							<span className={styles.text}>{msg.text}</span>
						</div>
					))
				)}
				<div ref={messagesEndRef}></div>
			</div>

			<form className={styles.inputForm} onSubmit={sendMessage}>
				<input
					type='text'
					placeholder='Введите сообщение...'
					value={newMessage}
					onChange={e => setNewMessage(e.target.value)}
				/>
				<button type='submit'>Отправить</button>
			</form>
		</div>
	)
}
