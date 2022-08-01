<template>
  <div @click="download" class="card-container">
    <span class="doc__title"> {{ card.doc_name }} </span>
    <span> от </span>
    <span class="doc__cont"> {{ card.date_doc }} </span>
  </div>
</template>
<script>
export default {
  name: "card",
  methods: {
    download() {
      this.$emit("download", {
        document: this.card.id_document,
        type: this.card.doc_type,
      });
    },
  },
  props: {
    card: {
      type: Object,
      require: true,
    },
  },
};
</script>

<style>
.card-container {
  margin-bottom: 8px;
}
.doc__title {
  font-weight: 600;
}
</style>
