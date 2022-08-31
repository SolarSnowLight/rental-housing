module.exports = class AdminUsersDto {
    users;

    constructor(model) {
        this.users = model.users;
    }
}