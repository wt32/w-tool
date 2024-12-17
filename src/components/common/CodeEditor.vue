<script setup>
import { nextTick, onBeforeMount, onMounted, ref } from "vue";
import { basicSetup, EditorView, minimalSetup } from "codemirror";
import { EditorState, Compartment } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { json } from "@codemirror/lang-json";
import { python } from "@codemirror/lang-python";
import { sql } from "@codemirror/lang-sql";
import { css } from "@codemirror/lang-css";
import { xml } from "@codemirror/lang-xml";
import { yaml } from "@codemirror/lang-yaml";
import { html } from "@codemirror/lang-html";
import { javascript, localCompletionSource } from "@codemirror/lang-javascript";
import { markdown } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { oneDark } from "@codemirror/theme-one-dark";
let id = ref("");

let content = ref("");
let lang = ref("");
const languageConf = new Compartment();
defineProps({
  content: String,
});

function setLang() {
  console.log(`lang.value`, lang.value);
  switch (lang.value) {
    case "js":
    case "javascript":
    case "ts":
    case "jsx":
    case "tsx":
      return javascript();
    case "json":
      return json();
    case "py":
      return python();
    case "sql":
      return sql();
    case "css":
      return css();
    case "xml":
      return xml();
    case "java":
      return java();
    case "vue":
      return vue();
    case "yaml":
      return yaml();
    case "html":
      return html();
    case "markdown":
      return markdown({
        codeLanguages: languages,
      });
    default:
      return basicSetup;
  }
}

const emit = defineEmits(["change"]);
let view = null;
onBeforeMount(() => {
  id.value = "editor" + Math.random().toString(36).substring(2, 15);
});
onMounted(() => {
  console.log("init");
  nextTick(() => {
    init();
  });
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      const newTheme = event.matches ? oneDark : oneLight;
      if (darkThemeStyle.disabled) {
        view.dispatch({
          effects: EditorView.theme(darkTheme),
        });
      } else {
        view.dispatch({
          effects: EditorView.theme(lightTheme),
        });
      }
    });
});
function init() {
  view = null;
  // 初始化字体大小
  let fontSize = 14;
  view = new EditorView({
    doc: "",
    indent: true,
    parent: document.querySelector("#" + id.value),

    extensions: [
      basicSetup,
      // oneDark,
      keymap.of([indentWithTab]),
      languageConf.of(setLang()),
      EditorView.theme({
        ".cm-editor": {
          fontSize: fontSize + "px",
        },
      }),
      // EditorState.readOnly.of(true),
      EditorView.updateListener.of((v) => {
        if (v.docChanged) {
          emit("change", v.state.doc.toString());
        }
      }),
    ],
  });
}

function setValue(value) {
  console.log(value);
  view.dispatch({
    changes: {
      from: 0,
      to: view.state.doc.length,
      insert: value,
    },
    effects: languageConf.reconfigure(setLang()),
    //  effects: EditorState.readOnly.reconfigure(editable)
  });
}

function getValue() {
  return view.state.doc.toString();
}

defineExpose({
  init,
  lang,
  setValue,
  getValue,
});
</script>

<template>
  <div :id="id" class="edit"></div>
</template>

<style lang="less">
.edit {
  max-width: 100%;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  border: 1px solid rgb(205 205 205);
  border-radius: 5px;
  overflow: hidden;

  .cm-editor {
    width: 100%;
    height: 100%;
  }
}

.edit * {
  font-family: Consolas, "Courier New", monospace;
}
</style>
