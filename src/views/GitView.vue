<script setup>
import { ref, onMounted } from 'vue';
import { fetch } from '@tauri-apps/plugin-http';
import { useRoute } from 'vue-router';
const route = useRoute();
import { Command } from '@tauri-apps/plugin-shell';


onMounted(async () => {
    // const command = Command.create('node');
    // command.on('close', data => {
    //     console.log(`command finished with code ${data.code} and signal ${data.signal}`)
    // });
    // command.on('error', error => console.error(`command error: "${error}"`));
    // command.stdout.on('data', line => console.log(`command stdout: "${line}"`));
    // command.stderr.on('data', line => console.log(`command stderr: "${line}"`));

    // const child = await command.spawn();
    // console.log('pid:', child.pid);

    let result = await Command.create('run-git-commit', ['-t', '192.168.61.188'])
    console.log(result);
})
</script>

<template>
    <div>
        123
    </div>
</template>
