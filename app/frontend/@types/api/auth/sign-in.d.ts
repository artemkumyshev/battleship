type AuthSignInParams = {
  email: string;
  password: string;
};

type AuthSignInSuccessResponse = {
  message: string;
  data: {
    user: {
      id: string;
      login: null | string;
      email: string;
    };
  };
};

type AuthSignInErrorResponse = {
  statusCode: number;
  message: string;
};
