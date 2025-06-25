import { useState } from 'react'
import { supabase } from './supabaseClient'

const AuthPage = ({ onLoginSuccess }) => {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!userId.trim() || !password.trim()) {
      setError('Будь ласка, заповніть всі поля')
      return
    }

    setError('')

    const { data, error: supabaseError } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', userId.trim())
      .eq('user_password', password.trim())

    if (supabaseError) {
      setError('Помилка з’єднання з базою')
      return
    }

    if (!data || data.length === 0) {
      setError('Невірний ID користувача або пароль')
      return
    }

    console.log('Успішний вхід:', data[0])
    onLoginSuccess(data[0]) // передаём данные в главный экран
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Авторизація</h2>

        <input
          type="text"
          placeholder="ID користувача"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="auth-input"
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />

        <button onClick={handleLogin} className="auth-button">
          Увійти
        </button>

        {error && <div className="auth-error">{error}</div>}
      </div>
    </div>
  )
}

export default AuthPage
