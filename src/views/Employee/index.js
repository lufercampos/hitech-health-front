import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { getAll, deleteEmployee } from "../../services/EmployeeService";
import EmployeeEdit from "./EmployeeEdit";
import { openModal, closeModal } from "../../store/actions/AppAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserByToken } from "../../services/UserService";

import { showAlert } from "../../store/actions/AppAction";
import { TIPO_PESQUISA } from "../../helpers/Constants";
import DataTable from "../../components/datatable/DataTable";

const columns = [
  {
    id: "id",
    label: "Code",
    tipoPesquisa: TIPO_PESQUISA.string,
    align: "left",
  },
  {
    id: "name",
    label: "Name",
    tipoPesquisa: TIPO_PESQUISA.string,
    align: "left",
  },
  {
    id: "profession",
    label: "Profession",
    tipoPesquisa: TIPO_PESQUISA.string,
    align: "left",
  },
  {
    id: "city",
    label: "City",
    tipoPesquisa: TIPO_PESQUISA.string,
    align: "left",
  },
  {
    id: "branch",
    label: "Branch",
    tipoPesquisa: TIPO_PESQUISA.string,
    align: "left",
  },
];

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentDidMount() {
    getUserByToken()
      .then((result) => {
        this.setState({ user: result.data });
      })
      .catch((error) => {});
  }

  request = (paginacao) => {
    return new Promise((resolve, reject) => {
      getAll(paginacao)
        .then((result) => {
          this.setState((prevState) => ({
            ...prevState,
            dados: result.data.items,
            paginacao: {
              ...paginacao,
              totalCount: result.data.totalCount,
              totalPages: result.data.totalPages,
              page: result.data.page - 1,
              pageSize: result.data.pageSize,
            },
          }));
          if (
            !result.data.items ||
            (result.data.items && Object.keys(result.data.items).length === 0)
          ) {
            this.props.showAlert({
              message: "No records found",
              options: {
                variant: "warning",
                anchorOrigin: { vertical: "top", horizontal: "center" },
              },
            });
          }
          resolve();
        })
        .catch((error) => {
          reject();
        });
    });
  };

  onInsert = () => {
    this.props.openModal(EmployeeEdit, {
      closeModal: this.props.closeModal,
      save: this.save,
    });
  };

  save = () => {
    this.request(this.state.paginacao);
    this.props.closeModal();
  };

  onEdit = (selectItem) => {
    if (selectItem) {
      this.props.openModal(EmployeeEdit, {
        initialValues: selectItem,
        closeModal: this.props.closeModal,
        save: this.save,
      });
    } else {
      this.props.showAlert({
        message: "Some item needs to be selected",
        options: {
          variant: "alert",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        },
      });
    }
  };

  onDelete = (selectItem) => {
    this.props.openModal("DeleteDialog", {
      message: `Do you want to delete item ${selectItem.id} ?`,
      onConfirm: deleteEmployee,
      closeModal: this.props.closeModal,
      save: this.save,
      field: "id",
      item: selectItem,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <DataTable
          titulo="Employees"
          request={this.request}
          isAdmin={this.state.user.idProfile === 1}
          paginacao={this.state.paginacao}
          dados={this.state.dados}
          columns={columns}
          onInsert={this.onInsert}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
          orderField={"id"}
          ordination={"asc"}
          icon="directions_car"
          mobileField={"id"}
        />
      </div>
    );
  }
}

Employee.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showAlert, openModal, closeModal }, dispatch);
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Employee));
