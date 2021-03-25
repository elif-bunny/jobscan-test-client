<template>
  <div>
    <v-container>
      <v-form>
        <v-row>
          <v-select attach chips multiple :items="skills" :label="$t('skills')">
            <template slot="selection" slot-scope="data">
              <!-- HTML that describe how select should render selected items -->
              {{ data.item.id }} - {{ data.item.name }} - selection
            </template>
            <template slot="item" slot-scope="data">
              <!-- HTML that describe how select should render items when the select is open -->
              <div>{{ data.item.id }} - {{ data.item.name }}</div>
              <v-text-field></v-text-field>
            </template>
          </v-select>
          <div>From</div>
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
      skills: (state) => state.jobscan.skills,
      jobs: (state) => state.jobscan.jobs,
    }),

    selectable() {
      return this.selected.length < 10
    },
  },

  data() {
    return {
      selected: [], // { skill: skill_id, score: 1 ~ 5 }
      items: [],
      names: [],
    }
  },

  methods: {
    ...mapActions("jobscan", ["getJobs", "getSkills", "setLoading"]),

    async loadSkills() {
      try {
        this.setLoading(true)
        await this.getSkills()
        this.items = []
        this.names = []
        this.skills.forEach((skill) => {
          this.items.push(skill.id)
          this.names.push(skill.name)
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
        const data = {}

        await this.getJobs(data)
      } catch (error) {
        console.log(error)
      } finally {
        this.setLoading(false)
      }
    },
  },

  mounted() {
    this.loadSkills()
  },
}
</script>
