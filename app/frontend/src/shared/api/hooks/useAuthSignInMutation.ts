import { useMutation } from "@tanstack/react-query";

import { requestAuthSignIn } from "@/api/requests/auth/sign-in";

export const useAuthSignInMutation = (settings?: RequestMutationSettings<typeof requestAuthSignIn>) =>
  useMutation(["/auth/sign-in"], (params: RequestParams<AuthSignInParams>) =>
    requestAuthSignIn({
      params,
      ...(settings?.config && { config: settings.config, params }),
    })
  );
