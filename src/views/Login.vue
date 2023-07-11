<script setup lang="ts">
import { createAccount, login } from '@/api'
import { routeNames } from '@/router/routes'
import { useRouter } from 'vue-router'
const router = useRouter()

function onClickLogin() {
  login().then(() => {
    router.push(routeNames.HOME.path)
  })
}

function onClickSignin() {
  createAccount().then(() => {
    router.push(routeNames.HOME.path)
  })
}
</script>

<template>
  <div class="login">
    <div class="google-btn" @click="onClickLogin">
      <div class="google-icon-wrapper">
        <img
          class="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <p class="btn-text"><b>Login with google</b></p>
    </div>

    <div class="google-btn google-btn--signin" @click="onClickSignin">
      <div class="google-icon-wrapper">
        <img
          class="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <p class="btn-text"><b>Sign in with google</b></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669f2;

.login {
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  margin: auto;
  width: 100%;
  height: 100vh;
}

.google-btn {
  width: 184px;
  height: 42px;
  background-color: $google-blue;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  .google-icon-wrapper {
    position: absolute;
    margin-top: 1px;
    margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: $white;
  }
  .google-icon {
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
    width: 18px;
    height: 18px;
  }
  .btn-text {
    float: right;
    margin: 11px 11px 0 0;
    color: $white;
    font-size: 14px;
    letter-spacing: 0.2px;
    font-family: 'Roboto';
  }

  &--signin {
    background-color: $button-active-blue;
  }
  &:hover {
    box-shadow: 0 0 6px $google-blue;
  }
  &:active {
    background: $button-active-blue;
  }
}

@media (min-width: 500px) {
  .login {
    flex-direction: row;
  }
}

@import url(https://fonts.googleapis.com/css?family=Roboto:500);
</style>
