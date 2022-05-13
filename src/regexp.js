export const REGEXP_URL_CHECK = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi;
export const REGEXP_ESCAPE_SPECIALS = /[-[\]{}()*+?.,\\^$|#\s]/g;
export const REGEXP_EMAIL_CHECK = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;