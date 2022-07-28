import clsx from 'clsx';
import { ImageLazyLoad } from 'components/own';
import styles from './TalentCredit.module.scss';
import React from 'react';
import { DotIcon } from 'assets/svg';
import { useActionOpenGallery } from 'components/hook/useContextSelector';

const TalentCredit = ({ data }) => {
  const openGallery = useActionOpenGallery();
  return (
    <>
      <div className={styles.root}>
        <div className={styles.title}>Credit</div>
        {data.credit?.images?.length && (
          <>
            <div className={clsx('mini-scrollbar', styles.metadata)}>
              <div className={styles.metadata__wrapper}>
                {data.credit?.images?.map((_d, index) => (
                  <div
                    key={index}
                    className={styles.item}
                    onClick={() =>
                      openGallery(true, data.credit?.images, index)
                    }
                  >
                    <ImageLazyLoad
                      src={_d.src}
                      alt={_d.src}
                      width={173}
                      height={259}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {data.credit?.timeline?.map(({ year, actions }, i) => (
          <React.Fragment key={i}>
            <div className={styles['action-title']}>{year}</div>
            {actions.map((_a, index) => (
              <div className={styles.action} key={index}>
                <DotIcon color='#000' />
                {_a}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default TalentCredit;
