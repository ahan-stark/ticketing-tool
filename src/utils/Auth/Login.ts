export interface Login {
  userName: string;
  password: string;
  id?: string;
}

export const checkIfValidUser = (
  loginDetails: Login,
  user: Login | undefined
): boolean => {
  return  user ? user.userName === loginDetails.userName &&
      user.password === loginDetails.password: false;
};
