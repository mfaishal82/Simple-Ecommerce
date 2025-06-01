export async function login(username, password) {
  const res = await fetch('https://fakestoreapi.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) {
    const errData = await res.json()
    throw new Error(errData.message || 'Login failed')
  }
  const data = await res.json()
  return data.token
}
