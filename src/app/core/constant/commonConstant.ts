export class commonConstant {
  pattern = {
    emailValidationPatternForSignIn: /^(([^<>()[\]\\.,;:@"]+[a-zA-Z\-0-9](\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})[\s]{0,})$/,
    acceptOnlyAlphabets: '^[a-zA-Z\/\s\'-().\-]+(\\s[a-zA-Z\/\s\'-().]+)*$',
    addressValidationPattern: '^[-a-zA-Z0-9,.\'@#&()"/]+(\\s+[-a-zA-Z0-9.,\'@#&()"/]+)*$',
    phoneNumberPattern: '^\\d{3}[\\-]\\d{3}[\\-]\\d{4}$',
    zipcodeValidationPattern: /^((\d{5}-\d{4})|(\d{5})|([A-Z]\d[A-Z]\s\d[A-Z]\d))$/,
    passwordValidationPattern: /^(?=^.{7,20}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,



  }
}