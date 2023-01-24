import axios from 'axios';
import { forwardRef, useImperativeHandle } from "react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../atom';
// props -> surveyJson,userToken
// route.CreateSurvey에서 사용!
const PostPost = forwardRef((props, ref) => {

    const users = useRecoilValue(userState);
    const userHandler = useSetRecoilState(userState);
    const user_token=users.token;
    const setLink = props.setLink;

    useImperativeHandle(ref, () => ({

        postPost() {
            console.log("post survey 시작!!");
            console.log(user_token);
            const headers = {
                Authorization: user_token
            };

            const body = {
                postDto: "props.postJson"
            }

            console.log('확인', JSON.stringify(props.postJson));

                axios.post(`https://localhost:8080/post/save/${users.Id}`, props.postJson)
                  .then((response) => {
                    console.log(response);
                    // if (response.status === 203) {
                    //     console.log(users)
                    //     PostUserToken(users.kakaoToken, users, userHandler);
                    //     //console.log('ok', users)
                    //     //console.log('get survey by token ok');
                    //     //console.log("설문링크", response.data);
                    //     setLink(response.data);
                    // } else {
                        setLink(response.data);
                    // }
                    
                    // console.log("설문링크", response.data);
                    // setLink(response.data);
                    // console.log(response.data)
                    // console.log('post survey ok');
                })
                .catch((error) => {
                    console.log(error);
                    // console.error(error.response.data);
                })
        },
    }));

});

export { PostPost };