export default function LoginForm({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  loading,
  error,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-sm mx-auto bg-white p-4 rounded shadow mt-4"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
      <div className="mb-3">
        <label htmlFor="username" className="block mb-1 font-medium">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={onUsernameChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {error && <p className="text-red-600 mb-3 text-center">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
