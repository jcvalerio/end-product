import { IUser, KSAuth } from '@kleeen/auth';
import { useEffect, useState } from 'react';

const useUserInfo = (): { userInfo: IUser } => {
  const [userInfo, setUser] = useState<IUser>();

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      try {
        const userAux = await KSAuth.currentAuthenticatedUser();
        setUser(userAux);
      } catch (err) {
        setUser(undefined);
      }
    };
    getUser();
  }, []);

  return { userInfo };
};

export default useUserInfo;
