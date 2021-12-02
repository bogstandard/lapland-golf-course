<template>
    <div class="card" :style="`transform: rotate(${tilt}deg);`">
      <div class="loading-bar" :class="{'visible': isLoading}" :style="`width: ${(100 * holes.length) / incoming}%;`"></div>

      <div class="card__langs">
        <span class="card__lang" v-for="(value, lang) in langs" :key="lang">{{ lang }}</span>
      </div>


      <img v-if="username.length" :src="`https://github.com/${username}.png?size=100`" alt="">

      <div class="card__row" @click="showTarget">
        <div class="card__cell">
          {{ name }}

          <span class="loading-text" v-if="isLoading">loaded .. {{ holes.length }} / {{ incoming }}</span>

        </div>
      </div>

      <div class="card__row" v-if="broken">
        <div class="card__cell">Something is wrong with this scorecard, check club config</div>
      </div>

      <div class="card__row">
        <div class="card__heading">No.</div>
        <div class="card__heading">Score</div>
        <div class="card__heading">Total</div>
        <div class="card__heading">Avg.</div>
      </div>

      <div class="card__row" v-for="(hole, i) in holes" :key="i" @click="showSolution(hole)">
        <div class="card__cell">{{ hole.label }}</div>
        <template v-if="hole.broken">
          <div class="card__cell">Something is wrong with this solution, check scorecard</div>
        </template>
        <template v-if="!hole.broken">
          <div class="card__cell">{{ hole.score }}</div>
          <div class="card__cell">{{ hole.runningTotal }}</div>
          <div class="card__cell">{{ i ? hole.runningAverage : hole.score }}</div>
        </template>
      </div>

    </div>
</template>

<script>
  import languages from '../langs.json';

  export default {
      props: {
        username: {
          type: String,
          default: ""
        },
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
          broken: false,
          incoming: 0,
          holes: [

          ],
          total: 0,
          average: 0,
          tilt: 0,
          langs: {}
        }
      },
      methods: {
        showTarget: function() {
          window.location.href = this.target;
        },
        showSolution: function(hole) {
          const santizedText = hole.original.replace(/&/g, '&amp;')
                                            .replace(/</g, '&lt;')
                                            .replace(/>/g, '&gt;')
                                            .replace(/"/g, '&quot;');

          this.$swal({
            title: hole.label,
            html:
              `<pre><code>${santizedText}</code></pre>`,
            showCloseButton: true,
            focusCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            width: 600,
            backdrop: 'rgba(0,0,0,0.2)'
          });
        },
        getLang(path) {
          const matches = languages.filter(lang => {
            lang.extensions = lang.extensions || [];
            return lang.extensions.filter(ext => {
              return path.endsWith(ext);
            }).length > 0;
          });
          return matches.length > 0 ? matches[0].name : 'Unknown';
        }
      },
      async mounted() {

        this.tilt =  (Math.random() * 0.66) * (Math.round(this.index % 2 == 0) ? 1 : -1);

        // Fetch Scorecard
        let scres;
        try {
          scres = await fetch(`https://raw.githubusercontent.com/${this.path}`, {cache: 'no-store'});
          if (!scres.ok) throw new Error(scres.statusText);
          scres = await scres.text();
        } catch (err) {
          this.broken = true;
        }

        // Parse Scorecard
        const holes = this.broken ? [] : scres.split('\n')
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

            this.incoming = holes.length;

            // Foreach Hole found in Scorecard
            // Tally up!
            for (let h of holes) {
              let lang = this.getLang(h.path);
              let broken = false;
              this.langs[lang] = ++this.langs[lang] || 1;

              let hres;
              try {
                hres = await fetch(`https://raw.githubusercontent.com/${this.dir}${h.path}`, {cache: 'no-store'});
                if (!hres.ok) throw new Error(hres.statusText);
                hres = await hres.text();
              } catch (err) {
                broken = true;
              }

              const cured = broken ? '' : hres.split('\n')
                               .map(line => line.trim())
                               .filter(line => line.length && !(line.startsWith('#') || line.startsWith('//')))
                               .join('');

              this.holes.push({
                  label: h.label,
                  original: hres,
                  cured: cured,
                  score: cured.length,
                  runningTotal: broken ? this.total : this.total+=cured.length,
                  runningAverage: broken ? this.average : this.average=parseInt(this.total / (this.holes.length + 1)),
                  broken: broken
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
        },
        isLoading: function() {
          return this.holes.length < this.incoming;
        }
      },
  };
</script>
