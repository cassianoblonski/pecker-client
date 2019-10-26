<template>
  <div>
    <div>
      <div class="is-centered">
        <img src="https://s2.glbimg.com/OJS3osgGeyOvQjjqlx72C8yny-k=/0x207:720x908/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2018/r/E/E4zhBRQsOXk31sd8brnQ/indice.jpg" />
      </div>

      <div class="columns is-mobile is-gapless is-centered action-buttons" v-if="isLoggedUser">
        <div class="column is-12">
          <router-link to="/profile/edit" class="button is-pulled-left is-info" >
            <i class="fas fa-edit"></i>
          </router-link>
        </div>
      </div>

      <div class="columns is-mobile is-gapless is-centered action-buttons" v-else>
        <div class="column is-12">
          <button class="button is-pulled-right" @click="backToPreviousPage()">
            <i class="fas fa-reply"></i>
          </button>
        </div>
      </div>

      <div class="columns is-mobile is-gapless is-multiline user-info">
        <div class="column is-8">
          <h5 class="is-size-3"><strong>{{ currentUser.name }}</strong></h5>
          <div class="column is-12">
            <h5 class="is-size-6 has-text-grey " v-if="currentUser.description">
              "{{ currentUser.description }}"
            </h5>
          </div>
          <h5 class="is-size-5 has-text-grey">
            <strong><i class="fas fa-building"></i></strong>
            {{ currentUser.company }}
          </h5>
          <h5 class="is-size-5 has-text-grey">
            <strong><i class="fas fa-university"></i></strong>
            {{ currentUser.college }}
          </h5>
        </div>
      </div>
    </div>
    <div class="column is-12 has-text-centered" v-if="isLoggedUser">
      <button class="button has-background-danger" @click="logout()">
        <span class="is-size-6 has-text-white">
          Encerrar Sessão
        </span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  div.columns {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  div.action-buttons {
    margin-top: -2rem;
    position: absolute;
    z-index: 999999;
    width: 100%;

    button, a {
      border-radius: 9999px;
      height: 3.5rem;
      width: 3.5rem;
    }
  }

  div.user-info {
    margin-top: 2rem;
  }

  div.distance {
    h4 {
      margin-top: 0.5rem;
    }
  }

  h5.description {
    margin-top: 2em;
  }
</style>


<script>
  import "swiper/dist/css/swiper.css";
  import { mapState, mapActions } from 'vuex';
  import router from '../router';
  import store from "../store";
  import UserService from '../services/user_service';

  export default {
    components: {
    },

    props: ['user'],

    data() {
      return {
        currentUser: {},
        isLoggedUser: false
      }
    },

    computed: {
      loggedIn() {
        return store.getters["isLoggedIn"];
      },
      ...mapState({
        account: state => state.Account.account
      })
    },

    created(){
      this.checkLogin(this.loggedIn);
    },

    mounted() {
      if(!this.user) {
        this.loadLoggedUser();
      } else {
        this.currentUser = this.user;
      }
    },
    watch:{
      loggedIn(newValue) {
        this.checkLogin(newValue);
      },
      $route (){
        if(!this.user) {
          this.loadLoggedUser();
        } else {
          this.currentUser = this.user;
        }
      }
    },
    methods: {
      checkLogin(loggedIn) {
        if (!loggedIn) {
          router.push("/login");
        }
      },
      loadLoggedUser() {
        UserService.load(this.account.id).then(user => {
          this.currentUser = user;
          this.isLoggedUser = true;
        });
      },

      backToPreviousPage() {
        router.go(-1);
      },
      ...mapActions(["logout"])
    }
  }
</script>
