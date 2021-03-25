<template>
  <div>
    <v-container>
      <v-form>
        <v-row>
          <v-select
            :label="$t('skills')"
            :items="skills"
            v-model="selected"
            v-on:input="selectable"
            multiple
            chips
          >
          </v-select>
        </v-row>
        <v-row>
          <v-col v-for="skill in selected_skills" :key="skill.value" cols="12" md="2" class="d-flex align-baseline">
            <v-subheader>{{skill.text}}</v-subheader>
            <v-text-field
              v-model="skill.score"
              label="Score"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="5"> </v-col>
          <v-col cols="12" md="2" class="d-flex align-baseline">
            <!-- TODO: skill picker goes here -->
            <!-- https://vuetifyjs.com/en/components/combobox/#advanced-custom-options -->
            <!-- <v-text-field
              cols="12"
              sm="5"
              md="5"
              :placeholder="`${$t('search-user')}:`"
              solo
              dense
              v-model="filter.q"
              :rules="[rules.required, rules.counter]"
            >
            </v-text-field> -->
            <v-btn cols="12" sm="1" md="1" class="ml-2" @click="loadJobs()">
              {{ $t("search") }}
            </v-btn>
          </v-col>
          <v-col cols="12" md="5"> </v-col>
        </v-row>
        <v-row v-if="jobs.length > 0">
          <v-col>
            <div justify="center" align="center">
              {{ filter.total_count }} results
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex"

export default {
  name: "dashboard",

  computed: {
    ...mapState({
      loading: (state) => state.jobscan.isLoading,
      skills_origin: (state) => state.jobscan.skills,
      jobs: (state) => state.jobscan.jobs,
    }),
  },

  data() {
    return {
      skills: [],
      selected: [],
      selected_skills: []
    }
  },

  watch: {
    selected(val) {
      this.selected_skills = this.skills.filter(skill => val.includes(skill.value))
    }
  },

  methods: {
    ...mapActions("jobscan", ["getJobs", "getSkills", "setLoading"]),

    async loadSkills() {
      try {
        this.setLoading(true)

        await this.getSkills()

        this.skills = []

        this.skills_origin.forEach((skill) => {
          this.skills.push({
            score: 1,
            text: skill.name,
            value: skill.id,
          })
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.setLoading(false)
      }
    },

    async loadJobs() {
      try {
        this.setLoading(true)

        // prepare data
        let scores = []
        let skills = []
        this.selected_skills.forEach(skill => {
          scores.push(skill.score)
          skills.push(skill.value)
        })
        const data = {
          scores: scores.join(','),
          skills: skills.join(','),
        }

        await this.getJobs(data)
      } catch (error) {
        console.log(error)
      } finally {
        this.setLoading(false)
      }
    },

    selectable(e) {
      if (e.length > 10) {
        e.pop()
      }
    },

    removeItem(id) {
      this.selected = this.selected.filter(value => value !== id)
    },
  },

  mounted() {
    this.loadSkills()
  },
}
</script>
