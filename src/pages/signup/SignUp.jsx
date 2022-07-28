import { ArtistsIcon, FanIcon } from 'assets/svg';
import { AgentsIcon } from 'assets/svg/agents';
import { ProducersIcon } from 'assets/svg/producers';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import SignUpForm from './SignUpForm';
import styles from './style.module.scss';

const SignUp = () => {
  const { t } = useTranslation('signup');
  const [radioValue, setRadioValue] = useState('');
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const radios = [
    { name: t('fan'), value: '1' },
    { name: t('artists'), value: '2' },
    { name: t('producers'), value: '3' },
    { name: t('agents'), value: '4' },
  ];

  function renderRoleIcon(param) {
    switch (param) {
      case '1':
        return <FanIcon />;
      case '2':
        return <ArtistsIcon />;
      case '3':
        return <ProducersIcon />;
      case '4':
        return <AgentsIcon />;
      default:
        break;
    }
  }
  return (
    <div className='custom-container'>
      {!showSignUpForm ? (
        <div className={`join-us-wrapper`}>
          <h1 className='header-title'>{t('title')}</h1>
          <h4 className={styles.selectRoleText}>{t('selectRole')}</h4>
          <div className={styles.roleWrapper}>
            <Form className={`row ${styles.roleList}`}>
              {radios?.length &&
                radios.map((role, index) => {
                  return (
                    <div
                      key={`role-${index}`}
                      className='col-6 col-lg-3'
                      onClick={() => setRadioValue(role.value)}
                    >
                      <Form.Check
                        className={`${styles.roleItem} ${
                          radioValue === role.value ? styles.itemSelected : ''
                        }`}
                        type='radio'
                        id={role.value}
                      >
                        <Form.Check.Input
                          className='radio-aya'
                          type='radio'
                          name='roleGroup'
                          checked={radioValue === role.value}
                          onChange={() => {}}
                        />
                        <Form.Check.Label>
                          {renderRoleIcon(role.value)} <br />
                          <span className={styles.roleName}>{role.name}</span>
                        </Form.Check.Label>
                      </Form.Check>
                    </div>
                  );
                })}
            </Form>
            <div
              className={`row justify-content-lg-center ${styles.btnWrapper}`}
            >
              <div className='col-12 col-lg-6'>
                {radioValue ? (
                  <Button
                    className={`btn-aya purple`}
                    id='find-something'
                    onClick={() => setShowSignUpForm(true)}
                  >
                    {t('btnContinue')}
                  </Button>
                ) : (
                  <Button
                    disabled
                    className={`btn-aya ${styles.btnLight}`}
                    variant='light'
                    id='find-something'
                  >
                    {t('btnCreateAccount')}
                  </Button>
                )}

                {t('alreadyHaveAcc')}
                <Link href={`/singin`}>
                  <a> {t('login')}</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SignUpForm roleType={radioValue} />
      )}
    </div>
  );
};

export default SignUp;
