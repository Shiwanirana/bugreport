<template>
  <!-- Button trigger modal -->
  <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    Launch demo modal
  </button> -->

  <!-- Modal -->
  <div class="modal fade"
       id="exampleModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Report Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="create()">
            <div class="row mb-4">
              <div class="col-6 text-left">
                <label for="title">Title</label><br>
                <input class="border-0"
                       placeholder="Title..."
                       name="create"
                       type="text"
                       v-model="state.new.title"
                       required
                >
              </div>
              <div class="col-6">
                <small>Reported By</small><br>
                <small><b>{{ state.user.name }}</b></small>
              </div>
            </div>
            <div class="row">
              <div class="col text-left">
                <label for="comment">Comment</label><br>
                <textarea class="textdes"
                          placeholder="Your Comment here..."
                          name="description"
                          v-model="state.new.description"
                          cols="58"
                          rows="8"
                          maxlength="250"
                ></textarea>
              </div>
            </div>

            <div
              class="modal-footer"
            >
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <!-- <router-push :to="{path: '/active/'+ state.new._id}"> -->
              <button type="submit" class="btn btn-success">
                Submit
              </button>
              <!-- </router-push> -->
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
import { bugService } from '../services/BugService'
import { logger } from '../utils/Logger'
// eslint-disable-next-line no-unused-vars
import router from '../router'
import { useRouter } from 'vue-router'
// import { useRouter } from 'vue-router'
export default {
  name: 'ModalComponent',
  component: 'BugComponent',
  props: {
    modalProp: {
      type: Object,
      required: true
    }
    // bugProp: {
    //   type: Object,
    //   required: true
    // }
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      new: {},
      user: computed(() => AppState.user),
      active: computed(() => AppState.activeBug),
      bugs: computed(() => AppState.bugs)
    })
    return {
      state,
      async create() {
        try {
          const id = await bugService.create(state.new)
          state.new = {}
          router.push({ name: 'Active', params: { id } })
          // add router push
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
