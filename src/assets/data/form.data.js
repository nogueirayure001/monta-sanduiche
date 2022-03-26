export const PAYMENT_FORM_DATA = [
  {
    label: "Nome",
    id: "00",
    type: "text",
    required: true,
    fieldName: "name",
    pattern: "^[a-zA-Z ]+$",
    errorMessage: "Entre seu nome completo (sem acentos)",
    extraValidityCheck: null,
  },
  {
    label: "Número do Cartão",
    id: "01",
    type: "text",
    required: true,
    fieldName: "cardNumber",
    pattern: "^\\d{12}$",
    errorMessage: "Apenas dígitos (12)",
    extraValidityCheck: null,
  },
  {
    label: "Data de Vencimento",
    id: "02",
    type: "text",
    required: true,
    fieldName: "expirationDate",
    pattern: "^\\d{2}/\\d{2}/\\d{4}$",
    errorMessage: "DD/MM/AAAA",
    extraValidityCheck: (e) => {
      const expirationDate = e.target.value;
      const datePieces = expirationDate.split("/");
      const date = new Date(
        `${datePieces[1]}-${datePieces[0]}-${datePieces[2]} 23:59:59`
      );

      return date - Date.now() > 0;
    },
  },
  {
    label: "CVV",
    id: "03",
    type: "text",
    required: true,
    fieldName: "cvv",
    pattern: "^\\d{3}$",
    errorMessage: "Apenas dígitos (3)",
    extraValidityCheck: null,
  },
  {
    label: "CPF",
    id: "04",
    type: "text",
    required: true,
    fieldName: "cpf",
    pattern: "^\\d{11}$",
    errorMessage: "Apenas digitos (11)",
    extraValidityCheck: null,
  },
];

export const SIGN_UP_FORM_DATA = [
  {
    label: "Nome / Apelido",
    id: "10",
    type: "text",
    required: true,
    fieldName: "nickname",
    pattern: ".+",
    errorMessage: "Campo necessário",
    extraValidityCheck: null,
  },
  {
    label: "Email",
    id: "11",
    type: "email",
    required: true,
    fieldName: "email",
    pattern:
      "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
    errorMessage: "Digite um email válido",
    extraValidityCheck: null,
  },
  {
    label: "Confirme Email",
    id: "12",
    type: "email",
    required: true,
    fieldName: "emailConfirm",
    pattern:
      "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
    errorMessage: "Digite um email válido",
    extraValidityCheck: null,
  },
  {
    label: "Senha",
    id: "13",
    type: "password",
    required: true,
    fieldName: "pwd",
    pattern: "^\\S{6,}$",
    errorMessage: "6 ou mais caracteres não nulos",
    extraValidityCheck: null,
  },
  {
    label: "Confirme Senha",
    id: "14",
    type: "password",
    required: true,
    fieldName: "pwdConfirm",
    pattern: "^\\S{6,}$",
    errorMessage: "6 ou mais caracteres não nulos",
    extraValidityCheck: null,
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
    errorMessage: "Digite um email válido",
    extraValidityCheck: null,
  },
  {
    label: "Senha",
    id: "21",
    type: "password",
    required: true,
    fieldName: "pwd",
    pattern: "^\\S{6,}$",
    errorMessage: "6 ou mais caracteres não nulos",
    extraValidityCheck: null,
  },
];
