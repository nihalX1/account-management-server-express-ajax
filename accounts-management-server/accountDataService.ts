import {User} from './userModel'
import {IUserDataRepository} from './iUserDataRepositoy'
export class AccountDataService{

    
    constructor(private repo:IUserDataRepository){

    

    }
    register(newuser:User):boolean{

        let users:User[]= this.repo.getAllUsers();
        for(var user of users){
           if(user.Name == newuser.Name){
               return false;
           }
        }
        this.repo.addNewUser(newuser);
        return true;
    }

    validate(userName:string,password:string):boolean{
        let users:User[]= this.repo.getAllUsers();
        for(var user of users){
           if(user.Name == userName && user.Password == password){
               return true;
           }
        }

        return false;

    }
    changePassword(userName:string,oldPassword:string,newPassword:string):boolean{
        let users:User[]= this.repo.getAllUsers();
        for(var user of users){
           if(user.Name == userName && user.Password == oldPassword){
               user.Password = newPassword;
               return true;
           }
        }

        return false;

    }
    recoverPassword(email:string):string{

        return "Email Sent";
    }
    
}