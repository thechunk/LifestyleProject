import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: 1000 * 3600 * 24,
	enableCache: true,
});
global.storage = storage;

const AUTH_TOKEN_KEY = 'authtoken';
const TERMS_AGREE_KEY = 'termsagree';

export const getAuthToken = () => {
  return storage.load({
    key: AUTH_TOKEN_KEY,
  });
}
export const setAuthToken = (token) => {
  return storage.save({
    key: AUTH_TOKEN_KEY,
    data: token,
  });
}

export const getTermsAgree = () => {
  return storage.load({
    key: TERMS_AGREE_KEY,
  });
}
export const setTermsAgree = (agreed) => {
  return storage.save({
    key: TERMS_AGREE_KEY,
    data: !!agreed,
  });
}

export const purgeStore = () => {
  return Promise.all([
    storage.remove({
      key: AUTH_TOKEN_KEY,
    }),
    storage.remove({
      key: TERMS_AGREE_KEY,
    }),
  ]);
}
