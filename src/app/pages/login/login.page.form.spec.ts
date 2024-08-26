import { FormBuilder, FormGroup } from "@angular/forms";
import { LoginPageForm } from "./login.page.form";

describe('LoginPageForm', () => {
  let loginPageForm: LoginPageForm; // Mengubah nama variabel ke camelCase sesuai konvensi
  let form: FormGroup;

  beforeEach(() => {
    loginPageForm = new LoginPageForm(new FormBuilder()); // Menggunakan variabel yang sudah dikoreksi
    form = loginPageForm.createForm();
  });

  it('should create login form empty', () => {
    expect(form).not.toBeNull();
    expect(form.get('email')).not.toBeNull();
    expect(form.get('email')?.value).toEqual(""); // Memperbaiki kesalahan penulisan dan menambahkan optional chaining untuk keamanan
    expect(form.get('password')).not.toBeNull();
    expect(form.get('password')?.value).toEqual(""); // Memperbaiki kesalahan penulisan dan menambahkan optional chaining
    expect(form.get('password')?.valid).toBeFalsy(); // Menambahkan optional chaining untuk keamanan
  });

  it('should have email invalid if email is not valid', () => {
    form.get('email')?.setValue('invalid email'); // Menambahkan optional chaining untuk keamanan

    expect(form.get('email')?.valid).toBeFalsy(); // Menambahkan optional chaining untuk keamanan
  });

  it('should have email valid if email is valid', () => {
    form.get('email')?.setValue('valid@email.com'); // Menambahkan optional chaining untuk keamanan

    expect(form.get('email')?.valid).toBeTruthy(); // Menambahkan optional chaining untuk keamanan
  });

  it('should have a valid form', () => {
    form.get('email')?.setValue('valid@email.com'); // Menambahkan optional chaining untuk keamanan
    form.get('password')?.setValue("anyPAssword"); // Menambahkan optional chaining untuk keamanan

    expect(form.valid).toBeTruthy();
  });
});
