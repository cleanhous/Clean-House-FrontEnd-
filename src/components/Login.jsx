
const Login = () => {
  return (
    <div>
        <h1>Faça seu Login</h1>
        <form>
            <label>
                <span>Digite seu email</span>
                <input type="email" />
            </label>
            <label>
                <span>Digite seu email</span>
                <input type="password" />
            </label>
            <label>
                <span>Lembre de miml</span>
                <input type="checkbox" />
            </label>
        </form>
        <p>Esqueceu a senha?</p>
        <button>Login</button>
    </div>
  )
}

export default Login