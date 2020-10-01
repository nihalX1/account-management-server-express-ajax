"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDataService = void 0;
var AccountDataService = /** @class */ (function () {
    function AccountDataService(repo) {
        this.repo = repo;
    }
    AccountDataService.prototype.register = function (newuser) {
        var users = this.repo.getAllUsers();
        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
            var user = users_1[_i];
            if (user.Name == newuser.Name) {
                return false;
            }
        }
        this.repo.addNewUser(newuser);
        return true;
    };
    AccountDataService.prototype.validate = function (userName, password) {
        var users = this.repo.getAllUsers();
        for (var _i = 0, users_2 = users; _i < users_2.length; _i++) {
            var user = users_2[_i];
            if (user.Name == userName && user.Password == password) {
                return true;
            }
        }
        return false;
    };
    AccountDataService.prototype.changePassword = function (userName, oldPassword, newPassword) {
        var users = this.repo.getAllUsers();
        for (var _i = 0, users_3 = users; _i < users_3.length; _i++) {
            var user = users_3[_i];
            if (user.Name == userName && user.Password == oldPassword) {
                user.Password = newPassword;
                return true;
            }
        }
        return false;
    };
    AccountDataService.prototype.recoverPassword = function (email) {
        return "Email Sent";
    };
    return AccountDataService;
}());
exports.AccountDataService = AccountDataService;
