export const PAYMENT_FORM_DATA = [
  {
    label: "Nome",
    id: "00",
    type: "text",
    required: true,
    fieldName: "name",
    pattern: "",
  },
  {
    label: "Número do Cartão",
    id: "01",
    type: "text",
    required: true,
    fieldName: "cardNumber",
    pattern: "",
  },
  {
    label: "Data de Vencimento",
    id: "02",
    type: "text",
    required: true,
    fieldName: "expirationDate",
    pattern: "",
  },
  {
    label: "CVV",
    id: "03",
    type: "text",
    required: true,
    fieldName: "cvv",
    pattern: "",
  },
  {
    label: "CPF",
    id: "04",
    type: "text",
    required: true,
    fieldName: "cpf",
    pattern: "",
  },
];

export const SIGN_UP_FORM_DATA = [
  {
    label: "Nome / Apelido",
    id: "10",
    type: "text",
    required: true,
    fieldName: "nickname",
    pattern: "",
  },
  {
    label: "Email",
    id: "11",
    type: "email",
    required: true,
    fieldName: "email",
    pattern:
      "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
  },
  {
    label: "Confirme Email",
    id: "12",
    type: "email",
    required: true,
    fieldName: "emailConfirm",
    pattern:
      "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
  },
  {
    label: "Senha",
    id: "13",
    type: "password",
    required: true,
    fieldName: "pwd",
    pattern: "",
  },
  {
    label: "Confirme Senha",
    id: "14",
    type: "password",
    required: true,
    fieldName: "pwdConfirm",
    pattern: "",
  },
];

export const SIGN_IN_FORM_DATA = [
  {
    label: "Email",
    id: "20",
    type: "email",
    required: true,
    fieldName: "email",
    pattern:
      "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
  },
  {
    label: "Senha",
    id: "21",
    type: "password",
    required: true,
    fieldName: "pwd",
    pattern: "",
  },
];
