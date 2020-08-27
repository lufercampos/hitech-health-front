import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

const onlyNumbers = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/^0+/, "");
};

const onlyNumbersPage = (e, totalPages) => {
  let page = e.target.value.replace(/[^0-9]/g, "").replace(/^0+/, "");
  e.target.value = parseInt(page) > totalPages ? totalPages : page;
};

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  toolBar: {
    // backgroundColor: "#d8d8d830",
    minHeight: 0,
    background: "#f5f6f6",
  },

  rootIconButton: {
    padding: "0px",
    color: "#172B4D",
    minWidth: "15px",
    marginLeft: "5px",
    marginRight: "5px",
  },

  buttonGroup: {
    marginBottom: "3px",
    marginTop: "3px",
    marginRight: "3px",
  },

  rootinput: {
    height: "0.95em",
    color: "#172B4D",
    width: "26px",
    fontSize: "0.75rem",
    marginRight: "3px",
  },
  text: {
    color: "#172B4D",
    marginRight: "2px",
    fontSize: "0.75rem",
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
});

class DataTableUnidataPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pageSize: 0, page: 0 };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      pageSize: this.props.paginacao.pageSize,
      page: this.props.paginacao.page + 1,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.paginacao.pageSize !== this.props.paginacao.pageSize) {
      this.setState({
        pageSize: nextProps.paginacao.pageSize,
      });
    }
    if (nextProps.paginacao.page !== this.props.paginacao.page) {
      this.setState({
        page: nextProps.paginacao.page + 1,
      });
    }
  }

  handleFirstPageButtonClick = (event) => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = (event) => {
    this.props.onChangePage(
      event,
      (this.props.paginacao.page ? this.props.paginacao.page : 0) - 1
    );
    this.setState((prevState) => ({
      page: prevState.page - 1,
    }));
  };

  handleNextButtonClick = (event) => {
    this.props.onChangePage(
      event,
      (this.props.paginacao.page ? this.props.paginacao.page : 0) + 1
    );
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  handleLastPageButtonClick = (event) => {
    this.props.onChangePage(
      event,
      Math.max(
        0,
        Math.ceil(
          (this.props.paginacao.totalCount
            ? this.props.paginacao.totalCount
            : 0) / this.props.paginacao.pageSize
        ) - 1
      )
    );
  };

  handleManualChangePage = (event) => {
    if (event.key === "Enter") {
      this.props.onManualChangePage(event);
    }
  };

  handleChangeRowsPerPage = (event) => {
    if (event.key === "Enter") {
      this.props.onChangeRowsPerPage(event);
    }
  };

  onChange(event) {
    return this.setState({
      pageSize: event.target.value,
    });
  }

  onChangePage = (event) => {
    return this.setState({
      page: event.target.value,
    });
  };

  render() {
    const { classes, paginacao, theme } = this.props;
    return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar disableGutters className={classes.toolBar}>
          <div className={classes.grow} />

          <Typography className={classes.text} align="right">
            Rows per page
          </Typography>

          <TextField
            InputProps={{
              className: classes.rootinput,
            }}
            inputProps={{ maxLength: 4 }}
            onInput={(e) => onlyNumbers(e)}
            margin="dense"
            value={this.state.pageSize}
            onChange={this.onChange}
            onKeyDown={this.handleChangeRowsPerPage}
          />

          <Button
            variant="contained"
            className={classes.rootIconButton}
            onClick={this.handleBackButtonClick}
            disabled={(paginacao.page ? paginacao.page : 0) === 0}
            aria-label="Previous Page"
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>

          <TextField
            InputProps={{
              className: classes.rootinput,
            }}
            onInput={(e) => onlyNumbersPage(e, paginacao.totalPages)}
            margin="dense"
            value={this.state.page}
            onChange={this.onChangePage}
            onKeyDown={this.handleManualChangePage}
          />

          <Typography className={classes.text} variant="caption" align="right">
            {"/ " + paginacao.totalPages}
          </Typography>

          <Button
            variant="contained"
            className={classes.rootIconButton}
            onClick={this.handleNextButtonClick}
            disabled={
              (paginacao.page ? paginacao.page : 0) >=
              Math.ceil(
                (paginacao.totalCount ? paginacao.totalCount : 0) /
                  paginacao.pageSize
              ) -
                1
            }
            aria-label="Next Page"
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>

          <Typography className={classes.text} variant="caption" align="right">
            {"Total: " + paginacao.totalCount}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

DataTableUnidataPagination.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(
  DataTableUnidataPagination
);
