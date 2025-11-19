import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Context } from '../../contexts/FirebaseProvider';
import { LOGIN_ROUTE } from '../../utils/consts';
import styles from './NavBar.module.scss';
import type { User } from 'firebase/auth';

export default function NavBar() {
  const context = useContext(Context);
  const [user, setUser] = useState<User | null>(null);
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  if (!context) return null;
  const { auth } = context;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return unsubscribe;
  }, [auth]);

  return (
    <nav className={styles.navbar}>
      <h2 className={styles.title}>Real-Time Chat</h2>
      <div className={styles.containerFunc}>
        <button onClick={toggleTheme} className={styles.themeBtn}>
          {darkTheme ? 'Светлая тема' : 'Тёмная тема'}
        </button>

        {user ? (
          <div className={styles.userBlock}>
            <button className={styles.logoutBtn} onClick={() => auth.signOut()}>
              Выйти
            </button>
          </div>
        ) : (
          <button
            className={styles.loginBtn}
            onClick={() => navigate(LOGIN_ROUTE)}
          >
            Войти
          </button>
        )}
      </div>
    </nav>
  );
}
