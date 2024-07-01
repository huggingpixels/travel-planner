export const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
export const validateName = (value: string) => value.match(/^[\w'\-,.][^0-9_!¡?÷?¿/\/\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i);
