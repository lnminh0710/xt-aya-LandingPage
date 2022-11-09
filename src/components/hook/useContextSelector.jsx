import { CommonContext } from 'context/Shell';
import { useContextSelector } from 'use-context-selector';

export const useActionOpenGallery = () =>
  useContextSelector(CommonContext, ({ openGallery }) => openGallery);

export const useUserInfo = () =>
  useContextSelector(CommonContext, ({ userInfo }) => userInfo);

export const useActionGetUserInfo = () =>
  useContextSelector(CommonContext, ({ getUserProfile }) => getUserProfile);
