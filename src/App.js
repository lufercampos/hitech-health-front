import React from "react";
import Content from "./components/layout/Content";
import AppBar from "./components/layout/AppBar";
import Container from "@material-ui/core/Container";
import history from "./helpers/History";
class App extends React.Component {
  componentDidMount() {
    history.push("/employee");
  }

  render() {
    return (
      <React.Fragment>
        <AppBar />
        <Container maxWidth="lg">
          <Content />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
