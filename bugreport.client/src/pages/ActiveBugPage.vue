<template>
  <div class="container-fluid back mt-5">
    <div class="row titleBar mt-4">
      <div class="col-2 py-3">
        <button class="btn btn-primary btn-lg ">
          BUG TRACKER
        </button>
      </div>
      <div class="col-10 text-right py-3">
        <button class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
        >
          REPORT
        </button>
        <modal-component />
      </div>
    </div>
    <div class="row my-5 text-light">
      <div class="col ">
        <h5 class="m-0">
          Title
        </h5>
        <span class="display-1">
          <b> {{ state.active.title }}</b>
        </span>
      </div>
    </div>
    <div class="row text-light">
      <div class="col-10 d-flex ">
        <p class="mr-2 mb-0 align-self-center">
          Reported by:
        </p><h3 class="name">
          {{ state.active.creatorEmail }}
        </h3>
      </div>
      <div class="col-2 d-flex">
        <p class="mr-2 mb-0 align-self-center">
          Status:
        </p><span class="openColor" v-if="state.active.closed==false">Open</span>
        <span class="closedColor" v-else-if="state.active.closed==true">Closed</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card text-left boxCard">
          <div class="card-body">
            <h4 class="card-title">
              Description
            </h4>
            <p class="card-text">
              {{ state.active.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="state.active.creatorEmail==state.user.email">
      <div class="col-6 mt-2" v-if="state.active.closed==false">
        <i class="fa fa-pencil col-2 text-light"
           data-toggle="collapse"
           data-target="#collapseBug"
           aria-expanded="false"
           aria-controls="collapseBug"
        ><small>Edit Bug</small></i>
      </div>

      <div class="collapse row justify-content-center p-2" id="collapseBug">
        <form @submit.prevent="editBug" class="col-10 form-reset">
          <div class=" card p-3">
            <label for="title">Title</label><br>
            <input class="border-0"
                   placeholder="Edit Title..."
                   name="create"
                   type="text"
                   v-model="state.edit.title"
                   required
            >
            <textarea cols="60" rows="8" placeholder="Edit details..." v-model="state.edit.description" required></textarea>
            <div class="d-flex p-3">
              <button type="submit" class="btn btn-sm btn-info fit-content">
                Save
              </button>
              <button type="button" class="btn btn-sm btn-danger fit-content" @click="state.edit=''">
                close
              </button>
            </div>
          </div>
        </form>
      </div>
      <!-- <button class="btn btn-info btn-lg"
              v-if="state.user.isAuthenticated && state.active.closed==false"
              type="button"
              data-toggle="modal"
              data-target="#editBug"
              aria-expanded="false"
              aria-controls="collapseExample"
      >
        Edit
      </button>
      <div class="modal fade"
           id="editBug"
           tabindex="-1"
           role="dialog"
           aria-labelledby="editBugFormLabel"
           aria-hidden="true"
      >
        <form @submit.prevent="editBug">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="title">
                  <input type="text" :placeholder="state.active.title" v-model="state.edit.title">
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <textarea :placeholder="state.active.description" cols="60" rows="10" v-model="state.edit.description"></textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div> -->
      <!-- <div class="collapse" id="editBug">
          <div class="d-flex justify-content-center mb-2 text-light">
            <form @submit.prevent="editBoard()">
              <h4>Edit Board</h4>
              <input type="text"
                     id="edit"
                     name="edit"
                     required
                     v-model="state.edit"
              >
              <button type="submit" class="btn btn-success mx-3" :data-target="'#c' + boardProp._id">
                Submit Changes
              </button>
              <button type="button" class="btn btn-danger" :data-target="'#c' + boardProp._id" data-toggle="collapse" @click="state.edit=''">
                Cancel
              </button>
            </form> -->
      <!-- </div>
        </div> -->

      <div class="col-6 text-right mt-2">
        <button class="btn btn-danger btn-lg" v-if="state.active.closed==false" @click="closeBug">
          Close
        </button>
        <button class="btn btn-danger btn-lg" v-else-if="state.active.closed==true">
          Closed
        </button>
      </div>
    </div>
    <div class="row text-light mt-5">
      <div class="col">
        <h1 class="display-4">
          <b>Notes</b>
        </h1>
      </div>
    </div>
    <div class="container" v-if="state.user.isAuthenticated">
      <div class="row">
        <div class="col">
          <table class="box">
            <tr class="text-light">
              <th>Name</th>
              <th>Message</th>
              <th class="text-center">
                Delete
              </th>
            </tr>
            <!-- <tr> -->
            <notes-component v-for="note in state.notes"
                             :key="note._id"
                             :note-prop="note"
            />
          <!-- </tr> -->
          </table>
        </div>
      </div>
    </div>
    <div class="row my-3">
      <div class="col text-right">
        <button class="btn btn-success btn-lg" data-toggle="modal" data-target="#addNotes">
          Add
        </button>
        <notes-modal-component />
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { bugService } from '../services/BugService'
import { logger } from '../utils/Logger'
import { noteService } from '../services/NoteService'
import NotesComponent from '../components/NotesComponent.vue'
import NotesModalComponent from '../components/NotesModalComponent.vue'
import $ from 'jquery'
// import { NotificationService } from '../services/NotificationService'
export default {
  components: { NotesComponent, NotesModalComponent },
  name: 'ActiveBugPage',
  props: {
    activeProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      active: computed(() => AppState.activeBug),
      user: computed(() => AppState.user),
      notes: computed(() => AppState.notes),
      edit: {}
    })
    onMounted(async() => {
      try {
        await bugService.getOne(route.params.id)
        await noteService.getAll(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async closeBug() {
        try {
          // if (await NotificationService.confirmAction('Are you sure you want to close this bug?', 'This is what you want')) {
          const data = { closed: true, closedDate: new Date() }
          // eslint-disable-next-line no-undef
          swal({
            title: 'Are you Sure?',
            text: 'This cannot be undone',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,delete it!!'
          })
          await bugService.closeBug(state.active.id, data)

          // }
        } catch (error) {
          logger.error(error)
        }
      },
      async editBug() {
        try {
          const data = { title: state.edit.title, description: state.edit.description }

          await bugService.editBug(state.active.id, data)
          $('#collapseBug').collapse('hide')
        } catch (error) {
          logger.error(error)
        }
      }

    }
  }
}
</script>
<style scoped>
.openColor{
  color: green;
  font-size: 40px;
}
.closedColor{
  color: red;
  font-size: 40px;
}
.name{
   font-size: 40px;
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
background: linear-gradient(90deg, rgba(0,0,0,1) 4%, rgba(198,50,50,1) 50%, rgba(0,0,0,1) 96%) !important;
}
.titleBar{
  background: rgb(5, 5, 5) !important;
background: linear-gradient(90deg, rgb(65, 27, 27) 4%, rgb(207, 115, 115) 50%, rgb(71, 26, 26) 96%) !important;
}
.box{
  box-shadow: 4px 4px 10px 10px rgb(163, 73, 88);
}
.boxCard{
  box-shadow: 4px 4px 10px 8px rgb(209, 58, 83);
}
</style>
