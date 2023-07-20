BEGIN;

TRUNCATE TABLE note;

-- avec remise a zero id

INSERT INTO note ("description") VALUES
('ne pas oublier pc'),
('faire le jardin');

TRUNCATE TABLE rdv;

INSERT INTO rdv (nom, lieu, "date", heure) VALUES
('docteur guery', 'celles sur plaine', '2023-08-21', '18:15');

COMMIT;