import { ErrorMessage, Field } from 'formik';
import { Col, Form } from 'react-bootstrap';

const TextAreaFormikControl = ({
  formik,
  controlName,
  displayName,
  rows = '5',
  isRequired = false,
  isResize = false,
}) => {
  function handleClickPlaceholder(event) {
    event.currentTarget.previousElementSibling.focus();
  }
  return (
    <Form.Group as={Col} className='form-group-wrapper'>
      <Field
        component='textarea'
        rows={rows}
        className={`form-control ${isResize ? '' : 'resize-none'}`}
        value={formik.values[controlName]}
        placeholder=' '
        name={controlName}
        onChange={formik.handleChange}
      />
      <span
        className={`custom-placeholder ${isRequired ? 'required' : ''}`}
        onClick={handleClickPlaceholder}
      >
        {displayName}
      </span>
      <ErrorMessage
        name={controlName}
        className='control-invalid'
        component='div'
      />
    </Form.Group>
  );
};

export default TextAreaFormikControl;
