<template>
  <div class="home container-fluid mt-5 back ">
    <div class="row titleBar mt-4">
      <div class="col-2 py-3">
        <button class="btn btn-primary btn-lg ">
          BUG TRACKER
        </button>
      </div>
      <div class="col-10 text-right py-3">
        <button
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          REPORT
        </button>

        <modal-component />
      </div>
    </div>
    <!-- <div class="
                row
                mt-5
                ml-4"
        >
          <div class="col-9 text-left display-4">
            <h1>Current Bugs</h1>
          </div>
          <div class="col-3">
            <input class="mr-1" type="checkbox" id="hideClosed" name="hideClosed" value="Bike">
            <label for="hideClodes">Hide Closed</label><br>
          </div>
        </button>
      </div> -->
    <div class="container" v-if="state.user.isAuthenticated">
      <div class="row mt-5 ml-4 text-light">
        <div class="col-9 text-left display-4">
          <h1>Current Bugs</h1>
        </div>
        <div class="col-3">
          <button class="btn btn-warning" @click="hide">
            Hide Closed
          </button>
          <!-- <input class="mr-1"
                 type="checkbox"
                 id="hideClosed"
                 name="hideClosed"
                 value="Bike"
                 v-if="state.isChecked"
          > -->
          <!-- <label for="hideClodes">Hide Closed</label><br> -->
          <s v-if="state.bugs.closed==true"><bugs-component
            v-for="bug in state.bugs"
            :key="bug._id"
            :bug-prop="bug"
          /></s>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table class="box text-light">
            <tr>
              <th>Title</th>
              <!-- <th>Description</th> -->
              <th>Reported By</th>
              <th>Closed Date</th>
              <th>Status</th>
            </tr>
            <!-- <tr> -->
            <bugs-component v-for="bug in state.bugs"
                            :key="bug._id"
                            :bug-prop="bug"
            />
            <!-- </tr> -->
          </table>
        </div>
      </div>

      <!-- <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo"> -->
      <!-- <h1 class="my-5 bg-dark text-light p-3 rounded d-flex align-items-center">
      <span class="mx-2 text-white">Vue 3 Starter</span>
    </h1> -->
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import BugsComponent from '../components/BugsComponent.vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { bugService } from '../services/BugService'
import ModalComponent from '../components/ModalComponent.vue'
export default {
  components: { BugsComponent, ModalComponent },
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user),
      isChecked: ''
    })
    onMounted(async() => {
      try {
        await bugService.getAll()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      hide() {
        AppState.bugs.sort(function(a, b) {
          return b.closed - a.closed
        })
      }
      // async hide() {
      //   try {
      //     const data = { closed: state.bugs.closed === true }
      //     await bugService.hide(data)
      //   } catch (error) {
      //     logger.error(error)
      //   }
      // }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
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
.back{
   background: rgb(5, 5, 5) !important;
background: linear-gradient(90deg, rgb(20, 20, 20) 4%, rgba(198,50,50,1) 50%, rgba(0,0,0,1) 96%) !important;
}
.titleBar{
  background: rgb(5, 5, 5) !important;
background: linear-gradient(90deg, rgb(65, 27, 27) 4%, rgb(207, 115, 115) 50%, rgb(71, 26, 26) 96%) !important;
}
.box{
  box-shadow: 4px 4px 10px 15px rgb(163, 111, 120);
}
</style>
