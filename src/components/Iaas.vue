<template>
    <div id="cpuUsageChart">
        <LineChart :options="options"> </LineChart>
        <textarea v-model="consoleMsg" readonly style="width:1500px; height:300px; background:#000; color:#00ff00;"></textarea>
        <button id="send" class="btn btn-light" @click="sendMessage">send</button>
    </div>
</template>

<script>
import LineChart from './LineChart.vue'

export default {
    components: {
        LineChart
    },
    data: () => ({
        consoleMsg : "",
        status: "disconnected",
    }),
    mounted() {
        this.socket = new WebSocket("ws://localhost:8080/ws");
        this.socket.onopen = () => {
            this.status = "connneted";
            console.log('[onmessage] Received status : ' + this.status);
        }
        this.socket.onmessage = ({data}) => {
            if(data === undefined) {
                alert("No data");
            }else{
                console.log('[onmessage] Received status : ' + this.status);
                console.log('[onmessage] Received data : ' + data);
                this.consoleMsg = data
            }
        }
        this.socket.onclose = () => {
            console.log('Connection closed');
        }
    },
    methods: {
        sendMessage() {
            if (this.socket == null) {
                alert("WebSocket not ready..");
                return;
            }
            var param = {
                'category' : 'iaas',
                'command' : 'cpuUsage',
                'extra_param' : {
                    'instance_id' : '74901aed-4d25-4544-a48b-852fad3e6fce',
                    'host' : ''
                }
            }
            this.socket.send(JSON.stringify(param));
        }
    },
  }
</script>

<style>

</style>