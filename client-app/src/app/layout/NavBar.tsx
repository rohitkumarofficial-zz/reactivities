import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from './../stores/store';

export default function NavBar() {
    const {activityStore} = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: '1rem'}}/>
                </Menu.Item>
                <Menu.Item name='Reactivities'/>
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm()} positive content='Create Activity'/>
                </Menu.Item>
                <Menu.Item></Menu.Item>
            </Container>
        </Menu>
    )
}
