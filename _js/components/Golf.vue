<template>
    <div class="golf">

      <vue-masonry-wall :items="targetScorecards" :options="{width: 700, padding: 0}">
        <template v-slot:default="{item}">
          <div class="item">
            <Card :name="item.name" :target="item.url" :index="item.index" />
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
        targetScorecards: [
          {name: 'Grounds Keeper', index: 0, url: 'https://github.com/bogstandard/lapland-golf-club/blob/main/Keeper/.scorecard'},
          {name: 'Ben', index: 1, url: 'https://github.com/Gerome/AdventOfCode2020/blob/main/Ben/.scorecard'},
          {name: 'Gerome', index: 2, url: 'https://github.com/Gerome/AdventOfCode2020/blob/main/Gerome/.scorecard'},
          {name: 'Joe', index: 3, url: 'https://github.com/Gerome/AdventOfCode2020/blob/main/Joe/.scorecard'},
          {name: 'Eric', index: 4, url: 'https://github.com/Gerome/AdventOfCode2020/blob/main/Eric/.scorecard'}
        ]
      }
    },
    mounted() {
        console.log('Component mounted.')
    }
  };
</script>
