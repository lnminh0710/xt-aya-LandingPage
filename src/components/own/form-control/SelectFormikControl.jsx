import { ArrowDown } from 'assets/svg/arrowdown';
import { ErrorMessage, Field } from 'formik';
import { Col, Form } from 'react-bootstrap';

const SelectFormikControl = ({ formik, controlName, dataSource = [] }) => {
  function handleClickArrow(event) {
    event.currentTarget.previousElementSibling.click();
  }
  return (
    <Form.Group as={Col} className='form-group-wrapper'>
      <Field
        component='select'
        className={`form-control`}
        value={formik.values[controlName]}
        placeholder=' '
        name={controlName}
        onChange={formik.handleChange}
      >
        {dataSource &&
          dataSource.map((item, index) => {
            return (
              <option key={`item-${index}`} value={item.value}>
                {item.text}
              </option>
            );
          })}
      </Field>
      <span className='arrow-down' onClick={handleClickArrow}>
        <ArrowDown />
      </span>
      <ErrorMessage
        name={controlName}
        className='control-invalid'
        component='div'
      />
    </Form.Group>
  );
};

export default SelectFormikControl;
