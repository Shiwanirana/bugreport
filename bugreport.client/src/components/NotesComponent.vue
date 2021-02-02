<template>
  <tr>
    <td>{{ noteProp.creatorEmail }}</td>
    <td>{{ noteProp.content }}</td>
    <td class="text-center" v-if="noteProp.creatorEmail == state.user.email">
      <i class="fa fa-trash text-danger pointer" @click="deleteNotes" aria-hidden="true"></i>
    </td>
  </tr>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { noteService } from '../services/NoteService'
import { logger } from '../utils/Logger'
export default {
  name: 'NotesComponent',
  props: {
    noteProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      notes: computed(() => AppState.notes)
    })
    return {
      state,
      async deleteNotes() {
        try {
          // eslint-disable-next-line no-undef
          swal('Deleted', 'congratulation on deleting a note', 'success')
          await noteService.deleteNotes(props.noteProp.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>
<style scoped>
.pointer{
  cursor: pointer;
}
</style>
