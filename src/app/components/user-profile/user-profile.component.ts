import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import { IUser } from 'src/app/components/Interfaces/IUser';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userObs: Observable<IUser> = new Observable<IUser>();

  user: User | null = null;
  hideForm: boolean = true;
  userEditing: { firstName: string } = { firstName: "" };
  userLastEditing: { lastName: string } = { lastName: "" };
  userUsernameEditing: { username: string } = { username: "" };
  userEmailEditing: { email: string } = { email: "" };
  userPasswordEditing: { password: string } = { password: "" };

  // Update Method
  onUpdate(): void {
    console.log(this.userEditing.firstName, this.userLastEditing.lastName,
      this.userUsernameEditing.username, this.userEmailEditing.email,
      this.userPasswordEditing.password, this.user?.id);

    // Object to hold user 
    if (this.user) {
      let user = {
        id: this.user.id, // HARDCODED ID TO TEST UPDATE USER FIRST
        firstname: this.userEditing.firstName,
        lastname: this.userLastEditing.lastName,
        email: this.userEmailEditing.email,
        username: this.userUsernameEditing.username,
        password: this.userPasswordEditing.password
      }

      // Send Post Request
      console.log("Checking UserService.update");
      this.userService.updateUser(user).subscribe(
        (response) => {
          ErrorService.setMessage("Successfully Updated!")
          this.user = response;
          this.toggleUpdateForm();
          ErrorService.displaySuccess(true)
        },

        //error handling
        (error) => {
          ErrorService.setMessage("The email entered is already associated with another account.")
          console.log("There has been an error");
          ErrorService.displayWarning(true)
        }

      );
    }

  }




  // Importing service class
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    console.log(this.userService);

    // Need to implement getuser method in service and have this function save the user info
    this.userService.getUser().subscribe(

      (resp) => {
        this.user = resp;
        this.userEditing.firstName = resp.firstname;
        this.userLastEditing.lastName = resp.lastname;
        this.userUsernameEditing.username = resp.username;
        this.userEmailEditing.email = resp.email;
        this.userPasswordEditing.password = resp.password;

      },
      (err) => 
      { if (err.status = 500) this.router.navigate(['login']) }

    );
  }

  toggleUpdateForm(): void {
    this.hideForm = !this.hideForm;



  }
}
