import { Service } from 'typedi';
import { User } from "./User";
import { AppDataSource } from "../../data-source";

@Service()
export default class UserRepository {
    constructor(private userRepository = AppDataSource.getRepository(User)) {}

    async find(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: { id },
        });
    }

    async save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async remove(user: User): Promise<string> {
        await this.userRepository.remove(user);
        return "user has been removed";
    }
}
