import { useEffect } from 'react';

type LoginPageProps = {
  onLoginSuccess?: () => void;
};

function LoginPage({ onLoginSuccess }: LoginPageProps) {
  useEffect(() => {
    fetch('http://localhost:8081/api/user', {
      credentials: 'include',
    })
      .then(async res => {
        const data = await res.json().catch(() => ({}));
        console.log(data);

        if (onLoginSuccess && res.ok) {
          onLoginSuccess();
        }
      })
      .catch(err => console.error(err));
  }, [onLoginSuccess]);

  const handleLogin = () => {
    if (onLoginSuccess) {
      onLoginSuccess();
    }

    window.location.href = 'http://localhost:8081/fundvita/api/user';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">Welcome</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to continue to your dashboard.</p>
        <button
          onClick={handleLogin}
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
