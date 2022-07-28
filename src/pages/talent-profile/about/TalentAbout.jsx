import { PlayIcon } from 'assets/svg';
import clsx from 'clsx';
import { useActionOpenGallery } from 'components/hook/useContextSelector';
import { ImageLazyLoad } from 'components/own';
import { get } from 'lodash';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import { useState } from 'react';
import styles from './TalentAbout.module.scss';

const infoFields = [
  { name: 'experience', label: 'Experiences' },
  { name: 'award', label: 'Award' },
  { name: 'height', label: 'Height' },
  { name: 'shoesSize', label: 'Shoes Size' },
  { name: 'hairColor', label: 'Hair Color' },
  { name: 'eyeColor', label: 'Eye Color' },
  { name: 'tattoo', label: 'Tattoo' },
];

const otherFields = [
  { name: 'ethnicType', label: 'Ethnic Types' },
  { name: 'dob', label: 'D.o.B' },
  { name: 'language', label: 'Languages' },
  { name: 'training', label: 'Training' },
  { name: 'musicalInstrument', label: 'Musical Instrument' },
];

const TalentAbout = ({ data = {} }) => {
  const [openMore, setOpenMore] = useState(false);
  const { t } = useTranslation('talent');
  const openGallery = useActionOpenGallery();
  const totalVideo = useMemo(
    () => get(data, 'metadata', []).filter((_d) => _d.type === 'video').length,
    [data]
  );
  const totalImage = useMemo(
    () => get(data, 'metadata', []).filter((_d) => _d.type === 'image').length,
    [data]
  );
  return (
    <div className={styles.root}>
      <div className={styles.summary}>
        {`${totalImage} images`} {`• ${totalVideo} videos`}
      </div>
      <div className={clsx('mini-scrollbar', styles.metadata)}>
        <div className={styles.metadata__wrapper}>
          {data.metadata?.map((_d, index) =>
            _d.type === 'image' ? (
              <div
                key={index}
                className={styles.item}
                onClick={() => openGallery(true, data.metadata, index)}
              >
                <ImageLazyLoad
                  src={_d.src}
                  alt={_d.src}
                  width={260}
                  height={230}
                />
              </div>
            ) : (
              <div
                key={index}
                className={styles.item}
                onClick={() => openGallery(true, data.metadata, index)}
              >
                <div className={styles['play-button']}>
                  <PlayIcon />
                </div>
                <ImageLazyLoad
                  src={_d.src}
                  alt={_d.src}
                  width={260}
                  height={230}
                />
              </div>
            )
          )}
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.info}>
        {infoFields.map((_f, i) => (
          <div key={i} className={styles.info__item}>
            <div className={styles.info__value}>{get(data, [_f.name])}</div>
            <div className={styles.info__label}>{t(_f.label)}</div>
          </div>
        ))}
      </div>
      <div className={styles.row}>
        {otherFields.map((_f, i) => (
          <React.Fragment key={i}>
            <div className={styles.row__label}>{t(_f.label)}</div>
            <div className={styles.row__value}>{get(data, [_f.name])}</div>
          </React.Fragment>
        ))}
      </div>
      <div className={styles.line}></div>
      <div className={styles.title}>
        {t('About')} {data.name}
      </div>
      <div className={clsx(styles.about, { [styles.more]: openMore })}>
        {data.about}
      </div>
      <div
        className={styles['read-more']}
        onClick={() => setOpenMore(!openMore)}
      >
        {openMore ? 'Show less' : 'Read more'}
      </div>
    </div>
  );
};

export default TalentAbout;
