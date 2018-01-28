import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators , FormArray} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  genders=['male', 'female'];
  inputForm: FormGroup;
  bannedEmails = ['foad@yahoo.com', 'foad@gmail.com'];

  ngOnInit(): void {
    this.inputForm = new FormGroup({
      'info': new FormGroup({
        'username': new FormControl(null, Validators.required, this.bannedUsername),
        'email': new FormControl(null, [Validators.required, Validators.email, this.bannedEmailCheck.bind(this)])
      }),
      'gender': new FormControl('male'),
      'colors': new FormArray([])
    });
    // this.inputForm.valueChanges.subscribe(
    //   (value) => {console.log(value)}
    // );
    this.inputForm.statusChanges.subscribe(
      (status) => {console.log(status)}
    );
    this.inputForm.patchValue({
      'info': {
        'username': 'ugg'
      }
    });
  }

  onSubmit() {
    console.log(this.inputForm);
  }

  onAddColorsClick(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.inputForm.get('colors')).push(control);
  }

  bannedEmailCheck(control: FormControl): {[e: string]: boolean}{
    if(this.bannedEmails.indexOf(control.value) !== -1){
      return {'isBannedEmail': true};
    }
    return null;
  }

  bannedUsername(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === "foad"){
          resolve({'usernameIsBanned': true});
        } else{
          resolve(null);
        }
      },2000);
    });
    return promise;
  }

}
