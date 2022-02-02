import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_form! : FormGroup

  constructor(private router: Router,
     private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.login_form = this.formBuilder.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  login() {
    if(this.login_form.invalid){
      return
    }
    localStorage.setItem('user', JSON.stringify(this.login_form.value) )
    this.router.navigate(['members']);
  }

}
