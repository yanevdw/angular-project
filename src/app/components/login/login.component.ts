import { Component, inject, OnDestroy } from '@angular/core';
import {
  NzFormControlComponent,
  NzFormDirective,
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
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

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
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  router = inject(Router);
  authService = inject(AuthService);
  loginSubscription: Subscription | undefined;
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: NonNullableFormBuilder) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      if (document.getElementById('login-success')) {
        document.getElementById('login-success')!.style.display = 'block';
      }
      this.loginSubscription = this.authService
        .login(
          this.validateForm.get('email')?.value!,
          this.validateForm.get('password')?.value!,
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/home']);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }
}
