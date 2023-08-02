import validator from 'validator';
import client from '../database.js';

class rdv {
    #nom;
    #lieu;
    #date;
    #heure;
    #id_rdv;

    constructor(nom, lieu, date, heure, id_rdv) {
        this.nom = nom;
        this.lieu = lieu;
        this.date = date;
        this.heure = heure;
        this.id_rdv = id_rdv;
    }

    get nom() {
        return this.#nom;
    }

    get lieu() {
        return this.#lieu;
    }

    get date() {
        return this.#date;
    }

    get heure() {
        return this.#heure;
    }

    get id_rdv() {
        return this.#id_rdv;
    }

    set nom(value) {
        if (!value || typeof value !== 'string') {
            throw new Error('Nom obligatoire');
        }
        else if (!validator.isLength(value, { min: 1, max: 15 })) {
            throw new Error('Le nom doit contenir entre 1 et 15 caractères');
        }
        this.#nom = value;
    }

    set lieu(value) {
        if (!value || typeof value !== 'string') {
            throw new Error('Lieu obligatoire');
        }
        else if (!validator.isLength(value, { min: 1, max: 15 })) {
            throw new Error('Le lieu doit contenir entre 1 et 15 caractères');
        }
        this.#lieu = value;
    }

    set date(value) {
        if (!value || typeof value !== 'string') {
            throw new Error('Date obligatoire');
        }
    //    date en francais DD/MM/YYYY
        else if (!validator.isDate(value, 'DD/MM/YYYY')) {
            throw new Error('La date doit être au format DD/MM/YYYY');
        }



        this.#date = value;
    }

    set heure(value) {
        const heureSansDeuxPoints = value.replace(':', '');

        if (!value || typeof value !== 'string') {
            throw new Error('Heure obligatoire');
        }
        // l'heure doit etre 13:30 avec les :
        else if (!validator.isAfter(value, '00:00') || !validator.isBefore(value, '23:59')) {
            throw new Error('L\'heure doit être comprise entre 00:00 et 23:59 et au format HH:MM');
        }
        this.#heure = value;
    }

    set id_rdv(value) {
        if (!value || typeof value !== 'number') {
            throw new Error('Id obligatoire');
        }
        this.#id_rdv = value;
    }

    async create() {
        try {
            await client.query({
                text: 'INSERT INTO rdv (nom, lieu, date, heure, id_rdv) VALUES ($1, $2, $3, $4, $5)',
                values: [this.nom, this.lieu, this.date, this.heure, this.id_rdv]
               
            });
        } catch (error) {
            throw new Error(error.message);
        }

}

    static async findAll(id_rdv) {
        try {
            const result = await client.query('SELECT * FROM rdv WHERE id_rdv = $1', [id_rdv]);
            if (result) {
                return result.rows;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

export default rdv;