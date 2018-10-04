import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Transactions from './components/Transactions';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TransactionDetails from './components/TransactionDetails';
import TransactionService from './services/TransactionServices'
import { Card } from 'primereact/card';


class App extends Component {

  constructor() {
    super();
    this.state ={
      txns :[]
    }
    this.transactionService = new TransactionService();
  }


  componentWillMount() {
    this.transactionService.getTransactionsFromServer(data=>{
      this.setState({txns:data})
    });
  }

  render() {


    const Home = () => (
      <div>
      <br></br>
      <Card>
        <h1>State Stree App</h1>
        <hr/>
      <ul>
        <li>
          <h4><Link to="/">Transactions</Link></h4>
        </li>
        <li>
          <h4><Link to="/home">Home</Link></h4>
        </li>
      </ul>
      </Card>
      </div>
    );

    const txnComponent = () => (
      <Transactions txns={this.state.txns} />
    );


    return (
      <div className='container'>
        <header className="App-header">
          <Router>
            <div>
              <Route exact path="/home" component={Home} />
              <Route exact path="/" component={txnComponent} />
              <Route path="/txnDetails/:accNum" component={TransactionDetails} />
            </div>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
