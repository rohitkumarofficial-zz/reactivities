import { observer } from 'mobx-react-lite';
import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from './../../stores/store';

export default observer(function ServerError() {
    const {commonStore} = useStore();
    if(!commonStore.error) {return <></>;}
    return (
        <Container>
            <Header as='h1' content='Server Error'/>
            <Header sub as='h5' color='red' content={commonStore.error.message}/>
            {commonStore.error?.details && 
                <Segment>
                    <Header as='h4' content='Stack Trace' color='teal'/>
                    <code style={{marginTop: '1rem'}}>{commonStore.error.details}</code>
                </Segment>
            }
        </Container>
    )
})