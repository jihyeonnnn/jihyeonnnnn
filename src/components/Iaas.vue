<template>
    <div id="cpuUsageChart">
        <!--<vue-c3 :handler="handler"></vue-c3>-->
        <textarea v-model="console" readonly style="width:1500px; height:300px; background:#000; color:#00ff00;"></textarea>
        <button id="send" class="btn btn-light" @click="sendMessage">send</button>
    </div>
</template>

<script>
//import VueC3 from 'vue-c3'
//import Vue from 'vue'
import 'c3/c3.min.css'

export default {
    components: {
      //VueC3
    },
    data () {
      return {
        //handler: new Vue()
        console : "",
        message : "",
        logs: [],
        status: "disconnected"
      }
    },
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