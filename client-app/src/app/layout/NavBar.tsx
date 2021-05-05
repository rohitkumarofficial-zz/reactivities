import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: '1rem'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/activities'/>
                <Menu.Item>
                    <Button as={NavLink} to='/create-activity' positive content='Create Activity'/>
                </Menu.Item>
                <Menu.Item></Menu.Item>
            </Container>
        </Menu>
    )
}
