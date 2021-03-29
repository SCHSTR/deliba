CREATE DATABASE trackdb;

CREATE TABLE trackcode (
    userID VARCHAR(255),
    telegramUser VARCHAR(255),
    trackCode VARCHAR(13) NOT NULL,
    package_Status VARCHAR(255),
    package_Local VARCHAR(255),
    package_Origin VARCHAR(255),
    package_Destiny VARCHAR(255)
);