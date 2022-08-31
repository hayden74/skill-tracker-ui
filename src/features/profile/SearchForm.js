import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Col, Row } from 'react-bootstrap'
import * as yup from 'yup'
import { Formik } from 'formik'

const schema = yup.object().shape({
  criteria: yup.string().required(),
  // name: yup.string().required(),
  // associateId: yup.string().required(),
  // skill: yup.string().required(),
})
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function SearchForm () {
  return (
    <Formik
      validationSchema={schema}
      // onSubmit={console.log}
      onSubmit={async (values) => {
        await sleep(1000)
        alert(JSON.stringify(values, null, 2))
      }}
      initialValues={{
        criteria: 'Skill',
        name: '',
        associateId: '',
        skill: 'AWS',
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleSubmit,
          resetForm,
        } = props
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="searchFormCriteria">
              <Form.Label column sm={2}>
                Search by
              </Form.Label>
              <Col sm={4}>
                <Form.Check
                  inline
                  label="Name"
                  name="criteria"
                  type="radio"
                  id="criteria-name"
                  value="Name"
                  defaultChecked={values.criteria === 'Name'}
                  onChange={e => {
                    resetForm({ values: { name: '', associateId: '', skill: '' } })
                    handleChange(e)
                  }}
                />
                <Form.Check
                  inline
                  label="Associate ID"
                  name="criteria"
                  type="radio"
                  id="criteria-associate-id"
                  value="AssociateId"
                  defaultChecked={values.criteria === 'AssociateId'}
                  onChange={e => {
                    resetForm({ values: { name: '', associateId: '', skill: '' } })
                    handleChange(e)
                  }}
                />
                <Form.Check
                  inline
                  label="Skill"
                  name="criteria"
                  type="radio"
                  id="criteria-skill"
                  value="skill"
                  defaultChecked={values.criteria === 'Skill'}
                  onChange={e => {
                    resetForm({ values: { name: '', associateId: '', skill: '' } })
                    handleChange(e)
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="searchFormName">
              <Form.Label column sm={2}>
                Name
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  name="Name"
                  type="text"
                  disabled={values.criteria !== 'Name'}
                  value={values.name}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="searchFormAssociateId">
              <Form.Label column sm={2}>
                Associate ID
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  name="AssociateId"
                  type="text"
                  disabled={values.criteria !== 'AssociateId'}
                  value={values.associateId}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="searchFormSkill">
              <Form.Label column sm={2}>
                Technical Skill
              </Form.Label>
              <Col sm={4}>
                <Form.Select
                  name="Skill"
                  disabled={values.criteria !== 'Skill'}
                  value={values.skill}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="AWS">AWS</option>
                  <option value="REACT">REACt</option>
                  <option value="GIT">GIT</option>
                  <option value="ATTITUDE">ATTITUDE</option>
                  <option value="COMMUNICATION">COMMUNICATION</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit" disabled={isSubmitting}>Search</Button>
              </Col>
            </Form.Group>
          </Form>
        )
      }}
    </Formik>
  )
}

export default SearchForm