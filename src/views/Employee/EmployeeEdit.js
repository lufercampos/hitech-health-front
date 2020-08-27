import React from "react";
import PropTypes from "prop-types";
import EditDialog from "../../components/EditDialog";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { insert, update } from "../../services/EmployeeService";
import { showAlert } from "../../store/actions/AppAction";
import { Field, reduxForm } from "redux-form";
import { renderTextField } from "../../components/Validation";

const MAX_LENGTH_NAME = 50;
const MAX_LENGTH_PROFESSION = 100;
const MAX_LENGTH_CITY = 50;
const MAX_LENGTH_BRANCH = 100;

const styles = {
  root: {
    flexGrow: 1,
  },
  menu: {
    width: 200,
  },
};

const validate = (values) => {
  const errors = {};

  if (values.id === null || values.id === undefined || values.id === "") {
    errors.id = "required";
  }

  if (!values.name) {
    errors.name = "required";
  } else if (values.name && values.name.length > MAX_LENGTH_NAME) {
    errors.name = `Maximum of ${MAX_LENGTH_NAME} characters`;
  }

  if (!values.profession) {
    errors.profession = "required";
  } else if (
    values.profession &&
    values.profession.length > MAX_LENGTH_PROFESSION
  ) {
    errors.profession = `Maximum of ${MAX_LENGTH_PROFESSION} characters`;
  }

  if (!values.city) {
    errors.city = "required";
  } else if (values.city && values.city.length > MAX_LENGTH_CITY) {
    errors.city = `Maximum of ${MAX_LENGTH_CITY} characters`;
  }

  if (!values.branch) {
    errors.branch = "required";
  } else if (values.branch && values.branch.length > MAX_LENGTH_BRANCH) {
    errors.branch = `Maximum of ${MAX_LENGTH_BRANCH} characters`;
  }

  return errors;
};

class EmployeeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: {
        id: null,
        name: "",
        profession: "",
        city: "",
        branch: "",
      },
    };
  }

  componentDidMount() {
    if (this.props.initialValues) {
      this.setState({ employee: this.props.initialValues });
    }
  }

  onChange = (event) => {
    this.setState((prevState) => ({
      employee: {
        ...prevState.employee,
        [event.target.name]: event.target.value,
      },
    }));
  };

  handleClickConfirm = () => {
    return new Promise((resolve, reject) => {
      if (!this.props.initialValues) {
        insert(this.state.employee)
          .then((result) => {
            this.props.showAlert({
              message: "Successfully inserted item!",
              options: {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "center" },
              },
            });
            this.props.save();
            resolve();
          })
          .catch((err) => {
            reject();
          });
      } else {
        update(this.state.employee)
          .then((result) => {
            this.props.showAlert({
              message: "Successfully updated item!",
              options: {
                variant: "success",
                anchorOrigin: { vertical: "top", horizontal: "center" },
              },
            });
            this.props.save();
            resolve();
          })
          .catch((err) => {
            reject();
          });
      }
    });
  };

  handleClickCancel = () => {
    this.props.closeModal();
  };

  render() {
    const { handleSubmit, classes, submitting } = this.props;

    return (
      <EditDialog
        submitting={submitting}
        titulo={!!this.props.initialValues ? "Edit" : "Insert"}
        handleClickConfirm={handleSubmit(this.handleClickConfirm)}
        handleClickCancel={this.handleClickCancel}
      >
        <Field
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: 0,
          }}
          variant="outlined"
          autoFocus
          margin="dense"
          onChange={this.onChange}
          fullWidth
          name="id"
          component={renderTextField}
          label="Code"
          disabled={!!this.props.initialValues}
        />

        <Field
          variant="outlined"
          margin="dense"
          onChange={this.onChange}
          fullWidth
          name="name"
          component={renderTextField}
          label="Name"
        />

        <Field
          variant="outlined"
          margin="dense"
          onChange={this.onChange}
          fullWidth
          name="profession"
          component={renderTextField}
          label="Profession"
        />

        <Field
          variant="outlined"
          margin="dense"
          onChange={this.onChange}
          fullWidth
          name="city"
          component={renderTextField}
          label="City"
        />

        <Field
          variant="outlined"
          margin="dense"
          onChange={this.onChange}
          fullWidth
          name="branch"
          component={renderTextField}
          label="Branch"
        />
      </EditDialog>
    );
  }
}

EmployeeEdit.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  appState: state.appState,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showAlert }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    reduxForm({
      form: "EmployeeEditForm",
      validate,
    })(EmployeeEdit)
  )
);
