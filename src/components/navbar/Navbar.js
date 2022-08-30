import BootstrapContainer from 'react-bootstrap/Container';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import './style.css';

const Navbar = () => {
  return (
    <BootstrapNavbar>
      <BootstrapContainer>
        <BootstrapNavbar.Brand href='#home'>Dashboard</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle />
        <BootstrapNavbar.Collapse className='justify-content-end'>
          <BootstrapNavbar.Text>
            Signed in as: <a href='#login'>Mark Otto</a>
          </BootstrapNavbar.Text>
        </BootstrapNavbar.Collapse>
      </BootstrapContainer>
    </BootstrapNavbar>
  );
};

export default Navbar;
