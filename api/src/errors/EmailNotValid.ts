interface EmailNotValid extends Error {
    name: "EmailNotValid"
}

export function EmailNotValid(msg: string) {
    const error = new Error(msg) as EmailNotValid;
    error.name = "EmailNotValid";
    return error;
  }