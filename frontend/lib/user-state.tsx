import React, { createContext, useContext, useEffect, useState } from 'react';

import { User } from '@lib/payloads';
import { getUser, logIn, logOut } from '@lib/api';

export type UserState = User | null | undefined;

const UserContext = createContext<
  [UserState, React.Dispatch<React.SetStateAction<UserState>>]
>([
  undefined,
  () => {
    return;
  },
]);
UserContext.displayName = 'UserContext';

export const UserProvider: React.FC = ({ children }) => {
  const userState = useState<UserState>(undefined);

  useEffect(() => {
    void getUser()
      .then((v) => userState[1](v))
      .catch((e: unknown) => console.error(e));
  }, []);

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};

type UserController = Readonly<{
  current: UserState;
  logIn: (email: string, password: string) => Promise<User>;
  logOut: () => Promise<void>;
}>;

export function useUserController(): UserController {
  const [user, setUser] = useContext(UserContext);
  return {
    get current() {
      return user;
    },
    async logIn(email: string, password: string) {
      const val = await logIn(email, password);
      setUser(val);
      return val;
    },
    async logOut() {
      try {
        await logOut();
      } catch (e) {
        console.error(e);
      } finally {
        setUser(null);
      }
    },
  };
}
