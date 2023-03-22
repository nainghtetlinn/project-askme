import Joi from "joi";

export const validateForm = (username: string, password: string) => {
  return Joi.object({
    username: Joi.string()
      .min(10)
      .required()
      .error((errors: any) => {
        errors.forEach((err: Joi.ErrorReport) => {
          switch (err.code) {
            case "string.min":
              err.message = `${err.path} should have at least ${err.local.limit} characters!`;
              break;
            case "string.empty":
              err.message = `${err.path} required!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    password: Joi.string()
      .min(6)
      .required()
      .error((errors: any) => {
        errors.forEach((err: Joi.ErrorReport) => {
          switch (err.code) {
            case "string.min":
              err.message = `${err.path} should have at least ${err.local.limit} characters!`;
              break;
            case "string.empty":
              err.message = `${err.path} required!`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  }).validate({ username, password });
};
