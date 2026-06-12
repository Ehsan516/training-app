import type { LoginRequest, LoginResponse } from "../types/auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string | undefined; //backend is
const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS ?? "false") === "true"; //fake repsonse for now

export async function loginApi(payload:LoginRequest): Promise<LoginResponse> {//returns response for email/password
    if(USE_MOCKS){
        await new Promise(r=> setTimeout(r, 1000)); //1 sec delay for fun
        if (payload.email==="fail.@test.com"){//just for throwing error
            throw new Error("Invalid email or password");
        }

        return{
            accessToken: "mock.jwt.token",
            user: {id: "ea_123", email: payload.email, name: "Ehsan"},
        };
    }

    if(!API_BASE) throw new Error("VITE_API_BASE_URL not configured");

    const res = await fetch(`${API_BASE}/auth/login`,{//calls backend api if not in mock
        method:"POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(payload),
    });

    if(!res.ok){
        const msg = await res.text();
        throw new Error (msg || "Login failed");//throws msg if error
    }
    return res.json();
}


