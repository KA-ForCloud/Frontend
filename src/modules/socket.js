const CONNECT_SOCKET='socket/CONNECT_SOCKET';
const SAVE_SUBSCRIPTION="socket/SAVE_SUBSCRIPTION";
// 액션 생성 함수

// 소켓 저장
export function connectSocket(socket){
    console.log("[creating connectSocket action]");
    return{
        type:CONNECT_SOCKET,
        payload:{
            socket: socket
        }
    }
}

// subscriptions 저장
export function saveSubscription(subscription){
    console.log("[creating saveSubscription action]- subscription",subscription);
    return{
        type:SAVE_SUBSCRIPTION,
        payload:{
            subscriptions: subscription
        }
    }
}
// 모듈 초기 상태
const initialState = {
    socket: null,
    subscriptions:[]
}

// 리듀서
export default function socket(state=initialState,action){
    switch(action.type){
        case CONNECT_SOCKET:
            console.log("action.payload: ",action.payload.socket);
            return{
                ...state,
                socket: action.payload.socket
            }
        case SAVE_SUBSCRIPTION:
            console.log("action.payload: ",action.payload.subscriptions);
            return{
                ...state,
                subscriptions: action.payload.subscriptions
            }
        default:
            return state;
    }
}