export default {

  mounted() {
    // Convert $refs to jquery objects
    for (let ref in this.$refs) {
      this[`$${ref}`] = $(this.$refs[ref])
    }

  }

}