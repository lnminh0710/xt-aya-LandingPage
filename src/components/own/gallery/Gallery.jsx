/* eslint-disable @next/next/no-img-element */
import { memo } from 'react';
import { checkProperties } from 'utils/common';
import Carousel, { Modal, ModalGateway, ViewType } from 'react-images';
import styles from './Gallery.module.scss';

const ModalImage = (props) => {
  const { data } = props;
  if (data.type === 'video') {
    return (
      <div className={styles.image__wrapper} data-testid='modal-video'>
        <video controls>
          <source src='/videos/AyaTeaser.mp4' />
        </video>
      </div>
    );
  }
  return (
    <div className={styles.image__wrapper} data-testid='modal-image'>
      {/* <ImageLazyLoad
        className={styles.image__tag}
        src={data.src}
        alt={data.src}
        width={100}
        height={100}
      /> */}
      <img className={styles.image__tag} src={data.src} alt={data.src} />
    </div>
  );
};

const Gallery = ({ index, show, onClose, data }) => {
  return (
    <ModalGateway>
      {show ? (
        <Modal onClose={() => onClose()}>
          <Carousel
            components={{
              // @ts-expect-error
              View: ModalImage,
            }}
            currentIndex={index}
            views={data}
          />
        </Modal>
      ) : null}
    </ModalGateway>
  );
};

export default memo(Gallery, checkProperties);
