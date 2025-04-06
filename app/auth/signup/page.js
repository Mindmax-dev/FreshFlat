import Link from 'next/link';
import { handleSignUp } from './actions';

export default function SignUp() {
  return (
    <div>
      <h1>Sign Up!</h1>
      <p>Create your account</p>
      <form>
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button formAction={handleSignUp}>Sign Up</button>
      </form>

      <br />
      <Link href="/auth/login">Already have an account? Log In!</Link>
    </div>
  );
}
