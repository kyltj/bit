
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserData } from '../../models/userData';
import { DisplayOptions } from './../../models/displayOptions';
import { BaseAuthService } from '../../services/base-auth.service';
import { NavigationStateService } from './../../services/navigation-state.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../../../node_modules/bootstrap/dist/css/bootstrap.css', './user.component.css']
})
export class UserComponent {
  currentUser: UserData;
  errorMessage: string;
  userForm: FormGroup;
  displayOptions = new DisplayOptions({});
  interestsMas: string[] = ['TV', 'Dinnerware', 'Food', 'Jewellery', 'Music', 'Cosmetics', 'Men s', 'Women s', 'Shoes'];
  placesMas: string[] = ['Hreschatyk', 'Nezalezhnosti', 'Osokorky', 'Lisova', 'Academmistechko', 'Heroiv', 'Boryspilska'];
  countriesMas: any[] = [{ id: 'Ukraine' }];
  citiesMas: any[] = [{ id: 'Kyiv', countryId: 'Ukraine' }];
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private baseAuthService: BaseAuthService,
    private navigationStateService: NavigationStateService) {
    this.buildForm();
    this.navigationStateService.changeState('Settings', 'settings');
    this.baseAuthService.loadData().then(data => {
      this.displayOptions = data.displayOptions;
      if (data.user) {
        const user = JSON.parse(data.user);
        this.updateDataUser(user);
        this.updateForm();
      } else {
        this.updateDataUser(null);
      }
    });
  }
  saveUser() {
    this.baseAuthService.saveUser(JSON.stringify(this.currentUser));
  }
  updateDataUser(data: UserData) {
    this.currentUser = new UserData('', '', 'no', 'no', '', '', [], []);
    if (data) {
      this.currentUser.email = (data.email) ? data.email : '';
      this.currentUser.phone = (data.phone) ? data.phone : '';
      this.currentUser.country = (data.country) ? data.country : '';
      this.currentUser.city = (data.city) ? data.city : '';
      this.currentUser.age = (data.age) ? data.age : '';
      this.currentUser.sex = (data.sex) ? data.sex : '';
      this.currentUser.interests = ((data.interests instanceof Array)) ? data.interests : [];
      this.currentUser.places = ((data.places instanceof Array)) ? data.places : [];
    }
  }
  updateForm() {
    this.userForm = this.fb.group({
      email: [this.currentUser.email, Validators.required],
      phone: [this.currentUser.phone, Validators.required],
      country: [this.currentUser.country, Validators.required],
      city: [this.currentUser.city, Validators.required],
      age: [this.currentUser.age, Validators.required],
      sex: [this.currentUser.sex, Validators.required],
    });
  }


  public checkError(element: string, errorType: string) {
    return this.userForm.get(element).hasError(errorType) &&
      this.userForm.get(element).touched
  }

  private buildForm() {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      age: ['', Validators.required],
      sex: ['', Validators.required],
    });
  }

  public onSubmit(userForm: FormGroup) {
    this.currentUser.phone = userForm.value.phone;
    this.currentUser.email = userForm.value.email;
    this.currentUser.country = userForm.value.country;
    this.currentUser.city = userForm.value.city;
    this.currentUser.sex = userForm.value.sex;
    this.currentUser.age = userForm.value.age;
    console.log('this.currentUser', this.currentUser);
    this.saveUser();
  }
  public addInterest(value: string) {
    this.currentUser.interests.push(value);
  }
  public isShowInterest(value: string): boolean {
    const index = this.currentUser.interests.indexOf(value);
    return (index !== -1);
  }
  public delInterest(value: string) {
    this.currentUser.interests = this.currentUser.interests.filter(function (obj) {
      return obj !== value;
    });
  }
  public addPlace(value: string) {
    this.currentUser.places.push(value);
  }
  public isShowPlace(value: string): boolean {
    const index = this.currentUser.places.indexOf(value);
    return (index !== -1);
  }
  public delPlace(value: string) {
    this.currentUser.places = this.currentUser.places.filter(function (obj) {
      return obj !== value;
    });
  }
  public isShowCity() {
    if (this.currentUser.country === 'no') {
      this.currentUser.city = 'no';
    }
    return (this.currentUser.country !== 'no');
  }
  public isShowRegions() {
    if (this.currentUser.city === 'no') {
      this.currentUser.places = [];
    }
    return (this.currentUser.city !== 'no');
  }
}
