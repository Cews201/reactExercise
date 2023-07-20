import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('Campo obligatorio'),
  lastName: Yup.string().required('Campo obligatorio'),
  email: Yup.string().email('Email inválido').required('Campo obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('Campo obligatorio'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Las contraseñas no coinciden')
    .required('Campo obligatorio'),
});

const StepOne = ({ handleReset }: { handleReset: () => void }) => (
  <>
    <h2>Paso 1: Información personal</h2>
    <Form>
      <div className="form-group">
        <label htmlFor="firstName">Nombre:</label>
        <Field type="text" className="form-control" id="firstName" name="firstName" />
        <ErrorMessage name="firstName" component="div" className="text-danger" />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Apellido:</label>
        <Field type="text" className="form-control" id="lastName" name="lastName" />
        <ErrorMessage name="lastName" component="div" className="text-danger" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <Field type="email" className="form-control" id="email" name="email" />
        <ErrorMessage name="email" component="div" className="text-danger" />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">Siguiente</button>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>Cancelar</button>
      </div>
    </Form>
  </>
);

const StepOneWithReset = ({ resetForm }: { resetForm: () => void }) => (
  <StepOne handleReset={resetForm} />
);

const StepOneWithFormik = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      console.log(values);
    }}
  >
    {({ resetForm }) => <StepOneWithReset resetForm={resetForm} />}
  </Formik>
);


const StepTwo = () => (
  <>
    <h2>Paso 2: Contraseña</h2>
    <Form>
      <div className="form-group">
        <label htmlFor="password">Contraseña:</label>
        <Field type="password" className="form-control" id="password" name="password" />
        <ErrorMessage name="password" component="div" className="text-danger" />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirmar contraseña:</label>
        <Field type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
      </div>
      <div>
        <Link to="/step1" className="btn btn-secondary">Anterior</Link>
        <Link to="/step3" className="btn btn-primary">Siguiente</Link>
      </div>
    </Form>
  </>
);

const StepTwoWithFormik = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      console.log(values);
    }}
  >
    {() => <StepTwo />}
  </Formik>
);

const StepThree = () => {
  return (
    <>
      <h2>Paso 3: Resumen</h2>
      <Form>
        <Field type="text" name="firstName" readOnly />
        <Field type="text" name="lastName" readOnly />
        <Field type="text" name="email" readOnly />
        {/* Password fields can be displayed without the value */}
        <Link to="/step2" className="btn btn-secondary">Anterior</Link>
        <Link to="/submit" className="btn btn-primary">Enviar</Link>
      </Form>
    </>
  );
};


const StepThreeWithValues = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values) => {
      console.log(values);
    }}
  >
    <StepThree />
  </Formik>
);

const SubmitForm = () => (
  <>
    <h2>Formulario enviado</h2>
    <p>Gracias por registrarte. Tus datos han sido enviados correctamente.</p>
  </>
);

const Home = () => (
  <Container>
    <Row>
      <Col>
        <h1>Bienvenido a nuestra aplicación</h1>
        <h2>Por favor, regístrate para continuar.</h2>
        <Link to="/step1" className="btn btn-primary">Registrarse</Link>
      </Col>
      <Col>
        <img src="https://agenciaatenea.gov.co/sites/default/files/inline-images/Grupo%2011803.png" alt="Logo de la empresa" />
      </Col>
    </Row>
  </Container>
);

const App = () => (
  <Router>
    <div>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <Link to="/" className="navbar-brand">App estudiantes</Link>
        <Link to="/" className="navbar-brand">App estudiantes</Link>
      </nav>
      <Routes>
        <Route path="/step1" Component={StepOneWithFormik} />
        <Route path="/step2" Component={StepTwoWithFormik} />
        <Route path="/step3" Component={StepThreeWithValues} />
        <Route path="/submit" Component={SubmitForm} />
        <Route path="/" Component={Home} />
      </Routes>
    </div>
    <div>
      <footer>
      <div>
    © 2023 Copyright:
    <a  href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div>
      </footer>
    </div>
  </Router>
);

export default App;


