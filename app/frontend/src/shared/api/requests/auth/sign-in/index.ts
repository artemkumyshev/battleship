import { AxiosRequestConfig } from "axios";

import { api } from "@/api/instance";

export interface RequestAuthSignInParams {
  params: AuthSignInParams;
  config?: AxiosRequestConfig;
}

export const requestAuthSignIn = ({ params, config }: RequestAuthSignInParams) =>
  api.post<AuthSignInSuccessResponse>("/auth/sign-in", { ...params, ...config });
