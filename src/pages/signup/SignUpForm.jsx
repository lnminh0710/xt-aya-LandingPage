import { FacebookIcon } from 'assets/svg/facebook';
import { GoogleIcon } from 'assets/svg/google';
import { InstagramIcon } from 'assets/svg/instagram';
import { TikTokIcon } from 'assets/svg/tiktok';
import { ErrorMessage, Field, FormikContext, useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { Button, Col, Form } from 'react-bootstrap';
import styles from './styleSignUpForm.module.scss';
import * as Yup from 'yup';
import InputFormikControl from 'components/own/form-control/InputFormikControl';
import { useEffect, useState } from 'react';
import SelectFormikControl from 'components/own/form-control/SelectFormikControl';
import Link from 'next/link';

const SignUpForm = ({ roleType }) => {
  const { t } = useTranslation(['signup', 'fields']);
  const [nations, setNations] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //#region --- define form
  const dataSchema = Yup.object().shape({
    firstName: Yup.string().required(
      t('err_Required_FullName', { ns: 'fields' })
    ),
    lastName: Yup.string().required(
      t('err_Required_Lastname', { ns: 'fields' })
    ),
    email: Yup.string()
      .email(t('err_Format_Email', { ns: 'fields' }))
      .min(6, t('err_Minimum', { ns: 'fields' }))
      .max(100, t('err_Maximum_Email', { ns: 'fields' }))
      .required(t('err_Required_Email', { ns: 'fields' })),
    password: Yup.string()
      .min(6, t('err_Minimum', { ns: 'fields' }))
      .required(t('err_Required_Pass', { ns: 'fields' })),
    agree: Yup.bool().oneOf([true], t('err_Required_Terms', { ns: 'fields' })),
  });
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    nation: '',
    agree: false,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: dataSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      console.log(values);
    },
  });
  //#endregion

  useEffect(() => {
    setNations([
      { value: 1, text: t('vietnam') },
      { value: 2, text: t('england') },
    ]);
  }, []);
  return (
    <>
      <div
        className={`row justify-content-lg-center ${styles.signupFormWrapper}`}
      >
        <h1 className='header-title'>{t('signup')}</h1>
        <h4 className={styles.subTitle}>{t('signupSubTitle')}</h4>
        <div className={`col-12 col-lg-6 ${styles.formWrapper}`}>
          <Button className={`btn-aya light-blue ${styles.btnSocial}`}>
            <span className={styles.socialIcon}>
              <GoogleIcon />
            </span>
            {t('signUpGG')}
          </Button>
          <Button className={`btn-aya light-blue ${styles.btnSocial}`}>
            <span className={`${styles.socialIcon} ${styles.fbIcon}`}>
              <FacebookIcon />
            </span>
            {t('signUpFb')}
          </Button>
          <Button className={`btn-aya light-blue ${styles.btnSocial}`}>
            <span className={styles.socialIcon}>
              <InstagramIcon />
            </span>
            {t('signUpIns')}
          </Button>
          <Button className={`btn-aya light-blue ${styles.btnSocial}`}>
            <span className={styles.socialIcon}>
              <TikTokIcon />
            </span>
            {t('signUpTik')}
          </Button>
          <div className={styles.splitOr}>
            <span>or</span>
          </div>
          <FormikContext.Provider value={formik}>
            <Form className='form-wrapper'>
              <div className='row'>
                <div className='col-12 col-md-6'>
                  {' '}
                  <InputFormikControl
                    formik={formik}
                    controlName='firstName'
                    displayName={t('display_Name_FullName', { ns: 'fields' })}
                    isRequired={true}
                  />
                </div>
                <div className='col-12 col-md-6'>
                  <InputFormikControl
                    formik={formik}
                    controlName='lastName'
                    displayName={t('display_Name_Lastname', { ns: 'fields' })}
                    isRequired={true}
                  />
                </div>
              </div>
              <InputFormikControl
                formik={formik}
                controlName='email'
                displayName={t('display_Name_Email', { ns: 'fields' })}
                isRequired={true}
              />
              <InputFormikControl
                formik={formik}
                controlName='password'
                displayName={t('display_Name_Pass', { ns: 'fields' })}
                isRequired={true}
                type='password'
              />
              <SelectFormikControl
                formik={formik}
                controlName='nation'
                dataSource={nations}
              />

              <Form.Check
                type='checkbox'
                className={`form-check-aya ${styles.chkAgree}`}
              >
                <Field
                  className='checkbox-aya'
                  type='checkbox'
                  placeholder=' '
                  name='agree'
                  onChange={formik.handleChange}
                />
                <Form.Check.Label>
                  {t('agreeSentence')}{' '}
                  <Link href={`/terms`}>
                    <a target={'_blank'} className={`link-href purple`}>
                      {t('terms')}
                    </a>
                  </Link>{' '}
                  {t('and')}{' '}
                  <Link href={`/privacy`}>
                    <a target={'_blank'} className={`link-href purple`}>
                      {t('privacy')}
                    </a>
                  </Link>
                </Form.Check.Label>
                <ErrorMessage
                  name='agree'
                  className='control-invalid'
                  component='div'
                />
              </Form.Check>

              <div className={styles.btnWrapper}>
                {isLoading ? (
                  <Button disabled className='btn btn-secondary btn-aya w-100'>
                    <span className='spinner-border text-light' role='status'>
                      <span className='visually-hidden'>Loading...</span>
                    </span>
                  </Button>
                ) : (
                  <Button
                    className='btn-aya purple w-100'
                    onClick={formik.submitForm}
                  >
                    {t('btnCreate')}
                  </Button>
                )}
              </div>
              <div className={styles.alreadyHaveAcc}>
                {t('alreadyHaveAcc')}{' '}
                <Link href={`/#`}>
                  <a className={`link-href purple`}>{t('login')}</a>
                </Link>
              </div>
            </Form>
          </FormikContext.Provider>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
