<template></template>

<script lang="ts">
import { createAuthClient } from 'better-auth/vue';

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_SERVER_URL
});

export default {
  name: 'Login',
  props: {
    redirectAfterLogin: {
      type: String,
      default: ''
    }
  },
  created() {
    authClient.signIn.social({
      provider: 'google',
      callbackURL: this.redirectAfterLogin
    });
  }
};
</script>
