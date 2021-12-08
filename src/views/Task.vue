<template>
  <v-container>
    <v-row class="text-center">
      <div>Task: {{ $route.params.item }}</div>
    </v-row>
  </v-container>
</template>

<script>
// import Resources from "@/services/utils/resources/resources";

// const ResourcesService = new Resources();


  export default {
    name: 'task',
    data: () => ({

    }),
    methods: {

    },
    mounted() {
      this.$i18n.locale= 'en' 
    },
    watch: {

    },
  }
</script>




<script>


  export default {
    data () {
      return {
 
      };
    }
  };
</script>
