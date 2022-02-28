export interface Login {
  email: string;
  password: string;
}

export interface UserInfo {
  _id: string;
  user_name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface AuthSlice {
  userInfo: UserInfo;
  token: string;
}
