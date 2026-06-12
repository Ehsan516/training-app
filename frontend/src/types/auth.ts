export interface LoginRequest{
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string; //web token
    user: {id:string; email: string; name?: string | null};//in case name not added
}