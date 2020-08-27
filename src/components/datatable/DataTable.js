import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Table from "@material-ui/core/Table";
import AppBar from "@material-ui/core/AppBar";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import { TAREFAS, TIPO_PESQUISA } from "../../helpers/Constants";
import { formatDateForDB } from "../../helpers/Util";
import { Paper } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import MenuItemMobileDataGrid from "./MenuItemMobileDataGrid";
import MenuFilterMobileDataGrid from "./MenuFilterMobileDataGrid";
import DataTablePagination from "./DataTablePagination";
import DataTablePaginationMobile from "./DataTablePaginationMobile";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import Clear from "@material-ui/icons/Clear";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { parse } from "date-fns";
import {
  removeColunaFiltroMobile,
  setColunasMobile,
  limparFiltrosMobile,
} from "../../store/actions/AppAction";
import ptLocale from "date-fns/locale/pt-BR";
import enLocale from "date-fns/locale/en-US";
import esLocale from "date-fns/locale/es";
import DateFnsUtils from "@date-io/date-fns";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = (theme) => ({
  root: { width: "100%", backgroundColor: "#fbfbfb" },
  rootPaper: {
    height: "calc(100vh - 210px)",
    width: "100%",
    overflowX: "auto",
  },
  table: {},
  hover: {
    "&:hover ": {
      boxShadow: "0px 2px 3px 0px #ececec  !important",
      backgroundColor: "#164e9e3d !important",
      borderTop: "1px solid #ffffff !important",
      cursor: "pointer !important",
    },
  },
  selected: {
    boxShadow: "0px 2px 3px 0px #ececec !important",
    backgroundColor: "#164e9e3d !important",
    borderTop: "1px solid #ffffff !important",
  },
  iconSearch: {
    color: "#e4e4e4",
  },
  tableCell: {
    borderRight: "1px inset #c1c1c1",
    color: "#172B4D",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 1.42857142857143,
    borderBottom: "none",
  },
  tableCellHeader: {
    borderRight: "1px inset #c1c1c1",
    borderBottom: "none",
    color: "rgb(94, 108, 132)",
    fontSize: "12px",
    fontWeight: 600,
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  rootRow: {
    height: "32px",
    "&:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    padding: 0,
    flexGrow: 1,
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  rootGrid: {
    flexGrow: 1,
  },
  titleCardHeader: {
    fontSize: "1.25rem",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.0075em",
  },
  linearColorPrimary: {
    backgroundColor: "#b2dfdb",
  },
  linearBarColorPrimary: {
    backgroundColor: "#00695c",
  },
  inputTextPesquisa: {
    color: "rgb(66, 82, 110)",
    fontSize: "0.9rem",
  },
  textFieldDataPickerData: {
    minWidth: "50px",
  },
  textFieldDataPickerDataHora: {
    minWidth: "157px",
  },
  inputAdornmentDatePicker: {
    marginLeft: "0px",
  },
  keyboardButtonDatePicker: {
    padding: "0px",
  },
  tableWrapper: {
    maxHeight: "100%",
    overflow: "auto",
  },
});

const BarCrudStyles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  display: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  insert: { color: "#7fbf5f" },
  edit: {},
  delete: { color: "#ec3232" },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

let BarCrud = (props) => {
  const { classes, isAdmin, isRowSelected, isMobile, isPossuiDados } = props;

  return (
    <div className={classes.display}>
      <Tooltip title="Insert">
        <IconButton
          className={classes.insert}
          onClick={props.onInsert}
          aria-label="add"
        >
          <AddIcon />
        </IconButton>
      </Tooltip>

      {isMobile && <MenuFilterMobileDataGrid />}

      {!isMobile && isRowSelected && (
        <React.Fragment>
          <Tooltip title="Edit">
            <IconButton onClick={props.onEdit} aria-label="edit">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              className={classes.delete}
              onClick={props.onDelete}
              disabled={!isAdmin}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      )}

      {/*
    
    <Button
      disabled={!isPossuiDados}
      size="small"
      variant="contained"
      onClick={props.onExport}
    >
      <Icon fontSize="small" className={classes.leftIcon}>
        {"save_alt"}
      </Icon>
      {t("c.global.exportar")}
    </Button>
 
    <Button
      size="small"
      className={classes.incluir}
      variant="contained"
      onClick={props.onInsert}
      disabled={
        tasks.findIndex(task => task.toLowerCase() === TAREFAS.incluir) < 0
      }
    >
      <Icon fontSize="small" className={classes.leftIcon}>
        {"add"}
      </Icon>
      {t("c.global.incluir")}
    </Button>
 
    {isMobile && <MenuFilterMobileDataGrid />}
 
    {!isMobile && (
      <React.Fragment>
        <Button
          color="primary"
          size="small"
          variant="contained"
          onClick={props.onEdit}
          disabled={
            tasks.findIndex(
              task => task.toLowerCase() === TAREFAS.alterar && isRowSelected
            ) < 0
          }
        >
          <Icon fontSize="small" className={classes.leftIcon}>
            {"edit"}
          </Icon>
          {t("c.global.alterar")}
        </Button>
 
        <Button
          size="small"
          className={classes.excluir}
          variant="contained"
          onClick={props.onDelete}
          disabled={
            tasks.findIndex(
              task => task.toLowerCase() === TAREFAS.excluir && isRowSelected
            ) < 0
          }
        >
          <Icon fontSize="small" className={classes.leftIcon}>
            {"delete"}
          </Icon>
          {t("c.global.excluir")}
        </Button>
      </React.Fragment>
    )}
    */}

      {/*
     <DataTableActions isRowSelected={isRowSelected} />

  
  */}
    </div>
  );
};

BarCrud.propTypes = {
  classes: PropTypes.object.isRequired,
};

BarCrud = withStyles(BarCrudStyles)(BarCrud);

const toolbarStyles = (theme) => ({
  root: {
    //  backgroundColor: "#c7ceda",
    borderRadius: "4px",
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "block",
    color: "#3f51b5",
  },
  iconHome: {
    marginTop: "2px",
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  link: {
    display: "flex",
  },
  titulo: {
    marginLeft: theme.spacing.unit,
    fontSize: "1.5em",
    fontStyle: "inherit",
    color: "#172B4D",
    fontWeight: 500,
  },
  colorPrimary: {
    backgroundColor: "#a0a0a030",
  },
});

let TabelaToolbar = (props) => {
  const { titulo, classes } = props;

  return (
    <AppBar
      classes={{ colorPrimary: classes.colorPrimary }}
      elevation={0}
      position="static"
    >
      <Toolbar className={classes.root} variant="dense" disableGutters>
        <Typography className={classes.titulo}>{titulo}</Typography>
        <div className={classes.grow} />
        <BarCrud
          isPossuiDados={props.isPossuiDados}
          onExport={props.onExport}
          onInsert={props.onInsert}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
          isAdmin={props.isAdmin}
          isRowSelected={props.isRowSelected}
        />
      </Toolbar>
    </AppBar>
  );
};

TabelaToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

TabelaToolbar = withStyles(toolbarStyles)(TabelaToolbar);

let TabelaToolbarMobile = (props) => {
  const { titulo, classes } = props;

  return (
    <Toolbar>
      <Typography
        className={classes.title}
        variant="button"
        color="inherit"
        noWrap
      >
        {titulo}
      </Typography>
      <div className={classes.grow} />
      <BarCrud
        isMobile={true}
        onInsert={props.onInsert}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
        isAdmin={props.isAdmin}
        isRowSelected={props.isRowSelected}
      />
    </Toolbar>
  );
};

TabelaToolbarMobile.propTypes = {
  classes: PropTypes.object.isRequired,
};

TabelaToolbarMobile = withStyles(toolbarStyles)(TabelaToolbarMobile);

class DataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      block: false,
      orderField: props.orderField,
      ordination: props.ordination,
      filtersValue: {},
      filters: [],
      selected: null,
      filtroSelect: [],
      filtroDataPicker: [],
      height: window.innerHeight,
      loading: null,
      isPossuiRegistro: null,
      filtrosMobile: [],
      localeData: null,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  getFormatDate = (tipoPesquisa) => {
    let localeUser = "pt-BR";

    if (
      tipoPesquisa === TIPO_PESQUISA.dataHora ||
      tipoPesquisa === TIPO_PESQUISA.dataHoraFinal ||
      tipoPesquisa === TIPO_PESQUISA.dataHoraInicial
    ) {
      if (localeUser === "pt-BR") {
        return "dd/MM/yyyy HH:mm:ss";
      } else if (localeUser === "en-US") {
        return "MM/dd/yyyy HH:mm:ss";
      } else if (localeUser === "es-ES") {
        return "dd/M/yyyy HH:mm:ss";
      } else {
        return "dd/MM/yyyy HH:mm:ss";
      }
    } else if (
      tipoPesquisa === TIPO_PESQUISA.data ||
      tipoPesquisa === TIPO_PESQUISA.dataFinal ||
      tipoPesquisa === TIPO_PESQUISA.dataInicial
    ) {
      if (localeUser === "pt-BR") {
        return "dd/MM/yyyy";
      } else if (localeUser === "en-US") {
        return "MM/dd/yyyy";
      } else if (localeUser === "es-ES") {
        return "dd/MM/yyyy";
      } else {
        return "dd/MM/yyyy";
      }
    } else {
      return null;
    }
  };

  componentDidMount() {
    let localeUser = "pt-BR";

    let localeData =
      localeUser === "pt-BR"
        ? ptLocale
        : localeUser === "en-US"
        ? enLocale
        : localeUser === "es-ES"
        ? esLocale
        : ptLocale;

    this.setState({ localeData: localeData });

    this.props.setColunasMobile(this.props.columns);
    let paginacao = {
      ...this.props.paginacao,
      orderField: this.props.orderField,
      ordination: this.props.ordination,
      page: 1,
      pageSize: parseInt((this.state.height - 230) / 32),
    };
    window.addEventListener("resize", this.updateDimensions);

    this.setFiltrosDefault()
      .then(() => {
        this.pesquisar(paginacao);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  formatValueToRequest = (value, tipoPesquisa) => {
    if (tipoPesquisa === TIPO_PESQUISA.dataHora) {
      return formatDateForDB(
        value,
        false,
        false,
        true,
        false,
        this.getFormatDate(tipoPesquisa)
      );
    }

    if (tipoPesquisa === TIPO_PESQUISA.dataHoraInicial) {
      return formatDateForDB(
        value,
        false,
        false,
        true,
        false,
        this.getFormatDate(tipoPesquisa)
      );
    }

    if (tipoPesquisa === TIPO_PESQUISA.dataHoraFinal) {
      return formatDateForDB(
        value,
        false,
        false,
        true,
        false,
        this.getFormatDate(tipoPesquisa)
      );
    }

    if (tipoPesquisa === TIPO_PESQUISA.data) {
      return formatDateForDB(
        value,
        false,
        false,
        false,
        false,
        this.getFormatDate(tipoPesquisa)
      );
    }

    if (tipoPesquisa === TIPO_PESQUISA.dataInicial) {
      return formatDateForDB(
        value,
        false,
        false,
        false,
        false,
        this.getFormatDate(tipoPesquisa)
      );
    }

    if (tipoPesquisa === TIPO_PESQUISA.dataFinal) {
      return formatDateForDB(
        value,
        false,
        false,
        false,
        false,
        this.getFormatDate(tipoPesquisa)
      );
    }
    return value;
  };

  getTypeWhereFieldPagination = (tipoPesquisa) => {
    return tipoPesquisa === TIPO_PESQUISA.string
      ? "LIKE"
      : tipoPesquisa === TIPO_PESQUISA.numeric
      ? "EQUALS"
      : tipoPesquisa === TIPO_PESQUISA.data
      ? "EQUALS"
      : tipoPesquisa === TIPO_PESQUISA.dataInicial
      ? "GREATER_EQUAL"
      : tipoPesquisa === TIPO_PESQUISA.dataFinal
      ? "SMALLER_EQUAL"
      : tipoPesquisa === TIPO_PESQUISA.dataHoraInicial
      ? "GREATER_EQUAL"
      : tipoPesquisa === TIPO_PESQUISA.dataHoraFinal
      ? "SMALLER_EQUAL"
      : tipoPesquisa === TIPO_PESQUISA.dataHora
      ? "EQUALS"
      : tipoPesquisa === TIPO_PESQUISA.select
      ? "EQUALS"
      : "EQUALS";
  };

  setFiltrosDefault = () => {
    let filtros = [];
    return new Promise((resolve, reject) => {
      try {
        for (let index = 0; index < this.props.columns.length; index++) {
          const column = this.props.columns[index];

          if (column.defaultValue) {
            let value = column.defaultValue;
            let type = this.getTypeWhereFieldPagination(column.tipoPesquisa);

            let obj = {
              where: column.id,
              value: this.formatValueToRequest(value, column.tipoPesquisa),
              type: type,
            };
            if (
              column.tipoPesquisa === TIPO_PESQUISA.data ||
              column.tipoPesquisa === TIPO_PESQUISA.dataInicial ||
              column.tipoPesquisa === TIPO_PESQUISA.dataFinal ||
              column.tipoPesquisa === TIPO_PESQUISA.dataHoraInicial ||
              column.tipoPesquisa === TIPO_PESQUISA.dataHoraFinal ||
              column.tipoPesquisa === TIPO_PESQUISA.dataHora
            ) {
              let filters = this.state.filtroDataPicker;
              filters[index] = column.defaultValue;
              this.setState({ filtroDataPicker: filters });
            }
            filtros.push(obj);
          }
        }
        this.setState(
          {
            filters: filtros,
          },
          () => {
            resolve();
          }
        );
      } catch (error) {
        reject(new Error(error.message));
      }
    });
  };

  componentDidUpdate(prevProps, prevState) {
    // limpa dados de selecao de item
    if (this.props.dados !== prevProps.dados) {
      this.limparSelecaoItem();
    }
    if (prevState.height !== this.state.height) {
      let paginacao = {
        ...this.props.paginacao,
        page: 1,
        pageSize: parseInt((this.state.height - 230) / 32),
      };
      this.pesquisar(paginacao);
    }
  }

  /*shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.paginacao !== this.props.paginacao ||
      nextProps.dados !== this.props.dados ||
      nextState.loading !== this.state.loading
    );
  }*/

  componentWillReceiveProps(nextProps) {
    if (
      !nextProps.dados ||
      nextProps.paginacao !== this.props.paginacao ||
      nextProps.dados !== this.props.dados
    ) {
      this.setState({
        loading: false,
      });
    }

    this.setState({
      isPossuiRegistro:
        nextProps.dados && Object.keys(nextProps.dados).length > 0,
    });
  }

  componentWillUnmount() {
    this.props.limparFiltrosMobile();
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      height: window.innerHeight,
    });
  }

  handleRequestSort = (event, orderField) => {
    let order = this.state.ordination;
    if (this.state.orderField === orderField) {
      order = order === "desc" ? "asc" : "desc";
    } else {
      order = "asc";
    }

    this.setState(
      (prevState) => ({
        ...prevState,
        orderField: orderField,
        ordination: order,
      }),
      () => {
        let paginacao = {
          ...this.props.paginacao,
          orderField: orderField,
          ordination: order,
        };

        this.pesquisar(paginacao);
      }
    );
  };

  handleManualChangePage = (event) => {
    let paginacao = {
      ...this.props.paginacao,
      page: event.target.value,
    };
    this.pesquisar(paginacao);
    window.scrollTo(0, 0);
  };

  handleChangePage = (event, page) => {
    let paginacao = {
      ...this.props.paginacao,
      page: page + 1,
      pageSize: this.props.paginacao.pageSize,
    };
    this.pesquisar(paginacao);
    window.scrollTo(0, 0);
  };

  handleChangeRowsPerPage = (event) => {
    let paginacao = {
      ...this.props.paginacao,
      page: 1,
      pageSize: event.target.value,
    };
    this.pesquisar(paginacao);
  };

  pesquisar = (paginacao) => {
    this.setState(
      (prevState) => ({ ...prevState, loading: true }),
      () => {
        let whereField = [];
        let valueWhereField = [];
        let typeWhereField = [];

        this.state.filters.map((filtro) => {
          try {
            if (filtro.value) {
              let isEquals = "=" === filtro.value.toString().substring(0, 1);
              whereField.push(filtro.where);
              valueWhereField.push(
                isEquals
                  ? filtro.value.substring(1, filtro.value.length)
                  : filtro.value
              );
              typeWhereField.push(isEquals ? "EQUALS" : filtro.type);
            }
          } catch (error) {
            console.log(
              filtro && filtro.value
                ? "Erro pesquisar valor: " +
                    filtro.value +
                    " Erro: " +
                    error.message
                : error.message
            );
          }
        });
        paginacao.whereField = whereField;
        paginacao.valueWhereField = valueWhereField;
        paginacao.typeWhereField = typeWhereField;

        this.setState(
          (prevState) => ({ ...prevState, selected: null }),
          () => {
            this.props
              .request(paginacao)
              .then(() => {})
              .catch(() => {
                this.setState({
                  loading: false,
                  block: false,
                });
              });
          }
        );
      }
    );
  };

  setFiltro(obj) {
    return new Promise((resolve, reject) => {
      try {
        let index = this.state.filters.findIndex(
          (filtro) => filtro.where === obj.where
        );

        if (index < 0) {
          this.setState(
            (prevState) => ({
              filters: [
                ...prevState.filters,
                {
                  ...obj,
                },
              ],
            }),
            () => {
              resolve();
            }
          );
        } else {
          let filters = this.state.filters;
          filters[index] = obj;
          this.setState(
            () => ({
              filters: filters,
            }),
            () => {
              resolve();
            }
          );
        }
      } catch (error) {
        reject(new Error(error.message));
      }
    });
  }

  setValueDataPicker = (tipoPesquisa, data, idx) => {
    if (
      tipoPesquisa === TIPO_PESQUISA.data ||
      tipoPesquisa === TIPO_PESQUISA.dataFinal ||
      tipoPesquisa === TIPO_PESQUISA.dataInicial ||
      tipoPesquisa === TIPO_PESQUISA.dataHora ||
      tipoPesquisa === TIPO_PESQUISA.dataHoraFinal ||
      tipoPesquisa === TIPO_PESQUISA.dataHoraInicial
    ) {
      if (typeof data === "string" || data instanceof String) {
        data = parse(data, this.getFormatDate(tipoPesquisa), new Date());
      }

      let filters = this.state.filtroDataPicker;
      filters[idx] = data;
      this.setState(() => ({
        filtroDataPicker: filters,
      }));
    }
  };

  onEnterFilter = (tipoPesquisa, idx = null) => (event) => {
    if (event.key === "Enter" && !this.state.loading) {
      this.filtrar(tipoPesquisa, event, idx);
    }
  };

  onBlurFilter = (tipoPesquisa, idx = null) => (event) => {
    if (
      !this.state.loading &&
      this.state.filtroCorrente !== event.target.value
    ) {
      let id = event.target.id;
      let value = this.formatValueToRequest(event.target.value, tipoPesquisa);
      let obj = {
        where: id,
        value: value,
        type: this.getTypeWhereFieldPagination(tipoPesquisa),
      };
      this.setValueDataPicker(tipoPesquisa, event.target.value, idx);
      this.setFiltro(obj);
    }
  };

  onFocus = (event) => {
    // event.target.select();
    this.setState({
      filtroCorrente: event.target.value,
    });
  };

  filtrar = (tipoPesquisa, event, idx = null) => {
    {
      let id = event.target.id;
      let value = this.formatValueToRequest(event.target.value, tipoPesquisa);
      let obj = {
        where: id,
        value: value,
        type: this.getTypeWhereFieldPagination(tipoPesquisa),
      };
      this.setValueDataPicker(tipoPesquisa, event.target.value, idx);

      this.setFiltro(obj)
        .then(() => {
          this.pesquisar(this.props.paginacao || {});
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  onChangeData = (idx) => (date, value) => {
    //if (date) {
    // if (!isNaN(date.getTime())) {
    //   let filters = this.state.filtroDataPicker;
    //   filters[idx] = date;
    //   this.setState(() => ({
    //     filtroDataPicker: filters
    //    }));
    //   }
    //  }
  };

  onAcceptData = (idx) => (date) => {
    if (date) {
      if (!isNaN(date.getTime())) {
        let filters = this.state.filtroDataPicker;
        filters[idx] = date;
        this.setState(() => ({
          filtroDataPicker: filters,
        }));
      }
    }
  };

  onCloseData = (tipoPesquisa, name, idx) => () => {
    let obj = {
      where: name,
      value: this.formatValueToRequest(
        this.state.filtroDataPicker[idx],
        tipoPesquisa
      ),
      type: this.getTypeWhereFieldPagination(tipoPesquisa),
    };

    this.setFiltro(obj)
      .then(() => {
        this.pesquisar(this.props.paginacao || {});
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  onChangeSelectFilter = (tipoPesquisa, idx) => (event) => {
    let name = event.target.name;
    let value = event.target.value + "";
    let obj = {
      where: name,
      value: value,
      type: this.getTypeWhereFieldPagination(tipoPesquisa),
    };

    let filters = this.state.filtroSelect;
    filters[idx] = value;

    this.setState(
      () => ({
        filtroSelect: filters,
      }),
      () => {
        this.setFiltro(obj)
          .then(() => {
            this.pesquisar(this.props.paginacao || {});
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    );
  };

  handleClick = (event, selectedRow) => {
    if (this.state.selected === selectedRow) {
      selectedRow = null;
    }

    this.setState((prevState) => ({ ...prevState, selected: selectedRow }));
  };

  isSelected = (selectedRow) => this.state.selected === selectedRow;

  getStripedStyle(index) {
    return { background: index % 2 ? "#fffff" : "#fafafa" };
  }
  onInsert = () => {
    this.props.onInsert();
  };

  onDelete = (item) => {
    this.props.onDelete(item);
  };

  onEdit = (item) => {
    this.props.onEdit(item);
  };

  limparSelecaoItem = () => {
    this.setState((prevState) => ({ ...prevState, selected: null }));
  };

  labelDisplayedRows = ({ from, to, count }) => {
    return `${from}-${to} de ${count}`;
  };

  formatarDataPorTipoPesquisa = (data, tipoPesquisa) => {
    if (
      tipoPesquisa === TIPO_PESQUISA.dataHora ||
      tipoPesquisa === TIPO_PESQUISA.dataHoraInicial ||
      tipoPesquisa === TIPO_PESQUISA.dataHoraFinal
    ) {
      return this.formatarData(data) + " " + this.formatarHora(data);
    } else if (
      tipoPesquisa === TIPO_PESQUISA.data ||
      tipoPesquisa === TIPO_PESQUISA.dataInicial ||
      tipoPesquisa === TIPO_PESQUISA.dataFinal
    ) {
      return this.formatarData(data);
    } else {
      return this.formatarData(data);
    }
  };

  formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  formatarHora = (data) => {
    return new Date(data).toLocaleTimeString("pt-BR");
  };

  removerFiltroMobile = (coluna) => {
    this.props.removeColunaFiltroMobile(coluna);

    this.setState(
      (prevState) => ({
        filters: prevState.filters.filter((item) => {
          return item.where !== coluna.id;
        }),
      }),
      () => {
        this.pesquisar(this.props.paginacao || {});
      }
    );
  };

  render() {
    const {
      classes,
      isAdmin,
      dados,
      columns,
      paginacao,
      icon,
      mobileField,
    } = this.props;

    return (
      <BlockUi tag="div" blocking={this.state.block}>
        <Paper elevation={0} className={classes.root} square>
          <TabelaToolbar
            onExport={this.onExport}
            onInsert={this.onInsert.bind(this, this.state.selected)}
            onDelete={this.onDelete.bind(this, this.state.selected)}
            onEdit={this.onEdit.bind(this, this.state.selected)}
            isAdmin={isAdmin}
            isPossuiDados={dados && Object.keys(dados).length > 0}
            isRowSelected={
              this.state.selected && Object.keys(this.state.selected).length > 0
            }
            titulo={this.props.titulo}
            icon={icon}
          />
          <BlockUi tag="div" blocking={this.state.loading}>
            <Paper elevation={1} className={classes.rootPaper} square>
              <div className={classes.tableWrapper}>
                <Table stickyHeader className={classes.table}>
                  <TableHead>
                    <TableRow>
                      {columns.map((column, idx) => {
                        return (
                          <TableCell
                            classes={{
                              root: classes.tableCellHeader,
                            }}
                            size="small"
                            key={column.id}
                            sortDirection={
                              this.state.orderField === column.id
                                ? this.state.ordination
                                : false
                            }
                            style={{
                              minWidth: column.width,
                            }}
                          >
                            <Tooltip
                              title="Ordernation"
                              placement={
                                column.numeric ? "bottom-end" : "bottom-start"
                              }
                              enterDelay={300}
                            >
                              <TableSortLabel
                                style={{
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                }}
                                active={this.state.orderField === column.id}
                                direction={this.state.ordination}
                                onClick={(event) =>
                                  this.handleRequestSort(event, column.id)
                                }
                              >
                                {column.label}
                              </TableSortLabel>
                            </Tooltip>

                            {column.tipoPesquisa === TIPO_PESQUISA.string ? (
                              <TextField
                                InputProps={{
                                  className: classes.inputTextPesquisa,
                                }}
                                autoComplete={"no"}
                                defaultValue={column.defaultValue}
                                key={column.id}
                                fullWidth
                                id={column.id}
                                margin="none"
                                onFocus={this.onFocus}
                                onKeyDown={this.onEnterFilter(
                                  column.tipoPesquisa
                                )}
                                onBlur={this.onBlurFilter(column.tipoPesquisa)}
                              />
                            ) : column.tipoPesquisa ===
                              TIPO_PESQUISA.numeric ? (
                              <TextField
                                autoComplete={"no"}
                                InputProps={{
                                  className: classes.inputTextPesquisa,
                                }}
                                defaultValue={column.defaultValue}
                                key={column.id}
                                fullWidth
                                type="number"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                id={column.id}
                                margin="none"
                                onFocus={this.onFocus}
                                onKeyDown={this.onEnterFilter(
                                  column.tipoPesquisa
                                )}
                                onBlur={this.onBlurFilter(column.tipoPesquisa)}
                              />
                            ) : column.tipoPesquisa === TIPO_PESQUISA.data ? (
                              <MuiPickersUtilsProvider
                                utils={DateFnsUtils}
                                locale={this.state.localeData}
                              >
                                <KeyboardDatePicker
                                  className={classes.textFieldDataPickerData}
                                  invalidDateMessage={null}
                                  maxDateMessage={null}
                                  minDateMessage={null}
                                  value={
                                    this.state.filtroDataPicker[idx] || null
                                  }
                                  format={this.getFormatDate(
                                    column.tipoPesquisa
                                  )}
                                  autoComplete={"no"}
                                  InputProps={{
                                    className: classes.inputTextPesquisa,
                                  }}
                                  InputAdornmentProps={{
                                    className: classes.inputAdornmentDatePicker,
                                  }}
                                  KeyboardButtonProps={{
                                    className: classes.keyboardButtonDatePicker,
                                  }}
                                  fullWidth
                                  autoOk
                                  id={column.id}
                                  margin="none"
                                  key={column.id}
                                  variant="inline"
                                  ampm={false}
                                  onError={console.log}
                                  onFocus={this.onFocus}
                                  onClose={this.onCloseData(
                                    column.tipoPesquisa,
                                    column.id,
                                    idx
                                  )}
                                  onBlur={this.onBlurFilter(
                                    column.tipoPesquisa,
                                    idx
                                  )}
                                  onKeyDown={this.onEnterFilter(
                                    column.tipoPesquisa,
                                    idx
                                  )}
                                  onAccept={this.onAcceptData(idx)}
                                  onChange={this.onChangeData(idx)}
                                />
                              </MuiPickersUtilsProvider>
                            ) : /**
   * 
   <TextField
     autoComplete={"no"}
     InputProps={{
       className: classes.inputTextPesquisa
     }}
     defaultValue={column.defaultValue}
     key={column.id}
     fullWidth
     InputLabelProps={{
       shrink: true
     }}
     type="date"
     id={column.id}
     margin="none"
     onFocus={this.onFocus}
     onKeyDown={this.onEnterFilter(
       column.tipoPesquisa
     )}
     onBlur={this.onBlurFilter(column.tipoPesquisa)}
   />
   */

                            column.tipoPesquisa ===
                              TIPO_PESQUISA.dataInicial ? (
                              <MuiPickersUtilsProvider
                                utils={DateFnsUtils}
                                locale={this.state.localeData}
                              >
                                <KeyboardDatePicker
                                  className={classes.textFieldDataPickerData}
                                  invalidDateMessage={null}
                                  maxDateMessage={null}
                                  minDateMessage={null}
                                  value={
                                    this.state.filtroDataPicker[idx] || null
                                  }
                                  format={this.getFormatDate(
                                    column.tipoPesquisa
                                  )}
                                  fullWidth
                                  autoComplete={"no"}
                                  InputProps={{
                                    className: classes.inputTextPesquisa,
                                  }}
                                  InputAdornmentProps={{
                                    className: classes.inputAdornmentDatePicker,
                                  }}
                                  KeyboardButtonProps={{
                                    className: classes.keyboardButtonDatePicker,
                                  }}
                                  autoOk
                                  emptyLabel={null}
                                  id={column.id}
                                  margin="none"
                                  key={column.id}
                                  variant="inline"
                                  ampm={false}
                                  onError={console.log}
                                  onFocus={this.onFocus}
                                  onClose={this.onCloseData(
                                    column.tipoPesquisa,
                                    column.id,
                                    idx
                                  )}
                                  onBlur={this.onBlurFilter(
                                    column.tipoPesquisa,
                                    idx
                                  )}
                                  onKeyDown={this.onEnterFilter(
                                    column.tipoPesquisa,
                                    idx
                                  )}
                                  onAccept={this.onAcceptData(idx)}
                                  onChange={this.onChangeData(idx)}
                                />
                              </MuiPickersUtilsProvider>
                            ) : column.tipoPesquisa ===
                              TIPO_PESQUISA.dataFinal ? (
                              <MuiPickersUtilsProvider
                                utils={DateFnsUtils}
                                locale={this.state.localeData}
                              >
                                <KeyboardDatePicker
                                  className={classes.textFieldDataPickerData}
                                  invalidDateMessage={null}
                                  maxDateMessage={null}
                                  minDateMessage={null}
                                  value={
                                    this.state.filtroDataPicker[idx] || null
                                  }
                                  format={this.getFormatDate(
                                    column.tipoPesquisa
                                  )}
                                  autoComplete={"no"}
                                  InputProps={{
                                    className: classes.inputTextPesquisa,
                                  }}
                                  InputAdornmentProps={{
                                    className: classes.inputAdornmentDatePicker,
                                  }}
                                  KeyboardButtonProps={{
                                    className: classes.keyboardButtonDatePicker,
                                  }}
                                  fullWidth
                                  autoOk
                                  id={column.id}
                                  margin="none"
                                  key={column.id}
                                  variant="inline"
                                  ampm={false}
                                  onError={console.log}
                                  onFocus={this.onFocus}
                                  onClose={this.onCloseData(
                                    column.tipoPesquisa,
                                    column.id,
                                    idx
                                  )}
                                  onBlur={this.onBlurFilter(
                                    column.tipoPesquisa,
                                    idx
                                  )}
                                  onKeyDown={this.onEnterFilter(
                                    column.tipoPesquisa,
                                    idx
                                  )}
                                  onAccept={this.onAcceptData(idx)}
                                  onChange={this.onChangeData(idx)}
                                />
                              </MuiPickersUtilsProvider>
                            ) : column.tipoPesquisa ===
                              TIPO_PESQUISA.dataHoraInicial ? (
                              <MuiPickersUtilsProvider
                                utils={DateFnsUtils}
                                locale={this.state.localeData}
                              >
                                <KeyboardDateTimePicker
                                  className={
                                    classes.textFieldDataPickerDataHora
                                  }
                                  invalidDateMessage={null}
                                  maxDateMessage={null}
                                  minDateMessage={null}
                                  value={
                                    this.state.filtroDataPicker[idx] || null
                                  }
                                  format={this.getFormatDate(
                                    column.tipoPesquisa
                                  )}
                                  autoComplete={"no"}
                                  InputProps={{
                                    className: classes.inputTextPesquisa,
                                  }}
                                  InputAdornmentProps={{
                                    className: classes.inputAdornmentDatePicker,
                                  }}
                                  KeyboardButtonProps={{
                                    className: classes.keyboardButtonDatePicker,
                                  }}
                                  fullWidth
                                  autoOk
                                  id={column.id}
                                  margin="none"
                                  key={column.id}
                                  variant="inline"
                                  ampm={false}
                                  onError={console.log}
                                  onFocus={this.onFocus}
                                  onClose={this.onCloseData(
                                    column.tipoPesquisa,
                                    column.id,
                                    idx
                                  )}
                                  onBlur={this.onBlurFilter(
                                    column.tipoPesquisa,
                                    idx
                                  )}
                                  onKeyDown={this.onEnterFilter(
                                    column.tipoPesquisa,
                                    idx
                                  )}
                                  onAccept={this.onAcceptData(idx)}
                                  onChange={this.onChangeData(idx)}
                                />
                              </MuiPickersUtilsProvider>
                            ) : /*
                                
                                <TextField
                                  autoComplete={"no"}
                                  InputProps={{
                                    className: classes.inputTextPesquisa
                                  }}
                                  key={column.id}
                                  defaultValue={column.defaultValue}
                                  type="datetime-local"
                                  inputProps={{
                                    step: column.step ? column.step : 0
                                  }}
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                  id={column.id}
                                  margin="none"
                                  onFocus={this.onFocus}
                                  onKeyDown={this.onEnterFilter("MAIOR_IGUAL")}
                                  onBlur={this.onBlurFilter("MAIOR_IGUAL")}
                                />
                                */

                            column.tipoPesquisa ===
                              TIPO_PESQUISA.dataHoraFinal ? (
                              <MuiPickersUtilsProvider
                                utils={DateFnsUtils}
                                locale={this.state.localeData}
                              >
                                <KeyboardDateTimePicker
                                  className={
                                    classes.textFieldDataPickerDataHora
                                  }
                                  invalidDateMessage={null}
                                  maxDateMessage={null}
                                  minDateMessage={null}
                                  value={
                                    this.state.filtroDataPicker[idx] || null
                                  }
                                  format={this.getFormatDate(
                                    column.tipoPesquisa
                                  )}
                                  fullWidth
                                  autoComplete={"no"}
                                  InputProps={{
                                    className: classes.inputTextPesquisa,
                                  }}
                                  InputAdornmentProps={{
                                    className: classes.inputAdornmentDatePicker,
                                  }}
                                  KeyboardButtonProps={{
                                    className: classes.keyboardButtonDatePicker,
                                  }}
                                  autoOk
                                  emptyLabel={null}
                                  id={column.id}
                                  margin="none"
                                  key={column.id}
                                  variant="inline"
                                  ampm={false}
                                  onError={console.log}
                                  onFocus={this.onFocus}
                                  onClose={this.onCloseData(
                                    column.tipoPesquisa,
                                    column.id,
                                    idx
                                  )}
                                  onBlur={this.onBlurFilter(
                                    column.tipoPesquisa,
                                    idx
                                  )}
                                  onKeyDown={this.onEnterFilter(
                                    column.tipoPesquisa,
                                    idx
                                  )}
                                  onAccept={this.onAcceptData(idx)}
                                  onChange={this.onChangeData(idx)}
                                />
                              </MuiPickersUtilsProvider>
                            ) : /*
                                <TextField
                                  autoComplete={"no"}
                                  InputProps={{
                                    className: classes.inputTextPesquisa
                                  }}
                                  key={column.id}
                                  defaultValue={column.defaultValue}
                                  type="datetime-local"
                                  inputProps={{
                                    step: column.step ? column.step : 0
                                  }}
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                  id={column.id}
                                  margin="none"
                                  onFocus={this.onFocus}
                                  onKeyDown={this.onEnterFilter("MENOR_IGUAL")}
                                  onBlur={this.onBlurFilter("MENOR_IGUAL")}
                                />
                                
                                */

                            column.tipoPesquisa === TIPO_PESQUISA.dataHora ? (
                              <TextField
                                autoComplete={"no"}
                                InputProps={{
                                  className: classes.inputTextPesquisa,
                                  step: column.step ? column.step : 0,
                                }}
                                defaultValue={column.defaultValue}
                                key={column.id}
                                type="datetime-local"
                                //inputProps={{
                                //  step: column.step ? column.step : 0
                                //}}
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                id={column.id}
                                margin="none"
                                onFocus={this.onFocus}
                                onKeyDown={this.onEnterFilter(
                                  column.tipoPesquisa
                                )}
                                onBlur={this.onBlurFilter(column.tipoPesquisa)}
                              />
                            ) : column.tipoPesquisa === TIPO_PESQUISA.select ? (
                              <TextField
                                autoComplete={"no"}
                                InputProps={{
                                  className: classes.inputTextPesquisa,
                                }}
                                defaultValue={column.defaultValue}
                                key={column.id}
                                fullWidth
                                select
                                SelectProps={{
                                  MenuProps: {
                                    className: classes.menu,
                                  },
                                }}
                                value={this.state.filtroSelect[idx]}
                                name={column.id}
                                margin="none"
                                onFocus={this.onFocus}
                                onChange={this.onChangeSelectFilter(
                                  column.tipoPesquisa,
                                  idx
                                )}
                              >
                                <MenuItem
                                  key={"dtvazioMenuItem" + column.id}
                                  value={""}
                                />
                                {column.converter.map((option) => (
                                  <MenuItem
                                    key={option.value + column.id}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            ) : null}
                          </TableCell>
                        );
                      }, this)}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dados &&
                      Object.keys(dados).length > 0 &&
                      dados.map((n, i) => {
                        const isSelected = this.isSelected(n);
                        return (
                          <TableRow
                            onDoubleClick={this.onEdit.bind(this, n)}
                            classes={{
                              selected: classes.selected,
                              hover: classes.hover,
                              root: classes.rootRow,
                            }}
                            key={i}
                            hover
                            onClick={(event) => this.handleClick(event, n)}
                            aria-checked={isSelected}
                            role="checkbox"
                            tabIndex={-1}
                            selected={isSelected}
                          >
                            {columns.map((column) => {
                              return (
                                <TableCell
                                  classes={{ root: classes.tableCell }}
                                  key={column.id}
                                  component="th"
                                  scope="row"
                                  size="small"
                                  variant="body"
                                  padding="checkbox"
                                  style={{
                                    textAlign: column.align,
                                    minWidth: column.width,
                                  }}
                                >
                                  {n[column.id] != null
                                    ? column.tipoPesquisa ===
                                      TIPO_PESQUISA.numeric
                                      ? n[column.id].toLocaleString("pt-BR", {
                                          maximumFractionDigits:
                                            column.casasDecimais !== null
                                              ? column.casasDecimais
                                              : 1,

                                          minimumFractionDigits:
                                            column.casasDecimais !== null
                                              ? column.casasDecimais
                                              : 1,
                                        })
                                      : column.tipoPesquisa ===
                                          TIPO_PESQUISA.data ||
                                        column.tipoPesquisa ===
                                          TIPO_PESQUISA.dataHora ||
                                        column.tipoPesquisa ===
                                          TIPO_PESQUISA.dataInicial ||
                                        column.tipoPesquisa ===
                                          TIPO_PESQUISA.dataHoraInicial ||
                                        column.tipoPesquisa ===
                                          TIPO_PESQUISA.dataFinal ||
                                        column.tipoPesquisa ===
                                          TIPO_PESQUISA.dataHoraFinal
                                      ? column.tipoPesquisa.indexOf(
                                          "dataHora"
                                        ) !== -1
                                        ? new Date(
                                            n[column.id]
                                          ).toLocaleDateString("pt-BR") +
                                          " " +
                                          new Date(
                                            n[column.id]
                                          ).toLocaleTimeString("pt-BR")
                                        : new Date(
                                            n[column.id]
                                          ).toLocaleDateString("pt-BR", {
                                            timeZone: "UTC",
                                          })
                                      : column.converter
                                      ? column.converter.find((item) => {
                                          return item.value === n[column.id];
                                        }).label
                                      : n[column.id]
                                    : ""}
                                </TableCell>
                              );
                            }, this)}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </Paper>
            {dados && Object.keys(dados).length > 0 && (
              /*<TablePagination
              style={{ backgroundColor: "#d8d8d830" }}
              component="div"
              count={paginacao.totalCount}
              rowsPerPage={paginacao.pageSize} 
              page={paginacao.page}
              labelDisplayedRows={this.labelDisplayedRows}
              labelRowsPerPage={"Linhas por página:"}
              backIconButtonProps={{
                "aria-label": t("c.global.pagina.anterior")
              }}
              nextIconButtonProps={{
                "aria-label": t("c.global.pagina.proxima")
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              rowsPerPageOptions={paginacao.rowsPerPage}
              />*/

              <DataTablePagination
                onManualChangePage={this.handleManualChangePage}
                onChangePage={this.handleChangePage}
                paginacao={paginacao || {}}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            )}
          </BlockUi>
        </Paper>

        {/**
         *
         *
         *
         *
         * mobile
         *
         *
         */}
      </BlockUi>
    );
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  filtrosMobile: state.appState.filtrosMobile,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { removeColunaFiltroMobile, setColunasMobile, limparFiltrosMobile },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DataTable));
