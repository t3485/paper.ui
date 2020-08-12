<template>
  <div>
    <chart :data="data" :time="time"></chart>
  </div>
</template>

<script>
import chart from '@/components/chart/basic.vue'
export default {
  data(){
    return {
      query:{
        begin: '2014-1-1',
        end: '2020-6-13',
        type: 1
      },
      time:[],
      data:[]
    }
  },
  components: {
      chart
    },
  methods:{
    getdata(){
      this.$axios.get('industryWheel/industryWheel', {
        params: this.query
      }).then(r => {
        // eslint-disable-next-line no-debugger
        debugger
        let data = r.data
        if (data.length > 0) {
          this.time = data[0].weight.map(x=>x.time)
          this.data = data.map(x=> { 
            return { name:x.code, data: x.weight.map(w=>w.value)}
            })
        }
      })
    }
  },
  created(){
    this.getdata()
  }
}
</script>

<style>

</style>