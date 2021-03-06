import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import loadItem from './api';
import './index.css';

class ShowItem extends React.Component {
  state = {
    item: null,
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const id = this.props.match.params.id;
    const prevId = prevProps.match.params.id;
    if (id !== prevId) {
      this.loadData();
    }
  }

  componentWillUnmount() {
    if (this.cancelRequest) {
      this.cancelRequest();
    }
  }

  loadData() {
    if (this.cancelRequest) {
      this.cancelRequest();
    }

    this.setState({ error: null, loading: true });
    const promise = loadItem(this.props.match.params.id);
    promise
      .then((item) => {
        this.setState({ item });
      })
      .catch((err) => {
        this.setState({ error: err, item: null });
      })
      .finally(() => this.setState({ loading: false }));
    this.cancelRequest = promise.cancel;
  }

  render() {
    const { item, error, loading } = this.state;
    const id = this.props.match.params.id;
    const loadingText = loading ? 'Loading...' : null;

    return (
      <div>
        <h1>{item?.name || id}</h1>
        <div>{error || loadingText || `$${item?.price}`}</div>
        <h2>Other Items to Look At</h2>
        <ItemList />
        <Link to="/">Go home</Link>
      </div>
    );
  }
}

function ItemList() {
  return (
    <ul>
      <li>
        <Link to="/items/couch">Couch</Link>
      </li>
      <li>
        <Link to="/items/table">Table</Link>
      </li>
      <li>
        <Link to="/items/coffee-maker">Coffee Maker</Link>
      </li>
    </ul>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome Home</h1>
      <p>Want to look at some items?</p>
      <ItemList />
    </div>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/items/:id" component={ShowItem} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
