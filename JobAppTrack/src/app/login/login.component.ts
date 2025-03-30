import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService } from '../_services/settings.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,SweetAlert2Module],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  buttonClick:boolean =false;
  loginForm!: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder, private setSer: SettingsService) { }
  ngOnInit(): void {
    this.form_load();
  }
  form_load() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['']
    });
  }
  onLogin() {
    this.buttonClick = true;
    const isFormValid = this.loginForm.valid;
    if (!isFormValid) {
      this.buttonClick = false;
      return;
    }
    this.setSer.loginForm(this.loginForm.value).subscribe((res: any) => {
      if (res.status == true) {
        const timerProgressBar: boolean = false
        Swal.fire({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          icon: 'success',
          timerProgressBar,
          timer: 5000,
          title: 'Signed in successfully'
        })
        this.router.navigate(['/dashboard']);
        sessionStorage.setItem('username', this.loginForm.value.username);
        sessionStorage.setItem('accessToken', res.accessToken);
      } else {
        this.buttonClick = false;
        Swal.fire({
          title: 'Error!',
          text: 'Invalid Username OR Password',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    });
  }
  test(){
    
  }
}
