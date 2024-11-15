import './NonProfitHome.css'
import CreateEvent from '../CreateEvent/CreateEvent'
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

function NonProfitHome() {

  return (
    <Router>
        <Switch>
            <Route exact path='/'>
                <div>
                    <p>Home Page</p>
                    <Link to='/create-event'>
                        <button>Create event</button>
                    </Link>
                </div>
            </Route>
            <Route path='/create-event'>
                <CreateEvent></CreateEvent>
            </Route>
        </Switch>
    </Router>
  )
}

export default NonProfitHome