import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Register from './pages/Register';
import Home from './pages/Home'
import Login from './pages/Login'
import MenuBar from './components/MenuBar'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import { AuthProvider } from './context/auth'
import AuthRoute from './util/AuthRoute' 
import SinglePost from './pages/SinglePost'

function App() {
  return (
  <AuthProvider>
    <Router>
    <Container>
    <MenuBar/>
    <Route exact path='/' component={Home}/>
    <AuthRoute exact path='/Register' component={Register}/>
    <AuthRoute exact path='/Login' component={Login}/>
   <Route exact path='/posts/:postId' component={SinglePost}/>
    </Container>
  </Router>    
  </AuthProvider>
);
}

export default App;
