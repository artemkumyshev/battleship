import { createDomain } from "effector";

const auth = createDomain();

export const setAuth = auth.createEvent<boolean>();
export const setEmail = auth.createEvent<string>();

export const $auth = auth.createStore(false).on(setAuth, (_, value) => value);
export const $email = auth.createStore<string>("").on(setEmail, (_, value) => value);
