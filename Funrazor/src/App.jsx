import './App.css'
import NonProfitHome from './NonProfitHome/NonProfitHome'
import LoginButton from './Login/LoginButton/LoginButton'
import LogoutButton from './LogoutButton/LogoutButton'

function App() {

  return (
    <main >
      <LoginButton></LoginButton>
      <LogoutButton></LogoutButton>
      <NonProfitHome></NonProfitHome>
    </main>
  )
}

export default App
