import Toast from 'react-native-toast-message';

class ToastService {
  success(message: string) {
    Toast.show({
      type: 'success',
      text1: message,
    });
  }
  error(message: string) {
    Toast.show({
      type: 'error',
      text1: message,
    });
  }
  someError() {
    Toast.show({
      type: 'error',
      text1: 'Something went wrong',
    });
  }
}

export const toastService = new ToastService();
