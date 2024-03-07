"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUserRepository = void 0;
const postgresql_1 = require("../../../../database/postgresql");
const token_1 = require("../../../../helpers/token");
const ashs_1 = require("../../../../helpers/ashs");
class PostgresUserRepository {
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield (0, postgresql_1.query)(sql, params);
                return user;
            }
            catch (error) {
                console.error("Error registering user in PostgreSQL:", error);
                throw new Error("Error registering user in PostgreSQL");
            }
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // First, retrieve the user by email.
                const [users] = yield (0, postgresql_1.query)('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
                if (!users || users.length === 0) {
                    return "User does not exist";
                }
                const user = users[0];
                // Verify if the provided password matches the one stored in the database.
                const passwordMatches = yield (0, ashs_1.compare)(password, user.password);
                if (!passwordMatches) {
                    return 'Unauthorized, incorrect password';
                }
                delete user.password; // Remove the password field to avoid returning it in the response
                const token = (0, token_1.tokenSigIn)(user.uuid, user.email);
                return { token, user };
            }
            catch (error) {
                console.error('Error during login:', error);
                throw error;
            }
        });
    }
    updateUser(uuid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, lastName, cellphone } = user.contact;
                const sql = "UPDATE users SET name = $1, lastName = $2, cellphone = $3 WHERE uuid = $4";
                const params = [name, lastName, cellphone, uuid];
                const [result] = yield (0, postgresql_1.query)(sql, params);
                if (result && result.changedRows > 0) {
                    // If at least one row has been updated, retrieve the new user data
                    const [updatedUser] = yield (0, postgresql_1.query)('SELECT * FROM users WHERE uuid = $1', [uuid]);
                    if (!updatedUser || updatedUser.length === 0) {
                        return "User does not exist"; // The user does not exist
                    }
                    delete updatedUser[0].password;
                    return updatedUser[0];
                }
                else {
                    return "Could not update the user, same credentials";
                }
            }
            catch (error) {
                console.error("Error updating user in PostgreSQL:", error);
                throw new Error("Error updating user in PostgreSQL");
            }
        });
    }
    deleteUser(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM users WHERE uuid = $1';
                const result = yield (0, postgresql_1.query)(sql, [uuid]);
                if (result[0].affectedRows === 0) {
                    return null;
                }
                return 'User deleted successfully.';
            }
            catch (error) {
                console.error('Error deleting user:', error);
                throw error; // Or handle the error in your preferred way.
            }
        });
    }
}
exports.PostgresUserRepository = PostgresUserRepository;
