<script setup>
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Command, Child } from "@tauri-apps/plugin-shell";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
const route = useRoute();
const router = useRouter();
const list = reactive([
  {
    name: "",
    Command: "serve",
    path: "~",
    Description: "",
    pid: "",
    stdout: "",
    stderr: "",
    error: "",
  },
]);

onMounted(() => {
  hljs.highlightElement(document.querySelector(".stdout"));
  hljs.highlightElement(document.querySelector(".error"));
  hljs.highlightElement(document.querySelector(".stderr"));
});
const init = (index) => {
  console.log("init");
  list[index].stdout = "";
  list[index].stderr = "";
  list[index].error = "";
};

const run = async (index) => {
  console.log("run");
  init(index);
  const command = Command.create("node", [
    "-c",
    `cd ${list[index].path};` + list[index].Command,
  ]);
  console.log("command", command);
  command.on("close", (data) => {
    console.log(
      `command finished with code ${data.code} and signal ${data.signal}`
    );
    list[index].pid = "";
  });
  command.on("error", (error) => {
    console.error(`command error: "${error}"`);
    list[index].error += error;
  });
  command.stdout.on("data", (line) => {
    console.log(`command stdout: "${line}"`);
    list[index].stdout += line;
  });
  command.stderr.on("data", (line) => {
    console.log(`command stderr: "${line}"`);
    list[index].stderr += line;
  });

  const child = await command.spawn();
  // await child.write("message");
  // await child.write([0, 1, 2, 3, 4, 5]);
  console.log("child:", child);
  console.log("pid:", child.pid);
  list[index].pid = child.pid;
};

const kill = async (index) => {
  let child = await new Child(list[index].pid);
  child.kill();
};
</script>

<template>
  <div class="container">
    <div v-for="(proccess, index) in list" :key="index" class="proccess">
      <div>
        <el-button type="primary" @click="run(index)">Primary</el-button>
        <el-button v-if="proccess.pid != ''" type="primary" @click="kill(index)"
          >Close</el-button
        >
        {{ proccess.pid }}
      </div>

      <code class="stdout hljs">{{ list[index].stdout }}</code>
      <code class="stderr hljs">{{ list[index].stderr }}</code>
      <code class="error hljs">{{ list[index].error }}</code>
    </div>
  </div>
</template>

<style scoped>
.proccess {
  padding: 10px;
  border: solid 1px #333;
}
.hljs {
  display: inline-block;
  width: 30%;
  border: solid 1px #333;
  white-space: pre;
  overflow: auto;
  height: 500px;
}
</style>
