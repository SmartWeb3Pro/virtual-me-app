// app/services/webSocketService.ts
import { useEffect } from 'react';

const useWebSocket = (url: string) => {
    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        socket.onmessage = (event) => {
            console.log('Message from server:', event.data);
        };

        return () => {
            socket.close();
        };
    }, [url]);
};

export default useWebSocket;