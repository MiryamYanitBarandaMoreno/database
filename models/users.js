const usersModel = {
    getAll: `SELECT * FROM Users`,

    getByID: `SELECT * FROM Users WHERE id = ?`,

    addRow: `
    INSERT INTO 
    Users (
        username, 
        email, 
        password, 
        name, 
        lastname,
        phone_number,
        role_id,
        is_active
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        
        `,
    getByUserName: `
    
    SELECT *
    FROM
            Users
    WHERE
            username = ?
    `,

    getByEmail: `
    
    SELECT *
    FROM
            Users
    WHERE
            email = ?
    `,

    updateByID: `
    UPDATE Users 
        SET username=?, 
        email=?, password=?, 
        name=?, lastname=?, 
        phone_number=?, 
        role_id=?, 
        is_active=? 
    WHERE id=?`,

    deleteRow:`
        UPDATE 
            Users
        SET
            is_active = 0
        WHERE
            id = ?
    `,
    
}

module.exports = usersModel;