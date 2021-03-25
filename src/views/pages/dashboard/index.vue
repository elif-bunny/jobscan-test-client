<template>
  <div>
    <v-container>
      <v-form v-model="valid">
        <v-row>
          <v-select
            :items="skills"
            label="Standard"
          >

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
            <v-btn
              cols="12"
              sm="1"
              md="1"
              class="ml-2"
              @click="getJobs()"
              :disabled="!valid"
            >
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
import { mapActions, mapState } from "vuex";

export default {
  name: "dashboard",

  computed: {
    ...mapState({
      loading: (state) => state.jobscan.isLoading,
      skills: (state) => state.jobscan.skills,
      jobs: (state) => state.jobscan.jobs,
    }),

    selectable() {
      return this.selected.length < 10;
    },
  },

  data() {
    return {
      selected: [], // { skill: skill_id, score: 1 ~ 5 }
    };
  },

  methods: {
    ...mapActions("jobscan", ["getJobs", "getSkills", "setLoading"]),

    async getSkills() {
      try {
        this.setLoading(true);
      } catch (error) {
        await this.getSkills();
      } finally {
        this.setLoading(false);
      }
    },

    async getJobs() {
      try {
        this.setLoading(true);
        const data = {};

        await this.getJobs(data);
      } catch (error) {
        console.log(error);
      } finally {
        this.setLoading(false);
      }
    },
  },

  mounted() {
    this.getSkills();
  },
};
</script>
