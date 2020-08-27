import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showAlert } from "../../../store/actions/AppAction";
import BarraActions from "../../BarraActions";
import withWidth from "@material-ui/core/withWidth";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontWeight: 500,
    fontSize: "1.0rem",
    color: "#949494",
  },
  bottom: {
    padding: "0px",
  },
  content: {
    fontSize: "1.2rem",
    color: "#000000",
  },
});

class DeleteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClickConfirm = () => {
    this.props
      .onConfirm({ [this.props.field]: this.props.item[this.props.field] })
      .then((result) => {
        this.props.showAlert({
          message: `Item ${this.props.item[this.props.field]} was deleted`,
          options: {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "center" },
          },
        });
        this.props.save();
      })
      .catch((err) => {
        this.props.closeModal();
      });
  };

  handleClickCancel = () => {
    this.props.closeModal();
  };

  render() {
    const { message, classes, width } = this.props;
    return (
      <Dialog
        classes={{ paper: classes.paperDialog }}
        fullWidth={true}
        maxWidth={width === "xs" ? "xl" : width === "sm" ? "xl" : "xs"}
        open={true}
      >
        <DialogTitle
          disableTypography
          className={classes.title}
          id="form-dialog-title"
        >
          Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText disableTypography className={classes.content}>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.bottom}>
          <BarraActions
            handleClickConfirm={this.handleClickConfirm}
            handleClickCancel={this.handleClickCancel}
          />
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  appState: state.appState,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showAlert }, dispatch);
}

export default withWidth()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(DeleteDialog))
);
