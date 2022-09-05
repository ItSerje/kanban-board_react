import React from 'react';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import { useAppContext } from '../../context/app-context';
import './style.css';

interface LoginFormProps {
  logout: () => void;
}

const Navbar: React.FC<LoginFormProps> = ({ logout }): JSX.Element => {
  const { currentUser }: { currentUser: string } = useAppContext();
  return (
    <BootstrapNavbar className='navbar'>
      <BootstrapNavbar.Brand href='#home' className='navbar-brand'>
        Kanban Board
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle />
      <BootstrapNavbar.Collapse className='justify-content-end'>
        <BootstrapNavbar.Text>
          <BootstrapNavbar.Text className='d-none d-sm-inline'>
            Signed in as:{' '}
          </BootstrapNavbar.Text>
          <span className='current-user-name'>{currentUser}</span>
          {' | '}
          <span className='logout' onClick={logout}>
            Sign out
          </span>
        </BootstrapNavbar.Text>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
