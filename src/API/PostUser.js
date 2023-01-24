import axios from 'axios';
import { GetTokenByEmail } from './GetTokenByEmail';
import { GetUserIdByEmail } from './GetUserIdByEmail';

const PostUser = async (users) => {
    // /survey/post/{userAccount}

    let allUsers = '';
    console.log(users);
    let body = new Object();

    body = {
        account: users.token,
        age: users.age,
        email: users.email,
        gender: users.gender,
        id: users.id,
        name: users.name,
        token: users.token,
    };

    console.log("user register start");
    console.log(JSON.stringify(body, null, 2))
    axios.post("https://210.109.63.71:8080/user/register", body)
        .then((response) => {
            //GetTokenByEmail(response.data, userHandler);
            //GetUserIdByEmail(response.data, userHandler);
            console.log('register user ok');
            console.log(JSON.stringify(body, null, 2));
        })
        .catch((error) => {
            console.log('register fail');
            console.log(error)
        })
        .finally(() => {
            console.log('register finish')
        })


}

export { PostUser };
