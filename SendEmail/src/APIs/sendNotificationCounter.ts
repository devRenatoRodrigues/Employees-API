import axios from "axios";

export default async function sendNotificationCounter() {
    try {
        await axios.post("http://backend:3030/receive-notification");

    } catch (error) {
        console.error("Erro ao enviar notificação:", error);
    }
};