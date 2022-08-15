import NewsCardVertical from '../newsCardVertical/NewsCardVertical';
import styles from './style.module.scss';

const OtherNews = ({ otherNewsList, t }) => {
  return (
    <div className={`row ${styles.othersWrapper}`}>
      {otherNewsList?.length &&
        otherNewsList.map((item, index) => {
          return (
            <div
              key={`other-${index}`}
              className={`col-12 col-sm-6 col-md-4 ${styles.otherItem}`}
            >
              <NewsCardVertical newsItem={item} t={t} />
            </div>
          );
        })}
    </div>
  );
};

export default OtherNews;
