export interface Login {
  userName: string;
  password: string;
  id?: string;
}

export const checkIfValidUser = (
  loginDetails: Login,
  allUSers: Login[]
): boolean => {
  const isValidUser: boolean = allUSers.some(
    (user: Login) =>
      user.userName === loginDetails.userName &&
      user.password === loginDetails.password
  );
  return isValidUser;
};
