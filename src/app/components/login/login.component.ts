import { Component, inject } from '@angular/core';
import {
  NzFormDirective,
  NzFormControlComponent,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';
import {
  NzInputDirective,
  NzInputGroupComponent,
  NzInputModule,
} from 'ng-zorro-antd/input';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DesktopGraphicsComponent } from '../desktop-graphics/desktop-graphics.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NzFormDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzInputDirective,
    NzInputGroupComponent,
    NzColDirective,
    NzRowDirective,
    NzButtonComponent,
    ReactiveFormsModule,
    DesktopGraphicsComponent,
    NzInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      if (document.getElementById('login-success')) {
        document.getElementById('login-success')!.style.display = 'block';
      }
      this.authService.login(
        this.validateForm.get('email')?.value!,
        this.validateForm.get('password')?.value!
      );
    }
    // else {
    // Object.values(this.validateForm.controls).forEach((control) => {
    //   if (control.invalid) {
    //     control.markAsDirty();
    //     control.updateValueAndValidity({ onlySelf: true });
    //   }
    // });
    // }
  }

  handleRegisterClick() {
    this.router.navigate(['register']);
  }

  constructor(private fb: NonNullableFormBuilder) {}
}
