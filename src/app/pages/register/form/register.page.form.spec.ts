import { FormBuilder, FormGroup } from "@angular/forms";
import { RegisterPageForm } from "./register.page.form";
import { User } from "src/app/model/user/User";

describe('RegisterPageForm', () => {

let registerPageForm: RegisterPageForm;
let form: FormGroup;

beforeEach(() => {
registerPageForm = new RegisterPageForm(new FormBuilder());
form = registerPageForm.getForm();

})

it('should empty name be invalid', () => {
expect(form.get('name').valid).toBeFalsy();
})
it('should empty name be invalid', () => {
  expect(form.get('email').valid).toBeFalsy();
})
it('should empty name be invalid', () => {
  expect(form.get('password').valid).toBeFalsy();
})
it('should empty name be invalid', () => {
  expect(form.get('phone').valid).toBeFalsy();
  })
it('should empty name be invalid', () => {
  expect(form.get('address').get('street').valid).toBeFalsy();
  })
it('should empty name be invalid', () => {
  expect(form.get('address').get('number').valid).toBeFalsy();
  })
it('should empty name be invalid', () => {
  expect(form.get('address').get('neighborhood').valid).toBeFalsy();
    })
it('should empty name be invalid', () => {
  expect(form.get('address').get('zipCode').valid).toBeFalsy();
    })
it('should empty name be invalid', () => {
  expect(form.get('address').get('state').valid).toBeFalsy();
it('should empty name be invalid', () => {
  expect(form.get('address').get('city').valid).toBeFalsy();
      })
it('should invalid email be invalid', () => {
  form.get('email').setValue('invalidEmail');

  expect(form.get('email').valid).toBeFalsy();
})
it('should password less than 7 characters be invalid', () =>
  form.get('password').setValue('12345');

  expect(form.get('password').valid).toBeFalsy();
})
it('should password password different from repeat password be invalid', () => {
  form.get('password').setValue('anyPassword');
  form.get('repeatPassword').setValue('anotherPassword');

  expect(form.get('repeatPassword').valid).toBeFalsy();

  })
})
