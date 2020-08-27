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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
});

class MenuItemMobileDataGrid extends React.Component {
  state = {
    openMenuItem: false,
    isAlterar: true,
    isExcluir: false,
  };

  componentDidMount() {
    const { isAdmin } = this.props;

    this.setState((state) => ({
      isExcluir: isAdmin,
    }));
  }

  handleToggleMenuItem = () => {
    this.setState((state) => ({ openMenuItem: !state.openMenuItem }));
  };

  handleCloseMenuItem = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ openMenuItem: false });
  };

  render() {
    const { classes, onAlterar, onExcluir } = this.props;
    return (
      (this.state.isAlterar || this.state.isExcluir) && (
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
            <MoreVertIcon />
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
                    <MenuList>
                      {this.state.isAlterar && (
                        <MenuItem onClick={onAlterar}>
                          <ListItemIcon>
                            <EditIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Alterar" />
                        </MenuItem>
                      )}

                      {this.state.isExcluir && (
                        <MenuItem onClick={onExcluir}>
                          <ListItemIcon>
                            <DeleteIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Excluir" />
                        </MenuItem>
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      )
    );
  }
}

MenuItemMobileDataGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuItemMobileDataGrid);
