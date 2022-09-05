import Form from 'react-bootstrap/Form'
import { Col, Row } from 'react-bootstrap'
import { FieldArray, Formik } from 'formik'
import * as yup from 'yup'
import Button from 'react-bootstrap/Button'
import { getTechnicalSkills } from '../../constant/Skills'

const schema = yup.object().shape({
  name: yup.string().required(),
  mobile: yup.string().required(),
  associateId: yup.string().required(),
  email: yup.string().required(),
  tech_skills: yup.array()
})

function AddProfile () {
  return (
    <>
      <h2>Add profile</h2>
      <Formik
        validationSchema={schema}
        onSubmit={async (values) => {
          console.log('form submitted: ', values)
        }}
        initialValues={{
          name: '',
          mobile: '',
          email: '',
          associateId: '',
          tech_skills: [],
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
          } = props
          return (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col sm={4}>
                  <h6>Profile details</h6>
                  <Form.Group as={Row} className="mb-3" controlId="addProfileFormName">
                    <Form.Label column sm={4}>
                      Name
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name && touched.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="addProfileFormAssociateId">
                    <Form.Label column sm={4}>
                      Associate ID
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        name="associateId"
                        type="text"
                        value={values.associateId}
                        onChange={handleChange}
                        isInvalid={!!errors.associateId && touched.associateId}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.associateId}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="addProfileFormEmail">
                    <Form.Label column sm={4}>
                      Email
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        name="email"
                        type="text"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email && touched.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" controlId="addProfileFormMobile">
                    <Form.Label column sm={4}>
                      Mobile
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control
                        name="mobile"
                        type="text"
                        value={values.mobile}
                        onChange={handleChange}
                        isInvalid={!!errors.mobile && touched.mobile}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mobile}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                </Col>

                <Col sm={4}>
                  <h6>Technical Skills</h6>
                  <FieldArray
                    name="tech_skills"
                    render={({ insert, remove, push }) => (

                      getTechnicalSkills().map((skill, index) =>
                        <div key={`skill-${index}`}>
                          <Form.Group as={Row} className="mb-3" controlId={`addProfileFormTechSkill-${skill}`}>
                            <Form.Label column sm={4}>
                              {skill}
                            </Form.Label>
                            <Col sm={6}>
                              <Form.Control
                                name={`tech_skills.${index}.${skill}`}
                                type="text"
                                onChange={handleChange}
                              />
                            </Col>
                          </Form.Group>
                        </div>
                      )

                    )}
                  />

                </Col>
                <Col sm={4}>
                  <h6>Non Technical Skills</h6>
                </Col>
              </Row>

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit" disabled={isSubmitting}>Search</Button>
                </Col>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>

    </>
  )
}

export default AddProfile
