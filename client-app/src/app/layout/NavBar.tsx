import { Button, Container, Menu } from 'semantic-ui-react'

interface Props {
    formOpen: () => void;
}

export default function NavBar({formOpen}: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: '1rem'}}/>
                </Menu.Item>
                <Menu.Item name='Reactivities'/>
                <Menu.Item>
                    <Button onClick={formOpen} positive content='Create Activity'/>
                </Menu.Item>
                <Menu.Item></Menu.Item>
            </Container>
        </Menu>
    )
}
