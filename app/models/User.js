import validator from "validator";
import connection from "../database.js";

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

  static async findOne(email) {
    const sql = 'SELECT * FROM user WHERE email = ?';
    const [row] = await connection.query(sql, [email]);
  
    if (row) {
      return new User(row);
    } else {
      return null;
    }
  }

  static async findById(id) {
    const sql = 'SELECT * FROM user WHERE id = ?';
    const [row] = await connection.query(sql, [id]);

    if (row) {
      return new User(row);
    } else {
      return null;
    }
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