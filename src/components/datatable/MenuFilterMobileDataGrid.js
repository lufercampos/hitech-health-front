import React from "react";
import PropTypes from "prop-types";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import FilterList from "@material-ui/icons/FilterList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setColunaFiltroMobile } from "../../store/actions/AppAction";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  list: {
    maxHeight: "350px",
    overflow: "auto",
  },
});

class MenuFilterMobileDataGrid extends React.Component {
  state = {
    openMenuItem: false,
  };

  handleToggleMenuItem = () => {
    this.setState((state) => ({ openMenuItem: !state.openMenuItem }));
  };

  handleCloseMenuItem = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ openMenuItem: false });
  };

  setColuna = (coluna) => {
    this.props.setColunaFiltroMobile(coluna);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <IconButton
          buttonRef={(node) => {
            this.anchorEl = node;
          }}
          aria-owns={this.state.openMenuItem ? "material-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.handleToggleMenuItem}
          color="inherit"
        >
          <FilterList />
        </IconButton>
        <Popper
          open={this.state.openMenuItem}
          anchorEl={this.anchorEl}
          transition
          placement="bottom-end"
          disablePortal={false}
          modifiers={{
            flip: {
              enabled: false,
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: "scrollParent",
            },
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleCloseMenuItem}>
                  <MenuList className={classes.list}>
                    {this.props.colunasMobile.map((option) => (
                      <MenuItem
                        key={option.id}
                        value={option.id}
                        onClick={this.setColuna.bind(this, option)}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

MenuFilterMobileDataGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setColunaFiltroMobile }, dispatch);
}

const mapStateToProps = (state) => ({
  colunasMobile: state.appState.colunasMobile,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MenuFilterMobileDataGrid));
