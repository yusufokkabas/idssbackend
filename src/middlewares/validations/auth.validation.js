const joi = require("joi");
const APIError = require("../../utils/errors");

class authValidation {
  constructor() {}
  static register = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi.string().trim().min(2).max(50).required().messages({
            "string.base": "�sim alan� normal metin olmal�d�r!",
            "string.empty": "�sim alan� bo� olamaz!",
            "string.min": "�sim en az 2 karakterden olu�mal�d�r!",
            "string.max": "�sim en fazla 50 karakterden olu�mal�d�r!",
            "string.required": "�sim alan� zorunludur!",
          }),
          lastname: joi.string().trim().min(2).max(50).required().messages({
            "string.base": "Soyad alan� normal metin olmal�d�r!",
            "string.empty": "Soyad alan� bo� olamaz!",
            "string.min": "Soyad en az 2 karakterden olu�mal�d�r!",
            "string.max": "Soyad en fazla 50 karakterden olu�mal�d�r!",
            "string.required": "Soyad alan� zorunludur!",
          }),
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
              "string.base": "Email alan� normal metin olmal�d�r!",
              "string.empty": "Email alan� bo� olamaz!",
              "string.min": "Email en az 3 karakterden olu�mal�d�r!",
              "string.email": "L�tfen ge�erli bir email adresi giriniz!",
              "string.max": "Email en fazla 50 karakterden olu�mal�d�r!",
              "string.required": "Email alan� zorunludur!",
            }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "�ifre alan� normal metin olmal�d�r!",
            "string.empty": "�ifre alan� bo� olamaz!",
            "string.min": "�ifre en az 6 karakterden olu�mal�d�r!",
            "string.max": "�ifre en fazla 36 karakterden olu�mal�d�r!",
            "string.required": "�ifre alan� zorunludur!",
          }),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error?.details[0].message)
        throw new APIError(error.details[0].message, 400);
      else throw new APIError("L�tfen do�rulama kurallar�na uyun!", 400);
    }
    next();
  };

  static login = async (req, res, next) => {
    try {
      await joi
        .object({
          email: joi
            .string()
            .email()
            .trim()
            .min(3)
            .max(100)
            //.required()
            .messages({
              "string.base": "Email alan� normal metin olmal�d�r!",
              "string.empty": "Email alan� bo� olamaz!",
              "string.min": "Email en az 3 karakterden olu�mal�d�r!",
              "string.email": "L�tfen ge�erli bir email adresi giriniz!",
              "string.max": "Email en fazla 50 karakterden olu�mal�d�r!",
              //"string.required": "Email field is required!",
            }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "�ifre alan� normal metin olmal�d�r!",
            "string.empty": "�ifre alan� bo� olamaz!",
            "string.min": "�ifre en az 6 karakterden olu�mal�d�r!",
            "string.max": "�ifre en fazla 36 karakterden olu�mal�d�r!",
            "string.required": "�ifre alan� zorunludur!",
          }),
          phone: joi
            .string()
            .trim()
            .strict()
            .regex(/^[0-9]{10}$/)
            .messages({
              "string.pattern.base": `Telefon numaras� 10 haneden olu�mal�d�r!`,
            }),
        })
        .validateAsync(req.body);
    } catch (error) {
      if (error.details && error?.details[0].message)
        throw new APIError(error.details[0].message, 400);
      else throw new APIError("L�tfen do�rulama kurallar�na uyun!", 400);
    }
    next();
  };
}

module.exports = authValidation;
