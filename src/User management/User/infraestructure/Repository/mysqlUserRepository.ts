import { User } from "../../domain/Entity/User";
import { UserInterface } from "../../domain/Port/UserInterface";
import { query } from "../../../../database/mysql";
import { tokenSigIn } from "../../../../helpers/token";
import { compare } from "../../../../helpers/ashs";


export class MysqlUserRepository implements UserInterface {

    async registerUser(user: User): Promise<User | any> {
        try {
            const { contact, credential } = user;

            const sql = "INSERT INTO users (uuid, name, lastName, cellphone, email, password) VALUES (?, ?, ?, ?, ?, ?)";
            const params = [
                user.uuid,
                contact.name,
                contact.lastName,
                contact.cellphone,
                credential.email,
                credential.password,
            ];
            await query(sql, params);
            return user;
        } catch (error) {
            
            console.error("Error al registrar usuario en MySQL:", error);
            throw new Error("Error al registrar usuario en MySQL")
        }
    }

    async loginUser(email: string, password: string): Promise<any> {
        try {
            // Primero, obtener el usuario por email.
            const [users]: any = await query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
          
            if (!users || users.length === 0) {
                return "No existe el usuario";
            }
    
            const user = users[0];
            console.log(user)
    
            // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos.
            const passwordMatches = await compare(password, user.password);
          
            if (!passwordMatches) {
                return 'Unauthorized, constraseña incorrecta';
            }
            delete user.password; //Se elimna el campo de pasword para que no se retorne en la respuesta
            const token: string = tokenSigIn(user.uuid, user.email);

            return {token, user};

        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            throw error;
        }
    }

    async updateUser(uuid: string, user: User): Promise<User | null | any> {
        try {
            const { name, lastName, cellphone } = user.contact;

            const sql = "UPDATE users SET name = ?, lastName = ?, cellphone = ? WHERE uuid = ?";
            const params = [name, lastName, cellphone, uuid];
            const [result]: any = await query(sql, params);

            if (result && result.changedRows > 0) {
                // Si se ha actualizado al menos una fila, obtener los nuevos datos del usuario
                const [updatedUser]: any = await query('SELECT * FROM users WHERE uuid = ?', [uuid]);
                
                
                if (!updatedUser || updatedUser.length === 0) {
                    return "El usuario no existe"; // El usuario no existe
                }

                delete updatedUser[0].password

                return updatedUser[0];
            } else {
                return "No se puedo actualizar el usuario, mismas credenciales"; 
            }
        } catch (error) {
            console.error("Error al actualizar usuario en MySQL:", error);
            throw new Error("Error al actualizar usuario en MySQL");
        }
    }

    async deleteUser(uuid: string): Promise<string | null> {
        try {
            const sql = 'DELETE FROM users WHERE uuid = ?';
            const result: any = await query(sql, [uuid]);
            if (result[0].affectedRows === 0){
                return null;
            } 

            return 'User deleted successfully.';
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error; // O maneja el error de la manera que prefieras.
        }
    }
    
}