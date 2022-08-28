import { Card, Col, Row, Table } from 'react-bootstrap'

function AssociateCard ({ profile }) {
  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <p><strong>Profile Details</strong></p>
              <Table striped bordered size="sm">
                <tbody>
                <tr>
                  <td>Associate ID</td>
                  <td>{profile.associateId}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{profile.name}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{profile.email}</td>
                </tr>
                <tr>
                  <td>Mobile</td>
                  <td>{profile.mobile}</td>
                </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <p><strong>Technical Skills</strong></p>
              <Table striped bordered size="sm">
                <thead>
                <tr>
                  <th>Skill Name</th>
                  <th>Level</th>
                </tr>
                </thead>
                <tbody>
                {profile.skills.filter(skill => skill.type === 'TECHNICAL').map(skill => (
                  <tr key={`${skill.name}-${skill.type}`}>
                    <td>{skill.name}</td>
                    <td>{skill.level}</td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </Col>
            <Col>
              <p><strong>Non Technical Skills</strong></p>
              <Table striped bordered size="sm">
                <thead>
                <tr>
                  <th>Skill Name</th>
                  <th>Level</th>
                </tr>
                </thead>
                <tbody>
                {profile.skills.filter(skill => skill.type === 'NON_TECHNICAL').map(skill => (
                  <tr key={`${skill.name}-${skill.type}`}>
                    <td>{skill.name}</td>
                    <td>{skill.level}</td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default AssociateCard