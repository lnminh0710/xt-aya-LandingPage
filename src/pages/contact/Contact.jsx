import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { FormikContext, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { subtmitContact } from './services';
import InputFormikControl from 'components/own/form-control/InputFormikControl';
import TextAreaFormikControl from 'components/own/form-control/TextAreaFormikControl';

const Contact = () => {
  const router = useRouter();
  const { t } = useTranslation('contact');
  const [isLoading, setLoading] = useState(false);

  //#region --- define form
  const dataSchema = Yup.object().shape({
    firstName: Yup.string().required(
      t('err_Required_Firstname', { ns: 'fields' })
    ),
    lastName: Yup.string().required(
      t('err_Required_Lastname', { ns: 'fields' })
    ),
    email: Yup.string()
      .email(t('err_Format_Email', { ns: 'fields' }))
      .min(6, t('err_Minimum', { ns: 'fields' }))
      .max(100, t('err_Maximum_Email', { ns: 'fields' }))
      .required(t('err_Required_Email', { ns: 'fields' })),
  });
  const initialValues = {
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    website: '',
    phoneNumber: '',
    paragraph: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: dataSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      subtmitContact(values).subscribe(
        (res) => {
          toast.dismiss();
          setLoading(false);
          if (!res.response) {
            toast.warn('Error');
            return;
          }

          toast.success('Success');
          formik.resetForm();
        },
        (err) => {
          toast.dismiss();
          setLoading(false);
          toast.error(err.message);
        }
      );
    },
  });
  //#endregion

  return (
    <>
      <div className='custom-container privacy-container'>
        <h1 className='header-title'>{t('title')}</h1>
        <p className={styles.subTitle}>{t('subTitle')}</p>
        <div className={styles.btnFaqWrapper}>
          <Link href={`/faq`}>
            <a className={`btn-aya purple`}>{t('btnRedirectFaq')}</a>
          </Link>
        </div>
        <hr className={styles.hrStytle} />
        <div className={styles.bodyWrapper}>
          <div className={styles.contactForm}>
            <FormikContext.Provider value={formik}>
              <Form className='form-wrapper'>
                <InputFormikControl
                  formik={formik}
                  controlName='firstName'
                  displayName={t('display_Name_Firstname', { ns: 'fields' })}
                  isRequired={true}
                />
                <InputFormikControl
                  formik={formik}
                  controlName='lastName'
                  displayName={t('display_Name_Lastname', { ns: 'fields' })}
                  isRequired={true}
                />
                <InputFormikControl
                  formik={formik}
                  controlName='company'
                  displayName={t('display_Name_Company', { ns: 'fields' })}
                />
                <InputFormikControl
                  formik={formik}
                  controlName='email'
                  displayName={t('display_Name_Email', { ns: 'fields' })}
                  isRequired={true}
                />
                <InputFormikControl
                  formik={formik}
                  controlName='website'
                  displayName={t('display_Name_Website', { ns: 'fields' })}
                />
                <InputFormikControl
                  formik={formik}
                  controlName='phoneNumber'
                  displayName={t('display_Name_Phone', { ns: 'fields' })}
                />
                <TextAreaFormikControl
                  formik={formik}
                  controlName='paragraph'
                  displayName={t('display_Name_Paragraph', { ns: 'fields' })}
                />

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
                    {t('btn_Send_Mes')}
                  </Button>
                )}
              </Form>
            </FormikContext.Provider>
          </div>
          <p className={styles.note}>{t('note')}</p>
          <div className={styles.autographs}>
            <h4 className={styles.autoTitle}>{t('autographs')}</h4>
            <p className={styles.autoDes}>{t('autographsDes')}</p>
          </div>
        </div>
      </div>
      <ToastContainer position='bottom-right' />
    </>
  );
};

export default Contact;
