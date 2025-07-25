import { Component, OnInit } from '@angular/core';
import { AuthUser, User } from 'src/app/models/user.model';
import { AuthManagerService } from 'src/app/services/auth/auth.manager.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html'
})
export class AdminProfileComponent implements OnInit {

  currentUser : AuthUser ={
      username: '',
      email: '',
      role: 'admin',
      id: ''
  };

  isEditing = false;
  constructor(private userService : UserService,
      private authManagerService : AuthManagerService,
  ) { }

  ngOnInit(): void {
    const userId = this.authManagerService.getCurrentUserId();
    // need to check  weather userId is coming from google_user_id or from the  user_id of user table
    this.userService.getUserById(Number(userId)).subscribe(
      (user: User) => {
        this.currentUser = {
          username: user.name,
          email: user.email,
          role: user.role,
          id: userId.toString()
        };
        console.log('currentUser:', this.currentUser);
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
    
  }


  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    // Save changes logic here
    this.userService.updateUserById(Number(this.currentUser.id), this.mapToServiceUser(this.currentUser)).subscribe(
      response => {
        console.log('User updated successfully:', response);
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
    this.isEditing = false;
  }

  cancelEdit() {
    // Cancel edit logic here
    console.log('Edit cancelled');
      
    this.isEditing = false;
  }

  mapToServiceUser(authUser: AuthUser): User {
    return {
      name: authUser.username,
      email: authUser.email,
      role: authUser.role
    };
  }

    // canExit(): boolean {
  //   // Check if the form is dirty (has unsaved changes)
  //   if (this.checkoutForm.dirty) {
  //     return confirm(
  //       'You have unsaved changes. Are you sure you want to leave?'
  //     );
  //   }
  //   return true; // or false based on your logic
  // }
}
