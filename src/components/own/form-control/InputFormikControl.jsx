import { ErrorMessage, Field } from 'formik';
import { useState } from 'react';
import { Col, Form } from 'react-bootstrap';

const InputFormikControl = ({
  formik,
  controlName,
  displayName,
  isRequired = false,
  type = 'text',
}) => {
  const [displayType, setDisplayType] = useState(type);
  function handleClickPlaceholder(event) {
    event.currentTarget.previousElementSibling.focus();
  }

  return (
    <Form.Group as={Col} className='form-group-wrapper'>
      <Field
        type={displayType}
        className={`form-control ${type}`}
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
      {type === 'password' && (
        <span
          className='btn-show-pass'
          onClick={() =>
            setDisplayType(displayType === 'password' ? 'text' : 'password')
          }
        >
          {displayType === 'password' ? 'Show' : 'Hide'}
        </span>
      )}
      <ErrorMessage
        name={controlName}
        className='control-invalid'
        component='div'
      />
    </Form.Group>
  );
};

export default InputFormikControl;
