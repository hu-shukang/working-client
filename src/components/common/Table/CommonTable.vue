<template>
  <table class="draggable-table">
    <thead>
      <th>ID</th>
      <th>Name</th>
    </thead>
    <tbody>
      <tr
        :class="{ dragging: draggingIndex === 0 }"
        draggable="true"
        @dragstart="dragStartHandler($event, 0)"
        @dragend="dragEndHandler($event, 0)"
      >
        <td>1</td>
        <td>Name</td>
      </tr>
      <tr
        :class="{ dragging: draggingIndex === 1 }"
        draggable="true"
        @dragstart="dragStartHandler($event, 1)"
        @dragend="dragEndHandler($event, 1)"
      >
        <td>2</td>
        <td>Name</td>
      </tr>
      <tr
        :class="{ dragging: draggingIndex === 2 }"
        draggable="true"
        @dragstart="dragStartHandler($event, 2)"
        @dragend="dragEndHandler($event, 2)"
      >
        <td>3</td>
        <td>Name</td>
      </tr>
      <tr
        :class="{ dragging: draggingIndex === 3 }"
        draggable="true"
        @dragstart="dragStartHandler($event, 3)"
        @dragend="dragEndHandler($event, 3)"
      >
        <td>4</td>
        <td>Name</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const draggingIndex = ref(-1);

const dragStartHandler = (e: DragEvent, index: number) => {
  console.log(e.target);
  draggingIndex.value = index;
};

const dragEndHandler = (e: DragEvent, index: number) => {
  draggingIndex.value = -1;
};
</script>
<style scoped lang="scss">
.draggable-table {
  width: 100%;
  th,
  td {
    padding: 10px 20px;
    background-color: #ffffff;
    border: 1px solid #000;
  }
  tr {
    &.dragging {
      box-shadow: 0 4px 8px red;
    }
  }
}
</style>
