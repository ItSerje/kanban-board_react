import { Button } from 'react-bootstrap';
import BootstrapContainer from 'react-bootstrap/Container';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import { useAppContext } from '../../context/app-context';
import './style.css';

const Navbar = ({ logout }) => {
  const { currentUser } = useAppContext();
  return (
    <BootstrapNavbar>
      <BootstrapContainer>
        <BootstrapNavbar.Brand href='#home'>Kanban Board</BootstrapNavbar.Brand>
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
      </BootstrapContainer>
    </BootstrapNavbar>
  );
};

export default Navbar;
