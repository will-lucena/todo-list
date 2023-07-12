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
  <main class="main">
    <h1 class="title">Todo App</h1>
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
  </main>
</template>

<style lang="scss" scoped>
$white: #fff;
$google-blue: #4285f4;
$button-active-blue: #1669f2;

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;

  width: 100%;
  height: 100vh;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--inverse-quaternary);
}

.login {
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

.google-btn {
  padding-right: 20px;
  background-color: $google-blue;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  cursor: pointer;
  .google-icon-wrapper {
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
</style>
