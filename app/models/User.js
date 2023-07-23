import validator from "validator";

class User {
  #hash;
  #prenom;
  #nom;
  #email;

  constructor(config) { 
    this.email = config.email;
    this.prenom = config.prenom;
    this.nom = config.nom;   
    this.hash = config.hash;    
  }

  get email() {
    return this.#email;
  }

  get hash() {
    return this.#hash;
  }

  get prenom() {
    return this.#prenom;
  }

  get nom() {
    return this.#nom;
  }


  set email(value) {
    if (!value || typeof value !== 'string') {
      throw new Error('Email obligatoire');
    }
    
    if (!validator.isEmail(value)) {
      throw new Error('Email invalide');
    }
    this.#email = value;
  }

  set hash(value) {
    if (!value || typeof value !== 'string') {
      throw new Error('Mot de passe obligatoire');
    }
    this.#hash = value;
  }

  set prenom(value) {
    if (!value || typeof value !== 'string') {
      throw new Error('Prénom obligatoire');
    }
    this.#prenom = value;
  }

  set nom(value) {
    if (!value || typeof value !== 'string') {
      throw new Error('Nom obligatoire');
    }
    this.#nom = value;
  }

 create() {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO user SET ?';
      connection.query(sql, this, (error, result) => {
        if (error) {
          reject(error);
        } else {
          this.id = result.insertId;
          resolve(this);
        }
      });
    });
  }

  static findOne(email) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE email = ?';
      connection.query(sql, [email], (error, result) => {
        if (error) {
          reject(error);
        } else if (result.length) {
          const [row] = result;
          const user = new User(row);
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE id = ?';
      connection.query(sql, [id], (error, result) => {
        if (error) {
          reject(error);
        } else if (result.length) {
          const [row] = result;
          const user = new User(row);
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user';
      connection.query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          const users = result.map((row) => new User(row));
          resolve(users);
        }
      });
    });
  }

  update() {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE user SET ? WHERE id = ?';
      connection.query(sql, [this, this.id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(this);
        }
      });
    });
  }

  delete() {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM user WHERE id = ?';
      connection.query(sql, [this.id], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(this);
        }
      });
    });
  }

  save() {
    if (this.id) {
      return this.update();
    } else {
      return this.create();
    }
  }

   
}

export default User;