<template>
  <div>
    <div>
      <div class="info-button">
        <button class="button is-pulled-left" @click="goToUserInfo()">
          <i class="fas fa-info fa-xs"></i>
        </button>
      </div>

      <div class="has-text-centered">
        <img src="https://s2.glbimg.com/OJS3osgGeyOvQjjqlx72C8yny-k=/0x207:720x908/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/r/E/E4zhBRQsOXk31sd8brnQ/indice.jpg" />
      </div>

      <div class="columns is-mobile is-gapless">
        <div class="column is-8">
          <h5 class="is-size-4"><strong>{{ user.name }}</strong></h5>
          <h5 class="has-text-grey">
            <strong><i class="fas fa-city"></i></strong>
            {{ user.city }}
          </h5>
        </div>
      </div>
      <footer class="footer">
        <div class="columns is-mobile has-text-centered like-buttons">
          <div class="column is-6">
            <button class="button has-background-grey-light is-large" @click="like(false)">
              <i class="fas fa-times has-text-white"></i>
            </button>
          </div>

          <div class="column is-6">
            <button class="button has-background-danger is-large" @click="like(true)">
              <i class="fas fa-heart has-text-white"></i>
            </button>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  div.columns {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  div.distance {
    h4 {
      margin-top: 0.5rem;
    }
  }

  footer.footer {
    background: transparent;
    margin-top: 5rem;

    @media screen and (min-width: 490px) and (max-width: 550px){
      margin-top: 2.5rem;
    }


    @media screen and (min-width: 550px) and (max-width: 620px){
      margin-top: -2rem;
    }


    @media screen and (min-width: 621px){
      margin-top: -4rem;
    }
  }

  div.like-buttons {
    button {
      border-radius: 9999px;
      padding: 0;
      height: 3.5rem;
      width: 3.5rem;
    }
  }

  div.info-button {
    position: absolute;
    z-index: 999999;
    top: 0.5rem;
    right: 0.5rem;

    button {
      border-radius: 9999px;
      height: 1.6rem;
      width: 1.7rem;
      opacity: 0.8;
    }
  }
</style>


<script>
  import { mapState, mapActions } from 'vuex';
  import router from '../router';

  export default {
    computed: {
      ...mapState('Match', {
        user: state => state.currentSelection
      })
    },

    methods: {
      goToUserInfo() {
        router.push({ name: "user", params: { user: this.user } })
      },
      ...mapActions('Match', ['like'])
    }
  }
</script>
