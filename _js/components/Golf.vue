<template>
    <div class="golf">

      <vue-masonry-wall :items="players" :options="{width: 500, padding: 0}">
        <template v-slot:default="{item}">
          <div class="item">
            <Card :username="item.username" :name="item.name" :target="item.url" :index="item.index" />
          </div>
        </template>
      </vue-masonry-wall>

    </div>
</template>

<script>
  import Card from './Card.vue';
  import VueMasonryWall from 'vue-masonry-wall';

  export default {
    components: { Card, VueMasonryWall },
    data() {
      return {
        players: window.players || []
      }
    },
    mounted() {
        console.log('Component mounted.')
    }
  };
</script>
