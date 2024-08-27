interface RoleNotValid extends Error {
    name: "RoleNotValid"
}

export function RoleNotValid(msg: string) {
    const error = new Error(msg) as RoleNotValid;
    error.name = "RoleNotValid";
    return error;
  }