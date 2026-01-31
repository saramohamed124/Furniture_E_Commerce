export const NAME_REGEX = /^[\u0600-\u06FF\s]{4,15}|[a-zA-Z ]{4,15}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail+\.com|co|net{2,}$/;
export const PHONE_REGEX = /^01[0125][0-9]{8}$/;
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]){8,24}/;