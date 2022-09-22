export interface Username{
    userId: string,
    username: string,
  
}

export interface UserInfo {
    user: Username
    access_token: string,
    tokenType: string,

}

export interface LoginResponse {
    status: boolean,
    message: string,
  }

export interface ExistsUserResponse{
    exists: boolean;
  }