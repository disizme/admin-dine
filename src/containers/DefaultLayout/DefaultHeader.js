import React, { Component } from 'react';
// import { Link, NavLink } from 'react-router-dom';
import {  DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';
import PropTypes from 'prop-types';
// AppAsideToggler
import { AppSidebarMinimizer, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/brand.png'
import {logOutUser} from "../../components/shared/helpers/GeneralHelpers";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppSidebarMinimizer className='sidebar-minimizer' display='lg'>
          <i className='icon-menu' style={{fontSize: 'larger'}}></i>
        </AppSidebarMinimizer>
        <AppNavbarBrand className='nav-brand'>
          {/* // full={{ src: logo, width: "40px", height: "40px", alt: 'Dinemate' }}
          // minimized={{ src: logo, width: "40px", height: "40px", alt: 'Dinemate' }} */}
        <h4 className="ml-5"><span className="brand-color">Dine</span>Mate </h4>
        </AppNavbarBrand>
        {/* <AppSidebarToggler className="d-md-down-none" display="lg" /> */}
        <Nav className="d-md-down-none" navbar>
          {/* <NavItem className="px-3">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </NavItem> */}
          {/*<NavItem className="px-3">*/}
            {/*<NavLink to="#" className="nav-link">Settings</NavLink>*/}
          {/*</NavItem>*/}
        </Nav>
        <Nav className="ml-auto" navbar>
          {/*<NavItem className="d-md-down-none">*/}
            {/*<NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>*/}
          {/*</NavItem>*/}
          <AppHeaderDropdown direction="down" style={{marginRight:"1.25rem"}}>
            <DropdownToggle nav>
              <img src={logo} className="img-avatar" alt="User" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem onClick={() => this.props.history.push("/settings")}><i className="fa fa-user-circle"></i> Profile</DropdownItem>
              <DropdownItem onClick={e => {logOutUser()}}><i className="fa fa-power-off"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
