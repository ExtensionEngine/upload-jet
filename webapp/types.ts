export type UserData = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  githubId: number;
  email: string;
  avatarUrl: string;
  role: string;
};

export type RequestOptions = RequestInit & {
  method:
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'HEAD'
    | 'OPTIONS'
    | 'CONNECT'
    | 'TRACE';
};
