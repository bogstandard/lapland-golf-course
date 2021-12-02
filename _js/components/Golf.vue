<template>
    <div class="golf">

      <div class="card" style="transform: rotate(2deg)">

        <div class="card__row">
          <div class="card__heading card__heading--big">Club Scoreboard</div>
        </div>

        <div class="card__row">
          <div class="card__heading">Rank</div>
          <div class="card__heading">Golfer</div>
          <div class="card__heading">Total</div>
          <div class="card__heading">Avg.</div>
        </div>

        <div class="card__row"  v-for="(player, pos) in orderedPlayers">
          <div class="card__cell card__cell--big">{{ pos+1 }}{{ [,'st','nd','rd'][10%10^1&&pos+1%10]||'th' }}</div>
          <div class="card__cell">
            {{ player.name }}
          </div>
          <div class="card__cell">{{ player.total }}</div>
          <div class="card__cell">{{ player.average }}</div>

        </div>

      </div>

      <vue-masonry-wall :items="players" :options="{width: 500, padding: 0}">
        <template v-slot:default="{item}">
          <div class="item">
            <Card :username="item.username" :name="item.name" :target="item.url" :index="item.index" @done="(data) => {handleUpdate(data, item.index)}" />
          </div>
        </template>
      </vue-masonry-wall>

    </div>
</template>

<script>
  import Card from './Card.vue';
  import VueMasonryWall from 'vue-masonry-wall';
  import Vue from 'vue';

  export default {
    components: { Card, VueMasonryWall },
    data() {
      return {
        players: window.players || [],
        finalPlayers: []
      }
    },
    methods: {
      handleUpdate(data, index) {
        if(this.finalPlayers.filter(p => p.index === data.index).length === 0) {
          this.finalPlayers.push(data);
        }
      }
    },
    computed: {
      orderedPlayers: function () {
        return this.finalPlayers.sort((a, b) => {
          return (a.average > b.average) ? 1 : (a.average === b.average) ? ((a.total > b.total) ? 1 : -1) : -1
        });
      }
    }
  };
</script>
