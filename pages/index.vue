<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-autocomplete
        v-model="city.selected"
        :items="city.search.results"
        :loading="city.search.loading"
        :search-input.sync="city.search.keyword"
        color="white"
        hide-no-data
        hide-selected
        label="City"
        placeholder="Start typing to Search"
        prepend-icon="mdi-map"
        return-object
      ></v-autocomplete>
      <v-row>
        <v-col>
          <v-menu
            v-model="startDateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dates.start"
                label="Start date"
                readonly
                prepend-icon="mdi-calendar-range"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates.start"
              @input="startDateMenu = false"
            ></v-date-picker> </v-menu
        ></v-col>
        <v-col>
          <v-menu
            v-model="endDateMenu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dates.end"
                label="End date"
                readonly
                prepend-icon="mdi-calendar-range"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dates.end"
              @input="endDateMenu = false"
            ></v-date-picker> </v-menu
        ></v-col>
      </v-row>
      <v-row align="center" justify="space-around">
        <v-switch
          v-model="categories.music"
          class="ma-2"
          label="Music"
        ></v-switch>
        <v-switch
          v-model="categories.food"
          class="ma-2"
          label="Food"
        ></v-switch>
        <v-switch
          v-model="categories.fitness"
          class="ma-2"
          label="Fitness"
        ></v-switch>
        <v-switch
          v-model="categories.film"
          class="ma-2"
          label="Film"
        ></v-switch>
        <v-switch
          v-model="categories.drinks"
          class="ma-2"
          label="Drinks"
        ></v-switch>
      </v-row>
      <v-row
        ><v-btn
          block
          color="primary"
          class="ma-2"
          :loading="loading"
          :disabled="loading"
          @click="searchEvent"
          >Search</v-btn
        ></v-row
      >
      <v-row class="align-stretch justify-space-around">
        <v-data-table
          :headers="events.headers"
          :items="events.items"
          item-key="name"
          show-select
          :items-per-page="500"
          hide-default-footer
          disable-pagination
          loading-text="Searching..."
          class="elevation-1"
          dense
          :loading="events.loading"
        >
          <template v-slot:item.host.name="{ item }">
            <template v-if="item.host">
              <v-row dense>
                <v-col cols="2" class="flex-shrink-1">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        x-small
                        text
                        @click="findPage({eventId : item.id})"
                        v-on="on"
                        ><v-icon small>mdi-information</v-icon></v-btn
                      ></template>
                    <span>Find contact information</span>
                  </v-tooltip>

                </v-col>
                <v-col cols="10" class="flex-grow-1">
                  <a :href="'https://fb.com/' + item.host.id" target="_blank" class="d-block">{{
                    item.host.name
                  }}</a>
                  <v-progress-circular v-if="item.host.loading" size="22" width="2"
                    indeterminate
                    color="red"
                  ></v-progress-circular>
                  </v-col
                >
              </v-row>
                <template v-if="item.host.details" class="d-block">
                  <v-row v-if="item.host.details.address" dense>
                    <v-col cols="2" class="d-flex"><v-icon small right>mdi-map-marker</v-icon></v-col>
                    <v-col cols="10" class="caption">{{item.host.details.address}}</v-col>
                  </v-row>
                   <v-row v-if="item.host.details.email" dense>
                    <v-col cols="2" class="d-flex"><v-icon small right>mdi-email</v-icon></v-col>
                    <v-col cols="10"  class="caption">{{item.host.details.email}}</v-col>
                  </v-row>
                   <v-row v-if="item.host.details.phone" dense>
                    <v-col cols="2" class="d-flex"><v-icon small right>mdi-phone</v-icon></v-col>
                    <v-col cols="10"  class="caption">{{item.host.details.phone}}</v-col>
                  </v-row>
                   <v-row v-if="item.host.details.website" dense>
                    <v-col cols="2" class="d-flex"><v-icon small right>mdi-web</v-icon></v-col>
                    <v-col cols="10"  class="caption">{{item.host.details.website}}</v-col>
                  </v-row>
                  </template>
            </template>
          </template>
          <template v-slot:item.date="{ item }">
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ item.date }}</span>
              </template>
            <span>{{item.time}}</span>
          </v-tooltip>
          </template>
          <template v-slot:item.title="{ item }">
            <a :href="'https://fb.com/' + item.id" target="_blank" class="d-block">{{
              item.title
            }}</a>
            <template v-if="item.socialContext"><div  class="d-block text-left caption">{{item.socialContext}}</div></template>

          </template>
          <template v-slot:item.location="{ item }">
            <template v-if="item.location">
              <a class="d-block" target="_blank" :href="'https://maps.google.com?q=' +  item.location">{{ item.location.split('·')[0].trim() }}</a>
              <span class="caption">{{ item.location.split('·').pop().trim() }}</span>
            </template>
          </template>
          <template v-slot:item.buyTicketHost="{ item }">
            <template v-if="item.buyTicketHost">
              <v-icon x-small="">mdi-ticket</v-icon>
              <a :href="item.buyticketUrl" target="_blank">{{ item.buyTicketHost }}</a>
            </template>
            <template v-else-if="item.isFreeEvent">Free</template>
            <template v-else>n/a</template>
          </template>
        </v-data-table>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  watch: {
    async loader() {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 3000)
      this.loader = null
    },
    'city.search.keyword': function() {
      this.debouncedSearchCity()
    },
    dates: function() {
      console.log(`start date! ${this.dates.start}`)
    }
  },
  computed: {},

  methods: {
    buildQueryString: function() {
      const findCategoryId = categories => {
        const categoryIds = []
        const categoryDictionary = [
          ['1821948261404481', 'music'],
          ['370585540007142', 'food'],
          ['412284995786529', 'drinks'],
          ['1138994019544264', 'fitness'],
          ['392955781081975', 'film']
        ]
        categoryDictionary.forEach(i => {
          const [id, _cat] = i
          if (categories.includes(_cat)) categoryIds.push(id)
        })
        return categoryIds
      }

      const categoryList = { ...this.categories }
      const selectedCategories = findCategoryId(
        Object.keys(categoryList).filter(p => categoryList[p])
      ).join(',')
      const paginationQueryString = this.events.paginationCursor
        ? `&paginationCursor=${this.events.paginationCursor}`
        : ''
      const maxPageCount = 5
      const qs = `?maxPageCount=${maxPageCount}&city=${this.city.selected.value}&startDate=${this.dates.start}&endDate=${this.dates.end}&categories=${selectedCategories}${paginationQueryString}`
      return qs
    },

    searchCity: async function() {
      const { keyword } = this.city.search,
        selected = (this.city.selected || {}).text || ''

      if (!keyword || keyword == selected) return

      this.city.search.loading = true

      console.log(`searching for ${keyword}...`)
      this.$axios.$get(`/api/city?q=${keyword}`).then(res => {
        this.city.search.results = res
        this.city.search.loading = false
      })
    },
    searchEvent: async function({ append = false }) {
      this.events.loading = true
      console.log(
        `Searching for events... ${this.$nuxt.$moment()} /api/events${this.buildQueryString()}`
      )

      await this.$axios
        .$get(`/api/events${this.buildQueryString()}`)
        .then(response => {
          console.log(response)
          const { events, paginationCursor, hasNextPage } = response
          if (append) this.events.items.push(...events)
          else this.events.items = events
          this.events.hasNextPage = hasNextPage
          this.events.paginationCursor = paginationCursor
          this.events.loading = false

          console.log(this.events.items)
        })
    },
    searchMore: async function() {
      if (
        this.events.items.length > 0 &&
        this.events.hasNextPage &&
        this.events.paginationCursor &&
        !this.events.loading
      ) {
        console.log(`Searching for MORE events... ${this.$nuxt.$moment()}`)
        await this.searchEvent({ append: true })
      }
    },
    onScroll: function() {
      const isAtTheBottomOfPage =
        window.innerHeight + window.scrollY >= document.body.offsetHeight

      if (isAtTheBottomOfPage) {
        console.log(`bottom out!${this.$nuxt.$moment().toISOString()}`)
        this.searchMore()
      }
    },
    findPage: async function({ eventId }) {

      const item = this.events.items.find(p => p.id == eventId)
      if(!item.host) return;
      this.$set(item.host, 'loading', true);
      console.log('finding page...')
       await this.$axios.$get("/api/page/find?id=" + item.host.id).then(response => {
        this.$set(item.host, 'loading', false);
        if(!response) return;
        const {address = '', email = '', phone = '', website = ''} = response
        console.log({email, phone, website, address})
        this.$set(item.host, 'details', {address, email, phone, website})
      });
    }
  },

  data() {
    return {
      categories: {
        music: true,
        food: false,
        fitness: false,
        film: false,
        drinks: true
      },
      city: {
        search: { keyword: '', loading: false, results: [] },
        selected: null
      },
      dates: {
        start: '',
        end: ''
      },
      events: {
        headers: [
          { text: 'Date', value: 'date' },
          { text: 'Host', value: 'host.name' },
          { text: 'Title', value: 'title' },
          { text: 'Location', value: 'location' },
          { text: 'Tickets', value: 'buyTicketHost' }
        ],
        items: [],
        hasNextPage: false,
        paginationCursor: null,
        loading: false
      },
      endDateMenu: false,
      startDateMenu: false,
      startDate: '',
      endDate: '',
      loader: null,
      loading: false
    }
  },
  mounted() {
    const defaultCity = { text: 'Sydney, Australia', value: 110884905606108 }
    this.city.search.results = [defaultCity]
    this.city.selected = defaultCity

    this.dates.start = this.$nuxt
      .$moment()
      .add(5, 'days')
      .format('YYYY-MM-DD')
    this.dates.end = this.$nuxt
      .$moment()
      .add(6, 'days')
      .format('YYYY-MM-DD')

    console.log(JSON.parse(JSON.stringify(this.$data)))
    console.log(`triggered created ${this.$nuxt.$moment()}`)
    this.debouncedSearchCity = this.$nuxt.$_.debounce(this.searchCity, 500)
    window.addEventListener(
      'scroll',
      this.$nuxt.$_.debounce(this.onScroll, 500)
    )
  }
}
</script>
