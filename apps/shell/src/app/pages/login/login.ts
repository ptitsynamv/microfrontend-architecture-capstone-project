import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@fp/shared/auth';
import { USER_GROUP_LABELS, USER_GROUPS, UserGroup } from '@fp/shared/auth';

function notBlank(control: AbstractControl<string>): ValidationErrors | null {
  return control.value.trim() ? null : { blank: true };
}

@Component({
  selector: 'fp-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly _auth = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  protected readonly groupOptions = USER_GROUPS.map((group) => ({
    value: group,
    label: USER_GROUP_LABELS[group],
  }));

  protected readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [notBlank, Validators.maxLength(50)],
    }),
    group: new FormControl<UserGroup>('investor', { nonNullable: true }),
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, group } = this.form.getRawValue();
    this._auth.login({ name: name.trim(), group });

    const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl');
    void this._router.navigateByUrl(
      returnUrl?.startsWith('/') ? returnUrl : '/',
    );
  }
}
