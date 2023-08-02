import validator from "validator";
import client from "../database.js";

class Favori {
    #titre;
    #lien;
    #id_favori;

    constructor(titre, lien, id_favori) {
        this.titre = titre;
        this.lien = lien;
        this.id_favori = id_favori;
    }

    get titre() {
        return this.#titre;
    }

    get lien() {
        return this.#lien;
    }

    get id_favori() {
        return this.#id_favori;
    }

    set titre(value) {
        if (!value || typeof value !== "string") {
            throw new Error("Titre obligatoire");
        }
        else if (!validator.isLength(value, { min: 1, max: 10 })) {
            throw new Error("Le titre doit contenir entre 1 et 10 caractères");
        }
        this.#titre = value;
    }

    set lien(value) {
        if (!value || typeof value !== "string") {
            throw new Error("Lien obligatoire");
        }
//  lien internet obligatoire
        else if (!validator.isURL(value)) {
            throw new Error("Le lien doit être une URL");
        }
        this.#lien = value;

    }

    set id_favori(value) {
        if (!value || typeof value !== "number") {
            throw new Error("Id obligatoire");
        }
        this.#id_favori = value;
    }

    async create() {
        try {
            //  45 caractères max
            if (!validator.isLength(this.titre, { min: 1, max: 10 })) {
                throw new Error("Le titre doit contenir entre 1 et 10 caractères");
            }
//  lien internet obligatoire
            if (!validator.isURL(this.lien)) {
                throw new Error("Le lien doit être une URL");
            }

            await client.query("INSERT INTO favori (titre, lien, id_favori) VALUES ($1, $2, $3)", [this.titre, this.lien, this.id_favori]);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async findAll(id_favori) {
        try {
            const result = await client.query("SELECT * FROM favori WHERE id_favori = $1", [id_favori]);
            if (result) {
                return result.rows;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async afficherFavoris() {
        try {
            const result = await client.query("SELECT * FROM favori");
            if (result) {
                return result.rows;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async modifierFavori(titre, lien, id_favori) {
        try {
            const result = await client.query("UPDATE favori SET titre = $1, lien = $2 WHERE id_favori = $3", [titre, lien, id_favori]);
            if (result) {
                return result.rows;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async supprimerFavori(id_favori) {
        try {
            await client.query("DELETE FROM favori WHERE id_favori = $1", [id_favori]);
            
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default Favori;

