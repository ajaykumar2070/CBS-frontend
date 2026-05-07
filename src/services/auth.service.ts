import { api } from "@/lib/api"

interface LoginData {
    email: string,
    password: string
}

const MOCK_USERS = [
  {
    id:"principal-1",
    email: "admin@gmail.com",
    password: "admin123",
    role: "PRINCIPAL",
    token: "principal-auth-token-dummy-14567",
  },

  {
    id:"teacher-1",
    email: "teacher@gmail.com",
    password: "teacher123",
    role: "TEACHER",
    token: "teacher-auth-token-dummy-23456",
  },
];

export const loginUser = async (
  data: LoginData
) => {
  // simulate api delay
  await new Promise((res) => setTimeout(res, 1000));

  const user = MOCK_USERS.find(
    (user) =>
      user.email === data.email &&
      user.password === data.password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return {
    id:user.id,
    token: user.token,
    role: user.role,
    email: user.email,
  };
};

export const logout = async()=>{
    // const res = await api.post('api/v1/auth/logout')
    // return res.data

    // Note: i am using mock data.
    return true;
}