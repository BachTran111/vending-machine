class User {
  constructor(id, username, password, role = "USER") {
    this.id = id;
    this.username = username;
    this.password = password; // có thể hash sau
    this.role = role;
  }
}

export default User;
