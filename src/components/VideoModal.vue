<template>
  <b-modal id="modal-video" centered title="Youtube Videosu Ekle" hide-footer>
    <b-form-group label="Youtube linki:">
      <b-input v-model="url" />
    </b-form-group>
    <b-button class="mt-2" @click="insertVideo">Ekle</b-button>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      command: null,
      show: false
    };
  },
  computed: {
    youtubeID() {
      return this.youtubeParser(this.url);
    }
  },
  methods: {
    youtubeParser(url) {
      // eslint-disable-next-line no-useless-escape
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      const match = url.match(regExp);
      return match && match[7].length === 11 ? match[7] : false;
    },
    showModal(command) {
      console.log("...");
      // Add the sent command
      this.command = command;
      this.show = true;
      this.$bvModal.show("modal-video");
    },
    insertVideo() {
      // Some check can be done here, like if `youtubeID` is not false.
      const data = {
        command: this.command,
        data: {
          src: this.youtubeID
        }
      };

      this.$emit("onConfirm", data);
      this.$bvModal.hide("modal-video");
      this.show = false;
    }
  }
};
</script>
