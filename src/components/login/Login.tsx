import { useContext } from 'react';
import styles from "./Login.module.scss";
import { Context } from '../../contexts/FirebaseProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Login() {
  const context = useContext(Context);

  if (!context) return null;

  const { auth } = context; 

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Ошибка при входе через Google:", err);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    console.log("login:", email, password);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Вход в чат</h2>
				
        <button
          type="button"
          className={styles.googleBtn}
          onClick={login}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
            alt="google"
          />
          Войти через Google
        </button>
      </form>
    </div>
  );
}
