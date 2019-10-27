<template>
  <div class="columns">
    <div class="column is-full">

      <h1 class="subtitle has-text-centered">Matches</h1>
      <swiper :options="swiperOptions" v-if="matches.length > 0">
        <swiperSlide v-for="match in matches" :key="match.id">
          <h1 class="has-text-centered">{{ match.name }}</h1>
          <img src="https://s2.glbimg.com/OJS3osgGeyOvQjjqlx72C8yny-k=/0x207:720x908/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/r/E/E4zhBRQsOXk31sd8brnQ/indice.jpg" @click="openMenu(match, 'matches')" />
        </swiperSlide>

        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>

      <p class="has-text-centered" v-else>Não há nenhum Match</p>
    </div>

    <b-modal :active="isMenuActive" :width="640" scroll="keep" @close="closeMenu()">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <a @click="unmatch()">Desfazer Match</a>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<style lang="scss">
  div.rounded-item {
    width: 40%;
    margin: 5%;
    display: inline-block;
    text-align: center;

    img {
      width: 80%;
      height: 5rem;
      border-radius: 50%;
    }
  }

  .slide {
    padding-left: 3rem;
    padding-right: 3rem;

    &:before {
      left: 0;
      top: 0;
      width: 100%;
    }
  }
</style>


<script>

  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import MatchService from '../services/match_service';

  export default {
    components: {
      swiper,
      swiperSlide
    },

    data() {
      return {
        chats: [],
        matches: [],
        isMenuActive: false,
        currentItem: {},
        swiperOptions: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },

    mounted() {
      this.loadMatches();
      this.loadChats();
    },

    methods: {
      openMenu(item, type) {
        this.isMenuActive = true;
        this.currentItem = item;
        this.currentItem.type = type;
      },

      closeMenu() {
        this.isMenuActive = false
      },

      loadMatches() {
        MatchService.loadMyMatches().then(matches => {
          this.matches = matches;
        })
      },

      unmatch() {
        MatchService.unmatch(this.currentItem).then(() => {
          let type = this.currentItem.type
          let indexToRemove = this[type].indexOf(this.currentItem);
          this[type].splice(indexToRemove, 1);
          this.closeMenu();
        });
      }
    }
  }
</script>
