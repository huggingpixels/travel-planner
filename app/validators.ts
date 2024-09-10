export const validateEmail = (value: string) =>
  value.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
export const validateName = (value: string) =>
  value.match(/^[\w'\-,.][^0-9_!¡?÷?¿/\/\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i);
