import { User } from "./../entity/user/User";
import UserRepository from "../entity/user/UserRepository";
import { Service, Container } from 'typedi';
@Service()
class UserService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = Container.get(UserRepository)
    }

    async find(): Promise<User[]> {
        return this.userRepository.find();
    }
    async findOne(params: any): Promise<User | string> {
        const id = parseInt(params.id);
        const user = await this.userRepository.findOne(id);
        if (!user) {
            return "unregistered user";
        }
        return user;
    }

    async save(body: any): Promise<User> {
        const { firstName, lastName, age } = body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age,
        });

        return this.userRepository.save(user);
    }

    async remove(params: any): Promise<string> {
        const id = parseInt(params.id);

        let userToRemove = await this.userRepository.findOne(id);

        if (!userToRemove) {
            return "this user not exist";
        }

        await this.userRepository.remove(userToRemove);

        return "user has been removed";
    }
}

export default UserService