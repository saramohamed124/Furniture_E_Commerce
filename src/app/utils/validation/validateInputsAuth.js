import { EMAIL_REGEX, NAME_REGEX, PHONE_REGEX, PWD_REGEX } from "@/app/constant/regex"

export const validateInputsAuth = (field, value) => {
    const patterns = {
        firstName: NAME_REGEX,
        lastName: NAME_REGEX,
        email:EMAIL_REGEX,
        phoneNumber:PHONE_REGEX,
        password: PWD_REGEX,
    }
    return patterns[field].test(value);
}