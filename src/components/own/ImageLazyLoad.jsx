import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { includes } from 'lodash';

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#fff" offset="0%"/>
      <stop stop-color="#E8E8E8" offset="20%"/>
      <stop stop-color="#fff" offset="40%"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#EFEEF0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const isMobileConnection = () => {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  return (
    connection?.type === 'cellular' ||
    connection?.effectiveType === 'slow-2g' ||
    connection?.effectiveType === '2g' ||
    connection?.effectiveType === '3g' ||
    connection?.saveData === true
  );
};

const defer = (callback) => {
  // Check if we can use requestIdleCallback
  if (window.requestIdleCallback) {
    const handle = window.requestIdleCallback(callback);
    return () => window.cancelIdleCallback(handle);
  }
  // Just defer using setTimeout with some random delay otherwise
  const handle = setTimeout(callback, 2345 + Math.random() * 1000);
  return () => clearTimeout(handle);
};

const ImageLazyLoad = ({
  alt,
  height,
  src,
  width,
  priority,
  loading: imageLoading,
  srcError = '/images/post-default.webp',
  ...rest
}) => {
  const [loading, setLoading] = useState(imageLoading);

  useEffect(() => {
    // Skip if image is already eager or has priority (disables lazy loading)
    if (imageLoading === 'eager' || priority) {
      return;
    }

    if (!isMobileConnection()) {
      let clearDefer;
      // Set loading to eager if all resources of document are loaded, but defer it a bit
      const onLoad = () => {
        clearDefer = defer(() => setLoading('eager'));
      };
      window.addEventListener('load', onLoad);
      return () => {
        // Clean up the load event listener and an eventual defer
        window.removeEventListener('load', onLoad);
        if (clearDefer) {
          clearDefer();
        }
      };
    }
  }, [imageLoading, priority]);

  // return <NextImage loading={loading} {...props} />;
  const lazyRoot = useRef(null);
  return (
    <div>
      {src && (includes(src, 'http') || src?.startsWith('/')) ? (
        <Image
          {...rest}
          loading={loading}
          lazyRoot={lazyRoot}
          src={src}
          width={width}
          height={height}
          layout='responsive'
          objectFit='cover'
          alt={alt}
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(width, height)
          )}`}
          placeholder='blur'
        />
      ) : (
        <Image
          {...rest}
          loading={loading}
          lazyRoot={lazyRoot}
          src={srcError}
          width={width}
          height={height}
          layout='responsive'
          objectFit='cover'
          alt={alt}
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(width, height)
          )}`}
          placeholder='blur'
        />
      )}
    </div>
  );
};

export default ImageLazyLoad;
