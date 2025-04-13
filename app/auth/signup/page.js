import Link from 'next/link';
import { handleSignUp } from './actions';
import styles from './page.module.css';

export default function SignUp() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign Up!</h1>
      <p className={styles.subheading}>Create your account</p>
      <form className={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className={styles.input}
        />
        <button formAction={handleSignUp} className={styles.button}>
          Sign Up
        </button>
      </form>

      <p className={styles.linkText}>
        <Link href="/auth/login">Already have an account? Log In!</Link>
      </p>
    </div>
  );
}
