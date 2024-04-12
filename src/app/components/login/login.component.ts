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
    userName: FormControl<string>;
    password: FormControl<string>;
    // Might use later
    // remember: FormControl<boolean>;
  }> = this.fb.group({
    // I will add more validation as I progress, this is just to setup the auth.
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    // Might use later
    // remember: [true],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.authService.setIsLoggedIn(true);
      this.router.navigate(['home']);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleRegisterClick() {
    this.router.navigate(['register']);
  }

  constructor(private fb: NonNullableFormBuilder) {}
}
