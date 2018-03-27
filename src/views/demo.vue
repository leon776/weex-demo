<!-- eslint-disable -->
<template>
  <list class="list" @loadmore="fetch" loadmoreoffset="200">
    <cell class="cell" v-for="num in lists" :key="num">
      <div class="panel">
        <text class="text">{{num}}</text>
      </div>
    </cell>
  </list>
</template>

<script>
/* eslint-disable */
  const modal = weex.requireModule('modal')
  const LOADMORE_COUNT = 4

  export default {
    data () {
      return {
        lists: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      fetch (event) {
        console.log(1111);
        modal.toast({ message: 'loadmore', duration: 1 })

        setTimeout(() => {
          const length = this.lists.length
          for (let i = length; i < length + LOADMORE_COUNT; ++i) {
            this.lists.push(i + 1)
          }
        }, 500)
      }
    }
  }
</script>

<style scoped>
/* eslint-disable */
.list{height: 500px;}
  .panel {
    width: 600px;
    height: 250px;
  }
</style>