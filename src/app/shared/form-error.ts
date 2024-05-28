import {ValidationErrors} from "@angular/forms";


export class FormErrorBuilder {
  private map: Map<string,string> = new Map<string, string>()

  constructor() {
  }

  setRequired(required: string): FormErrorBuilder {
    this.map.set('required', required)
    return this;
  }

  setEmail(email: string): FormErrorBuilder {
    this.map.set('email', email)
    return this;
  }

  setMinLength(minlength: string): FormErrorBuilder {
    this.map.set('minlength', minlength)
    return this;
  }
  build() {
    return this;
  }
  getErrorsMessages(errors: ValidationErrors | null | undefined): string[] | null{
    let res: string [] = []
    if (!errors) {
      return  null
    }
    for (const [key, message] of this.map.entries()) {
      if (errors[key]) {
        res.push(message);
      }
    }
    return res;
  }
}


