BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

TRUNCATE TABLE "account", "favori", "rdv", "note" RESTART IDENTITY;

COMMIT;