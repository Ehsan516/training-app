export type AuthUser = {
  id: string;
  email: string;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};