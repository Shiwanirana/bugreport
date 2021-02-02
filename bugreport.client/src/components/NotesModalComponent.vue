<template>
  <!-- Button trigger modal -->
  <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    Launch demo modal
  </button> -->

  <!-- Modal -->
  <div class="modal fade"
       id="addNotes"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Add Comment
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createNote">
            <div class="row mb-4">
              <div class="col">
                <small>Reported By</small><br>
                <small><b>{{ state.notes.creatorEmail }}</b></small>
              </div>
            </div>
            <div class="row">
              <div class="col text-left">
                <label for="comment">Comment</label><br>
                <textarea class="textdes"
                          placeholder="Your Comment here..."
                          name="description"
                          v-model="state.newNote.content"
                          cols="58"
                          rows="8"
                          maxlength="250"
                ></textarea>
              </div>
            </div>

            <div
              class="modal-footer"
            >
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="state.newNote=''">
                Close
              </button>
              <button type="submit" class="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { noteService } from '../services/NoteService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
// import swal from 'SweetAlert2'
export default {
  name: 'NotesModalComponent',
  props: {
    noteModalProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newNote: {},
      user: computed(() => AppState.user),
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes)
    })
    return {
      state,
      async createNote() {
        try {
          console.log(state.activeBug)
          const data = { bug: state.activeBug.id, content: state.newNote.content }
          // eslint-disable-next-line no-undef
          swal('Added', 'congratulation on adding a note', 'success')
          await noteService.createNote(data)
          $('#addNotes').modal('hide')
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
<style scoped>

</style>
