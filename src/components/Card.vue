<template>
  <p class="card-container">
    <span class="product__title">{{ card.date_doc }} </span> 
    <span class="product__cont"> {{ card.doc_name }} </span> 
    <span class="product__art"> .{{ card.file_ext }}</span> 
  </p>
</template>
<script>
export default {
  name: "card",
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
  text-align: center;
}
</style>
