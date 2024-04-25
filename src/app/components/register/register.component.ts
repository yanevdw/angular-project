import { Component, inject } from '@angular/core';
import {
  NzFormDirective,
  NzFormControlComponent,
  NzFormItemComponent,
} from 'ng-zorro-antd/form';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DesktopGraphicsComponent } from '../desktop-graphics/desktop-graphics.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
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
  ],
})
export class RegisterComponent {
  router = inject(Router);
  authService = inject(AuthService);
  validateForm: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&]).{8,}/
          ),
          Validators.required,
        ],
      ],
      checkPassword: [
        '',
        [
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&]).{8,}/
          ),
          Validators.required,
          this.confirmationValidator,
        ],
      ],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      if (
        this.validateForm.get('name') &&
        this.validateForm.get('email') &&
        this.validateForm.get('password')
      ) {
        const name = this.validateForm.get('name')?.value!;
        const email = this.validateForm.get('email')?.value!;
        const password = this.validateForm.get('password')?.value!;

        this.authService.register(name, email, password);
      }
    }
    // else {
    //   Object.values(this.validateForm.controls).forEach((control) => {
    //     if (control.invalid) {
    //       control.markAsDirty();
    //       control.updateValueAndValidity({ onlySelf: true });
    //     }
    //   });
    // }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  handleLoginClick() {
    this.router.navigate(['login']);
  }
}
