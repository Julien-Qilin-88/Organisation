import validator from 'validator';
import client from '../database.js';


class Note {
    #note;
    #id_note;

    constructor(note, id_note) {
        this.note = note;
        this.id_note = id_note;
    }

    get note() {
        return this.#note;
    }

    get id_note() {
        return this.#id_note;
    }

    set note(value) {
        if (!value || typeof value !== 'string') {
            throw new Error('Note obligatoire');
        }
        else if (!validator.isLength(value, { min: 1, max: 45 })) {
            throw new Error('La note doit contenir entre 1 et 45 caractères');
        }
        this.#note = value;
    }

    set id_note(value) {
        if (!value || typeof value !== 'number') {
            throw new Error('Id obligatoire');
        }
        this.#id_note = value;
    }


    async create() {
        try {
            //  45 caractères max
            if (!validator.isLength(this.note, { min: 1, max: 45 })) {
                throw new Error('La note doit contenir entre 1 et 45 caractères');
            }


            await client.query('INSERT INTO "note" (note, id_note) VALUES ($1, $2)', [this.note, this.id_note]);
        } catch (error) {
            
            throw new Error(error.message);
        }
    }

    static async findAll(id_note) {
        try {
            const result = await client.query('SELECT * FROM "note" WHERE id_note = $1', [id_note]);
            if (result) {
                return result.rows;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(note, id_note) {
        try {
            await client.query('DELETE FROM "note" WHERE id_note = $1 AND note = $2', [id_note, note]);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default Note;

