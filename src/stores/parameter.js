import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useParameterStore = defineStore("parameter", () => {
  const param = reactive({
    headers: [],
    params: [],
    body: {},
  });
  function setValue(key, value) {
    param[key] = value;
  }

  function getValue(key) {
    return param[key];
  }

  return { param, setValue, getValue };
});
