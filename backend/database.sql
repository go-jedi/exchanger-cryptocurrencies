CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_activated BOOLEAN NOT NULL DEFAULT 'f',
    activation_link VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS token (
    user_id INTEGER,
    refresh_token VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS review (
    user_id SERIAL PRIMARY KEY,
    name_user VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    date_create VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS contact (
    user_id SERIAL PRIMARY KEY,
    name_user VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    id_exchange VARCHAR(255) NOT NULL,
    message VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS wallet (
    id SERIAL PRIMARY KEY,
    name_wallet VARCHAR(255) NOT NULL,
    address_wallet VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS currencies (
    id SERIAL PRIMARY KEY,
    type_currency VARCHAR(255) NOT NULL,
    type_convert VARCHAR(255) NOT NULL,
    quote_name VARCHAR(255) NOT NULL,
    name_currency VARCHAR(255) NOT NULL,
    name_reserve VARCHAR(255) NOT NULL,
    count_currency INTEGER NOT NULL,
    can_convert TEXT[],
    reserve_range DOUBLE PRECISION[],
    range_fixed INTEGER NOT NULL,
    quote_currency jsonb,
    img_logo VARCHAR(255) NOT NULL
);

INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('COIN', 'All', 'BTC', 'Bitcoin BTC', 'Bitcoin',1, '{"Tether ERC20 USDT","Tether TRC20 USDT","Tether BEP20 USDT","Sberbank RUB","Tinkoff RUB","TCS cash-in RUB","Garantex code RUB","Alfa Cash-in RUB"}','{308.387062, 342.525048}',3,'Bitcoin.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('COIN', 'Give', 'BTC', 'Bitcoin BEP20 BTC','Bitcoin BEP20',1,'{"Tether ERC20 USDT","Tether TRC20 USDT","Tether BEP20 USDT","Sberbank RUB","Tinkoff RUB","TCS cash-in RUB","Garantex code RUB","Alfa Cash-in RUB"}','{308.387062, 342.525048}',3,'Bitcoin.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('COIN', 'All', 'ETH', 'Ethereum ETH','Ethereum',1, '{"Sberbank RUB","Tinkoff RUB","TCS cash-in RUB","Alfa Cash-in RUB"}','{1652.785005, 1670.127485}',4,'ethereum.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('COIN', 'Give', 'ETH', 'Ethereum BEP20 ETH','Ethereum BEP20',1, '{"Sberbank RUB","Tinkoff RUB","TCS cash-in RUB","Alfa Cash-in RUB"}','{1652.785005, 1670.127485}',4,'ethereum.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('USD', 'All', 'USDT', 'Tether ERC20 USDT','Tether ERC20',1, '{"Bitcoin BTC","Sberbank RUB","Tinkoff RUB","Garantex code RUB","TCS cash-in RUB","Alfa Cash-in RUB"}','{300355.52, 324000.88}',3,'usdt-logo-50.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('USD', 'All', 'USDT', 'Tether TRC20 USDT','Tether TRC20',1, '{"Bitcoin BTC","Sberbank RUB","Tinkoff RUB","Garantex code RUB","TCS cash-in RUB","Alfa Cash-in RUB"}','{502391.903, 527221.437}',3,'usdt-logo-50.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('USD', 'All', 'USDT', 'Tether BEP20 USDT','Tether BEP20', 1, '{"Bitcoin BTC","Sberbank RUB","Tinkoff RUB","Garantex code RUB","TCS cash-in RUB","Alfa Cash-in RUB"}','{201388.820, 217891.393}',3,'usdt-logo-50.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('USD', 'Give', 'USDC', 'USD coin USDC','USD coin', 1, '{"Sberbank RUB","Tinkoff RUB","TCS cash-in RUB","Alfa Cash-in RUB"}','{53002891.29, 53704647.47}',3,'usdc_50.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('COIN', 'All', 'USDC', 'Dai DAI','Dai',1, '{"Sberbank RUB","Tinkoff RUB","Garantex code RUB","TCS cash-in RUB","Alfa Cash-in RUB"}','{107421.846075, 113038.784494}',3,'dai_50.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('RUB', 'All', 'RUB' ,'Sberbank RUB','Sberbank', 10000, '{"Bitcoin BTC","Ethereum ETH","Tether ERC20 USDT","Tether TRC20 USDT","Tether BEP20 USDT","Dai DAI","Garantex code RUB"}','{53002891.29, 53704647.47}',2,'Sberbank.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('RUB', 'All', 'RUB','Tinkoff RUB','Tinkoff', 10000, '{"Bitcoin BTC","Ethereum ETH","Tether ERC20 USDT","Tether TRC20 USDT","Tether BEP20 USDT","Dai DAI"}','{2404390.86, 2498069.91}',2,'Tinkoff.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('RUB', 'All', 'RUB', 'Garantex code RUB','Garantex code', 10000, '{"Sberbank RUB","Tinkoff RUB","TCS cash-in RUB","Alfa Cash-in RUB"}','{2066296.82, 2497805.39}',2,'garantex.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('RUB', 'Get', 'RUB', 'TCS cash-in RUB','TCS cash-in', 10000, '{}','{2004920.02, 2090165.09}',2,'Tinkoff.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('RUB', 'Get', 'RUB', 'Alfa Cash-in RUB','Alfa Cash-in', 10000, '{}','{2110195.93, 2182535.51}',2,'Alfabank.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('RUB', 'Get', 'RUB', 'Alfa-Bank','Alfa-Bank', 10000, '{}','{2110195.93, 2182535.51}',2,'Alfabank.png')  RETURNING *;
INSERT INTO currencies (type_currency, type_convert, quote_name, name_currency, name_reserve, count_currency, can_convert, reserve_range, range_fixed, img_logo) VALUES ('RUB', 'Get', 'RUB', 'Visa/MasterCard','Visa/MasterCard', 10000, '{}','{2128497.93, 2149204.78}',2,'Visa-MasterCard-1.png')  RETURNING *;
