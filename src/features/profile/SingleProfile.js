import Form from 'react-bootstrap/Form'
import { Col, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import Button from 'react-bootstrap/Button'
import { getNonTechnicalSkills, getTechnicalSkills } from '../../constant/Skills'
import { addProfile } from './profileSlice'
import { useDispatch, useSelector } from 'react-redux'
import ProfileCard from './ProfileCard'
import { useState } from 'react'

const techSkills = getTechnicalSkills()
const nonTechSkills = getNonTechnicalSkills()
const skills = {}
const skillValues = {}
techSkills.forEach(skill => {
  Object.assign(skills, { [skill]: yup.string().required('Enter a value between 0 and 20') })
  Object.assign(skillValues, { [skill]: '12' })
})
nonTechSkills.forEach(skill => {
  Object.assign(skills, { [skill]: yup.string().required('Enter a value between 0 and 20') })
  Object.assign(skillValues, { [skill]: '15' })
})

const schema = yup.object().shape({
  name: yup.string().min(5, 'Min 5 chars').max(30, 'Max 30 chars').required(),
  mobile: yup.string().min(10, 'Min 10 chars').max(10, 'Max 10 chars').matches(/^\d+$/, 'Numeric only').required(),
  associateId: yup.string().min(5, 'Min 5 chars').max(30, 'Max 30 chars').matches(/^CTS.+/, 'Must starts with CTS').required(),
  email: yup.string().email('Invalid email').required(),
  ...skills
})

let initialValues = {
  name: 'Hayden Adams',
  mobile: '0402471056',
  email: 'ddd@fff.com',
  associateId: 'CTS234234234',
  ...skillValues,
}

const buildFromProfile = (profile) => {
  const profileValues = {
    name: profile.name,
    mobile: profile.mobile,
    email: profile.email,
    associateId: profile.associateId,
  }
  profile.skills.forEach(skill => {
    Object.assign(profileValues, { [skill.name]: skill.level })
  })
  console.log(profileValues)
  return profileValues
}

function SingleProfile () {
  const [editMode, setEditMode] = useState(false)
  const profile = useSelector(state => state.profiles.profile)

  const dispatch = useDispatch()
  return (
    <>
      {profile && !editMode &&
      <>
        <h2>View profile</h2>
        <ProfileCard key={profile.id} profile={profile}/>
        <Col>
          <Button type="button" onClick={() => {
            setEditMode(true)
            initialValues = buildFromProfile(profile)
          }}>Edit Profile</Button>
        </Col>
      </>
      }
      {(!profile || editMode) &&
      <>
        <h2>Add profile</h2>
        <Formik
          validationSchema={schema}
          onSubmit={async (values, actions) => {
            const submitRequest = {
              name: values.name,
              email: values.email,
              mobile: values.mobile,
              associateId: values.associateId,
              skills: []
            }
            let keys = Object.keys(values)
            keys.forEach(key => {
              if (techSkills.indexOf(key) !== -1) {
                submitRequest.skills.push({
                  name: key,
                  level: values[key],
                  type: 'TECHNICAL'
                })
              }
              if (nonTechSkills.indexOf(key) !== -1) {
                submitRequest.skills.push({
                  name: key,
                  level: values[key],
                  type: 'NON_TECHNICAL'
                })
              }
            })
            dispatch(addProfile(submitRequest))
            setEditMode(false)
          }}
          initialValues={initialValues}
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

                    {techSkills.map((skill, index) => {
                      return (
                        <div key={index}>
                          <Form.Group as={Row} className="mb-3" controlId={`addProfileForm${skill}`}>
                            <Form.Label column sm={4}>
                              {skill}
                            </Form.Label>
                            <Col sm={8}>
                              <Form.Control
                                name={`${skill}`}
                                type="text"
                                value={values[skill]}
                                onChange={handleChange}
                                isInvalid={!!errors[skill] && touched[skill]}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors[skill]}
                              </Form.Control.Feedback>
                            </Col>
                          </Form.Group>
                        </div>)
                    })}
                  </Col>
                  <Col sm={4}>
                    <h6>Non Technical Skills</h6>
                    {nonTechSkills.map((skill, index) => {
                      return (
                        <div key={index}>
                          <Form.Group as={Row} className="mb-3" controlId={`addProfileForm${skill}`}>
                            <Form.Label column sm={4}>
                              {skill}
                            </Form.Label>
                            <Col sm={8}>
                              <Form.Control
                                name={`${skill}`}
                                type="text"
                                value={values[skill]}
                                onChange={handleChange}
                                isInvalid={!!errors[skill] && touched[skill]}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors[skill]}
                              </Form.Control.Feedback>
                            </Col>
                          </Form.Group>
                        </div>)
                    })}
                  </Col>
                </Row>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" disabled={isSubmitting}>Submit</Button>
                  </Col>
                </Form.Group>
              </Form>
            )
          }}
        </Formik>
      </>
      }
    </>
  )
}

export default SingleProfile
