import { Component, OnInit } from '@angular/core';
import { PassengerService } from '../api/services/passenger.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register-passenger',
  templateUrl: './register-passenger.component.html',
  styleUrls: ['./register-passenger.component.css']
})
export class RegisterPassengerComponent implements OnInit {

  constructor(
    private passengerService: PassengerService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {

  }

  form = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(35)])],
    firstName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
    lastName: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
    isFemale: [true, Validators.required]
  })

  ngOnInit(): void {

  }

  checkPassenger(): void {
    const params = { email: this.form.get('email')?.value as string }

    this.passengerService.findPassenger(params).subscribe(
      this.login, e => {
        if (e.status != 404) {
          console.error(e)
        }
      })
  }

  register() {

    if (this.form.invalid) {
      return;
    }

    console.log("form values:", this.form.value)

    this.passengerService.registerPassenger({ body: this.form.value }).subscribe(this.login, console.error);
  }

  private login = () => {
    this.authService.loginUser({ email: this.form.get('email')?.value as string })
    this.router.navigate(['/search-flights'])
  }
  
}
