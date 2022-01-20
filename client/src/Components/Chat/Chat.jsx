import React from "react";
import querystring from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import { InfoBar } from "../Infobar/InfoBar";
import { Messages } from "../Messages/Messages";
import { Input } from "../Input/Input";
import { TextContainer } from "../TextContainer/TextContainer";
let socket;

export const Chat = ({ location }) => {
    const [name, setName] = React.useState("");
    const [room, setRoom] = React.useState("");
    const [messages, setmessages] = React.useState([]);
    const [singlemessage, setsinglemessage] = React.useState("");
    const [users, setUsers] = React.useState('');
    const ENDPOINT = "https://web-socket-chat-appbackend.herokuapp.com/";

    React.useEffect(() => {
        const { name, room } = querystring.parse(location.search);
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        socket.emit("join", { name, room }, () => {

        });
        return () => {
            //socket.emit("disconnect");
            socket.off();
        }
    }, [location.search, ENDPOINT])

    React.useEffect(() => {
        socket.on("message", (message) => {
            setmessages([...messages, message]);

        })
        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, [messages]);

    function sendMessages(event) {
        event.preventDefault();
        if (singlemessage) {
            socket.emit("sendMessage", singlemessage);
            setsinglemessage("");
        }
    }
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                {/* <input type="text" placeholder="Write Messages" value={singlemessage} onChange={(event) => setsinglemessage(event.target.value)} onKeyPress={(event) => event.key === "Enter" ? sendMessages(event) : null} /> */}
                <Messages messages={messages} name={name} />
                <Input message={singlemessage} setMessage={setsinglemessage} sendMessage={sendMessages} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}