import { CheckIcon, InfoIcon, LineIcon } from 'assets/svg';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import packageStyles from './packagePrice.module.scss';

const PackagePrice = ({ title, packageList }) => {
  const { t } = useTranslation('price');
  const [dynamicCol, setDynamicCol] = useState(0);
  useEffect(() => {
    setDynamicCol(12 / (packageList?.length + 1));
  }, [packageList]);
  return (
    <div className='package-wrapper'>
      <h2 className={packageStyles.packageTitle}>{title}</h2>
      <div
        className={`${packageStyles.packageWrapper} ${packageStyles.hiddenPhone}`}
      >
        <div className={`row ${packageStyles.packageRow}`}>
          <div className={`${packageStyles.column} col-${dynamicCol}`}>
            <div className={packageStyles.header}></div>
            {packageList?.length > 1 &&
              packageList[0].data?.length &&
              packageList[0].data.map((permissionItem, indexPermission) => {
                return (
                  <div
                    key={`permission_${indexPermission}`}
                    className={`${packageStyles.packageCell} ${
                      packageStyles.permissionName
                    } ${
                      indexPermission % 2
                        ? packageStyles.cEvent
                        : packageStyles.cOdd
                    }`}
                  >
                    {permissionItem.permissionName}{' '}
                    <span title={permissionItem.permissionDes}>
                      <InfoIcon />
                    </span>
                  </div>
                );
              })}
          </div>
          {packageList?.length &&
            packageList.map((packageItem, indexPackgage) => {
              return (
                <div
                  key={`package_${indexPackgage}`}
                  className={`${packageStyles.column} col-${dynamicCol} ${
                    packageItem.outStanding ? packageStyles.outStanding : ''
                  }`}
                >
                  <div className={packageStyles.header}>
                    <p className={packageStyles.packageName}>
                      {packageItem.name}
                    </p>
                    <p className={packageStyles.packagePrice}>
                      {packageItem.price}
                    </p>
                    <Link href={packageItem.urlJoin}>
                      <a className={`btn-aya purple ${packageStyles.btnJoin}`}>
                        {t('btnJoinNow')}
                      </a>
                    </Link>
                  </div>
                  {packageItem?.data?.length &&
                    packageItem.data.map((detailItem, indexDetail) => {
                      return (
                        <div
                          key={`detail_${indexDetail}`}
                          className={`${packageStyles.packageCell} ${
                            indexDetail % 2
                              ? packageStyles.cEvent
                              : packageStyles.cOdd
                          } ${
                            indexDetail === packageItem.data.length - 1
                              ? packageStyles.cLast
                              : ''
                          }`}
                        >
                          {detailItem.isCheck ? (
                            <CheckIcon />
                          ) : detailItem?.content ? (
                            detailItem.content
                          ) : (
                            <LineIcon />
                          )}
                        </div>
                      );
                    })}
                  <div></div>
                </div>
              );
            })}
        </div>
      </div>
      <div
        className={`${packageStyles.packageWrapper} ${packageStyles.hiddenTablet}`}
      >
        <div className='row'>
          {packageList?.length &&
            packageList.map((packageItem, indexPackgage) => {
              return (
                <div
                  key={`permission_${indexPackgage}`}
                  className='col-12 col-sm-6'
                >
                  <div
                    className={` ${packageStyles.column} ${
                      packageItem.outStanding ? packageStyles.outStanding : ''
                    }`}
                  >
                    <div className={packageStyles.header}>
                      <p className={packageStyles.packageName}>
                        {packageItem.name}
                      </p>
                      <p className={packageStyles.packagePrice}>
                        {packageItem.price}
                      </p>
                      <Link href={packageItem.urlJoin}>
                        <a
                          className={`btn-aya purple ${packageStyles.btnJoin}`}
                        >
                          {t('btnJoinNow')}
                        </a>
                      </Link>
                    </div>
                    <hr className={packageStyles.hrClass} />
                    {packageItem?.data?.length &&
                      packageItem.data.map((detailItem, indexDetail) => {
                        console.log(detailItem);
                        return detailItem?.isCheck || detailItem?.content ? (
                          <div
                            key={`detail_${indexDetail}`}
                            className={packageStyles.packageCell}
                          >
                            <div className={packageStyles.checkIcon}>
                              {detailItem.isCheck ? (
                                <CheckIcon />
                              ) : detailItem?.content ? (
                                detailItem.content
                              ) : (
                                <LineIcon />
                              )}
                            </div>
                            <div className={packageStyles.des}>
                              {detailItem?.permissionName}
                            </div>
                            <div
                              className={packageStyles.info}
                              title={detailItem.permissionDes}
                            >
                              <InfoIcon />
                            </div>
                          </div>
                        ) : (
                          ''
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PackagePrice;
