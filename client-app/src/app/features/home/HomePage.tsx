import { Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

export default function HomePage () {
    return (
        <Container style={{marginTop: '7em'}}>
            <h1>homepage</h1>
            <h3>Go TO <Link to='/activities'>Activities</Link></h3>
        </Container>
    )
}
