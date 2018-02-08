import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  @ViewChild('form') signForm: NgForm

  constructor() { }
  onSignUp()
  {
    const e = this.signForm.value.email;
    const p = this.signForm.value.password;
  }
  ngOnInit() {
  }

}
