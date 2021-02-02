<template>
  <!-- <div class="row">
    <div class="col">
      <table>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Reported By</th>
          <th>Closed Date</th>
          <th>Status</th>
        </tr> -->

  <tr>
    <router-link :to="{name: 'Active', params:{id: bugProp._id}}">
      <td>{{ bugProp.title }}</td>
    </router-link>
    <!-- <td>{{ bugProp.description }}</td> -->
    <td>{{ bugProp.creatorEmail }}</td>
    <td>{{ bugProp.closedDate }}</td>
    <td class="openColor" v-if="bugProp.closed==false">
      Open
    </td>
    <td class="closedColor" v-else-if="bugProp.closed==true">
      Closed
    </td>
    <!-- <td>{{ bugProp.closed }}</td> -->
  </tr>

  <!-- </table>
    </div>
  </div> -->
</template>
<script>
import { reactive } from 'vue'
export default {
  name: 'BugsComponent',
  props: {
    bugProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({

    })
    return {
      state
    }
  }
}
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.openColor{
  color: green;
}
.closedColor{
  color: red
  ;
}
.box{
  box-shadow: #dddddd;
}
</style>
