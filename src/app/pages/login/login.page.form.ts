import { FormBuilder, FormGroup } from "@angular/forms";

export  class LoginPageForm {
  private formBuilder: FormBuilder;
  constructor(formbuilder: FormBuilder){
    this.formBuilder = formbuilder;
  }
  createForm():FormGroup{
    return this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }
}
