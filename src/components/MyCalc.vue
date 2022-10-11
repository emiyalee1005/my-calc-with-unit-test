<script setup lang="ts">
import { computed, shallowRef } from "vue";

const expr = shallowRef("");

function onClick(arg: string | number) {
  if (arg === "DEL") {
    expr.value = expr.value.substring(0, expr.value.length - 1);
    return;
  }
  expr.value += arg.toString();
}

const result = computed(() => {
  try {
    return eval(expr.value);
  } catch (e) {
    return "";
  }
});
</script>

<template>
  <div class="my-calc">
    <div class="result">
      <span class="expr">{{ expr }}</span> =
      <span class="result-number">{{ result }}</span>
    </div>
    <div class="keyboard">
      <div
        class="btn"
        v-for="k in 10"
        :key="k"
        :id="`num-${k - 1}`"
        @click="onClick(k - 1)"
      >
        {{ k - 1 }}
      </div>
      <div class="btn" @click="onClick('+')" id="btn-plus">+</div>
      <div class="btn" @click="onClick('-')" id="btn-minus">-</div>
      <div class="btn" @click="onClick('DEL')" id="btn-del">DEL</div>
    </div>
  </div>
</template>

<style scoped>
.my-calc {
}

.result {
  display: flex;
  align-items: center;
}

.expr {
  flex: 1;
  text-align: right;
  border: 1px solid #ddd;
  height: 40px;
  line-height: 40px;
  padding: 0 16px;
}

.result-number {
  padding: 0 16px;
  flex: 1;
  border: 1px solid #ddd;
  height: 40px;
  line-height: 40px;
}

.keyboard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.btn {
  width: 30%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background-color: cornflowerblue;
  color: #fff;
  margin: 3px;
}
</style>
