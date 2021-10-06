<template>
    <div class="card" :style="`transform: rotate(${tilt}deg);`">

      <div class="card__row">
        <div class="card__cell">{{ name }}</div>
      </div>

      <div class="card__row">
        <div class="card__heading">No.</div>
        <div class="card__heading">Score</div>
        <div class="card__heading">Total</div>
        <div class="card__heading">Avg.</div>
      </div>

      <div class="card__row" v-bind:class="{'card__row--worse': hole.worse}" v-for="(hole, i) in holes" :key="i">
        <div class="card__cell">{{ hole.label }}</div>
        <div class="card__cell">{{ hole.score }}</div>
        <div class="card__cell">{{ hole.runningTotal }}</div>
        <div class="card__cell">{{ i ? hole.runningAverage : hole.score }}</div>
      </div>

    </div>
</template>

<script>
  export default {
      props: {
        name: {
          type: String,
          default: ""
        },
        index: {
          type: Number,
          default: 0
        },
        target: {
          type: String,
          default: ""
        }
      },
      data() {
        return {
          holes: [

          ],
          total: 0,
          average: 0,
          tilt: 0,
        }
      },
      async mounted() {

        this.tilt =  (Math.random() * 1.5) * (Math.round(this.index % 2 == 0) ? 1 : -1);

        // Fetch Scorecard
        let scres = await fetch(`https://raw.githubusercontent.com/${this.path}`);
        scres = await scres.text();

        // Parse Scorecard
        const holes = scres.split('\n')
                      .map(line => line.trim())
                      .filter(line => line.length && !(line.startsWith('#') || line.startsWith('//') || line.startsWith('@')))
                      .map(line => {
                        const parts = line.split(':').map(p => p.trim());
                        const label = parts.shift();
                        const path = parts.join(':');
                        return {
                          label,
                          path
                        }
                      });

            // Foreach Hole found in Scorecard
            // Tally up!
            for (let h of holes) {
              let hres = await fetch(`https://raw.githubusercontent.com/${this.dir}${h.path}`);
              hres = await hres.text();
              const cured = hres.split('\n')
                               .map(line => line.trim())
                               .filter(line => line.length && !(line.startsWith('#') || line.startsWith('//')))
                               .join('');

              const lastAverage = this.average;

              this.holes.push({
                  label: h.label,
                  original: hres,
                  cured: cured,
                  score: cured.length,
                  runningTotal: this.total+=cured.length,
                  runningAverage: this.average=parseInt(this.total / (this.holes.length + 1)),
                  worse: this.index > 0 && lastAverage < this.average
              });
            }
      },
      computed: {
        path: function() {
          const url = new URL(this.target);
          return url.pathname.replace('/blob/', '/');
        },
        dir: function() {
          return this.path.substr(0, this.path.lastIndexOf('/')) + '/';
        }
      },
  };
</script>
