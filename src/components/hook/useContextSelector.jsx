import { CommonContext } from 'context/Shell';
import { useContextSelector } from 'use-context-selector';

export const useActionOpenGallery = () =>
  useContextSelector(CommonContext, ({ openGallery }) => openGallery);
