import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Col, Row } from 'react-bootstrap'
import * as yup from 'yup'
import { Formik } from 'formik'
import { searchProfiles } from './Profile'

const schema = yup.object().shape({
  criteria: yup.string().required(),
  name: yup.string().when('criteria', {
    is: 'name',
    then: yup.string().required(),
    otherwise: yup.string()
  }),
  associateId: yup.string().when('criteria', {
    is: 'associateId',
    then: yup.string().required(),
    otherwise: yup.string()
  }),
  skill: yup.string().when('criteria', {
    is: 'skill',
    then: yup.string().required(),
    otherwise: yup.string()
  })
})

function SearchForm ({ dispatch }) {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={async (values) => {
        const options = { page: 0, size: 5, criteria: values.criteria, keyword: values[values.criteria] }
        searchProfiles(options)(dispatch)
      }}
      initialValues={{
        criteria: 'skill',
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
                  value="name"
                  defaultChecked={values.criteria === 'name'}
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
                  value="associateId"
                  defaultChecked={values.criteria === 'associateId'}
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
                  defaultChecked={values.criteria === 'skill'}
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
                  name="name"
                  type="text"
                  disabled={values.criteria !== 'name'}
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name && touched.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="searchFormAssociateId">
              <Form.Label column sm={2}>
                Associate ID
              </Form.Label>
              <Col sm={4}>
                <Form.Control
                  name="associateId"
                  type="text"
                  disabled={values.criteria !== 'associateId'}
                  value={values.associateId}
                  onChange={handleChange}
                  isInvalid={!!errors.associateId && touched.associateId}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.associateId}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="searchFormSkill">
              <Form.Label column sm={2}>
                Technical Skill
              </Form.Label>
              <Col sm={4}>
                <Form.Select
                  name="skill"
                  disabled={values.criteria !== 'skill'}
                  value={values.skill}
                  onChange={handleChange}
                  isInvalid={!!errors.skill && touched.skill}
                >
                  <option value="">Select</option>
                  <option value="AWS">AWS</option>
                  <option value="REACT">REACT</option>
                  <option value="GIT">GIT</option>
                  <option value="ATTITUDE">ATTITUDE</option>
                  <option value="COMMUNICATION">COMMUNICATION</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.skill}
                </Form.Control.Feedback>
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