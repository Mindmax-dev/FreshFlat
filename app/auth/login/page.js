'use server';

import { handleLogin } from './actions';

export default async function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <p>Log in to your account</p>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={handleLogin}>Log in</button>
      </form>
      <p>
        Don&apos;t have an account? <a href="/auth/signup">Sign up here</a>.
      </p>
    </div>
  );
}
