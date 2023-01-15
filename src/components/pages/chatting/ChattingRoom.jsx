import React, { useState,useEffect } from "react";
import {getRooms} from '../../../services/ChattingService';

export default function ChattingRoom(props) {
    const {item}=props;
   
    // useEffect(()=>{
    //     getRooms().then((response)=>{
    //         if(response.data.code!==1000) console.log("SERVER ERROR");
    //         else{
    //             const data=response.data.result;
    //             if(data.length===0) console.log("no rooms");
    //             else{
    //                 setRoomList(data);
    //             }
    //         }
    //     });
    // },[]);
    


    return (
        <div className="md:w-full md:h-96 mx-auto max-w-7xl px-4 sm:px-6 bg-blue-200 rounded-xl mt-6">
            
        </div>
    )
}