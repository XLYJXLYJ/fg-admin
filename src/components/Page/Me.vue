<template>
  <div>
    <h1 class="ceshi">wo shi hao ren</h1>
    <foot></foot>
  </div>
</template>

<script>
import foot from '@/components/foot'
export default {
  name: 'Me',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    foot
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ceshi{
  width:640px;
  height: 200px;
  border: 1px solid red;
  font-size: 16px;
}
</style>
