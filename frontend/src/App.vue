<template>
  <div class="container-fluid p-0">
    <div class="container-xxl">
      <h6 class="pt-4 pb-4">3rd Party Instruction</h6>
      <CostDetail :submit="SubmitEvent" :typeEvent="TypeEvent"/>
    </div>
    <footer class="py-3 bg-light fixed-bottom">
      <div class="container-xxl">
        <div class="d-flex justify-content-end">
          <div class="d-flex align-items-center flex-row mb-3">
            <div class="p-2">
              <AtomButton @click="buttonSubmit('cancel')" class="btn btn-link" labelButton="Cancel" />
            </div>
            <div class="p-2">
              <AtomButton  @click="buttonSubmit('save to draft')"
                type="submit"
                class="btn btn-bd btn-outline-secondary"
                labelButton="Save a Draft"
              />
            </div>
            <div class="p-2">
              <AtomButton  @click="buttonSubmit('submit')"
                type="submit"
                class="btn btn-bd btn-bd-primary"
                labelButton="Submit"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import CostDetail from "./components/CostDetail.vue";
import AtomButton from "./components/atom/AtomButton.vue";
export default {
  name: "App",
  components: {
    CostDetail,
    AtomButton,
  },
  data(){
    return {
      SubmitEvent:null,
      TypeEvent:null,
    }
  },
  methods:{
    buttonSubmit(type){
      if (this.SubmitEvent === true) {
        this.SubmitEvent = false;
        this.TypeEvent = type;
      }
      else{
        this.SubmitEvent = true;
        this.TypeEvent = type;
      }
    }
  }
};
</script>

<style>
@import "./assets/style.css";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
