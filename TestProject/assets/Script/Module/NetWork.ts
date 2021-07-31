
export default class NetWork {

    private webSocket:WebSocket = null;

    /**
     * 连接网络
     * @param ws websocket地址，url
     */
    public connect(ws:string){
        this.webSocket = new WebSocket(ws);
        //使用二进制的数据类型连接。
        this.webSocket.binaryType = "arraybuffer";
        //用于指定连接成功后的回调函数。
        this.webSocket.onopen = function (event:Event) {
            console.log("Send Text WS was opened.");
        };
        //用于指定当从服务器接受到信息时的回调函数。
        this.webSocket.onmessage = function (event:MessageEvent) {
            console.log("response text msg: " + event.data);
        };
        //用于指定连接失败后的回调函数。
        this.webSocket.onerror = function (event:Event) {
            console.log("Send Text fired an error");
        };
        //用于指定连接关闭后的回调函数。
        this.webSocket.onclose = function (event:CloseEvent) {
            console.log("WebSocket instance closed.");
        };
    }

    /**
     * 发送数据
     * @param data 要发送的数据
     */
    public send(data:any){
        if(this.webSocket){
            this.webSocket.send(data);
        }
    }
    
}
