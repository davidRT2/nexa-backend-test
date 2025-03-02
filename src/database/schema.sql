CREATE TABLE admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    password VARBINARY(100),
    note VARCHAR(100)
);

CREATE TABLE karyawan (
    nip VARCHAR(50) PRIMARY KEY,
    nama VARCHAR(200) NOT NULL,
    alamat VARCHAR(200),
    gend ENUM('L', 'P'),
    tgl_lahir DATE,
    insert_by VARCHAR(50),
    insert_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //
CREATE PROCEDURE sp_add_kary_Muhammad_David_Akbar(
    IN nip VARCHAR(50),
    IN nama VARCHAR(200),
    IN alamat VARCHAR(200),
    IN gend ENUM('L', 'P'),
    IN tgl_lahir DATE,
    IN insert_by VARCHAR(50)
)
BEGIN
    INSERT INTO karyawan (nip, nama, alamat, gend, tgl_lahir, insert_by)
    VALUES (nip, nama, alamat, gend, tgl_lahir, insert_by);
END;
//
DELIMITER ;
