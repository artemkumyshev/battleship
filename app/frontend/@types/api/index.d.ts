type OptionalPartial<T, K extends keyof T> = Partial<T> & Omit<T, K>;
