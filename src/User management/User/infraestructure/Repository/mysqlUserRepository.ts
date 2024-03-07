import { User } from "../../domain/Entity/User";
import { UserInterface } from "../../domain/Port/UserInterface";
import { query } from "../../../../database/postgresql";
import { tokenSigIn } from "../../../../helpers/token";
import { compare } from "../../../../helpers/ashs";

export class PostgresUserRepository implements UserInterface {

    async registerUser(user: User): Promise<User | any> {
        try {
            const { contact, credential } = user;

            const sql = "INSERT INTO users (uuid, name, lastName, cellphone, email, password) VALUES ($1, $2, $3, $4, $5, $6)";
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
            console.error("Error registering user in PostgreSQL:", error);
            throw new Error("Error registering user in PostgreSQL");
        }
    }

    async loginUser(email: string, password: string): Promise<any> {
        try {
            // First, retrieve the user by email.
            const [users]: any = await query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);

            if (!users || users.length === 0) {
                return "User does not exist";
            }

            const user = users[0];

            // Verify if the provided password matches the one stored in the database.
            const passwordMatches = await compare(password, user.password);

            if (!passwordMatches) {
                return 'Unauthorized, incorrect password';
            }
            delete user.password; // Remove the password field to avoid returning it in the response
            const token: string = tokenSigIn(user.uuid, user.email);

            return { token, user };

        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    async updateUser(uuid: string, user: User): Promise<User | null | any> {
        try {
            const { name, lastName, cellphone } = user.contact;

            const sql = "UPDATE users SET name = $1, lastName = $2, cellphone = $3 WHERE uuid = $4";
            const params = [name, lastName, cellphone, uuid];
            const [result]: any = await query(sql, params);

            if (result && result.changedRows > 0) {
                // If at least one row has been updated, retrieve the new user data
                const [updatedUser]: any = await query('SELECT * FROM users WHERE uuid = $1', [uuid]);

                if (!updatedUser || updatedUser.length === 0) {
                    return "User does not exist"; // The user does not exist
                }

                delete updatedUser[0].password;

                return updatedUser[0];
            } else {
                return "Could not update the user, same credentials";
            }
        } catch (error) {
            console.error("Error updating user in PostgreSQL:", error);
            throw new Error("Error updating user in PostgreSQL");
        }
    }

    async deleteUser(uuid: string): Promise<string | null> {
        try {
            const sql = 'DELETE FROM users WHERE uuid = $1';
            const result: any = await query(sql, [uuid]);
            if (result[0].affectedRows === 0) {
                return null;
            }

            return 'User deleted successfully.';
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error; // Or handle the error in your preferred way.
        }
    }

}
