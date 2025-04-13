import { handleLogin } from './actions';
import styles from './page.module.css';

export default async function LoginPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login</h1>
      <p className={styles.subheading}>Log in to your account</p>
      <form className={styles.form}>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={styles.input}
        />

        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className={styles.input}
        />

        <button formAction={handleLogin} className={styles.button}>
          Log in
        </button>
      </form>
      <p className={styles.linkText}>
        Don&apos;t have an account? <a href="/auth/signup">Sign up here</a>.
      </p>
    </div>
  );
}
