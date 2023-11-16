<template>
  <div>
    <TypeNave />
    <listContainer />
    <Recommende />
    <Rank />
    <Like />
    <floor v-for="(f, index) in floorList" :key="f.id" :list="f" />

    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Brand from "@/pages/Home/Brand";
import floor from "@/pages/Home/Floor";
import Like from "@/pages/Home/Like";
import listContainer from "@/pages/Home/ListContainer";
import Rank from "@/pages/Home/Rank";
import Recommende from "@/pages/Home/Recommend";
export default {
  components: { Brand, floor, Like, listContainer, Rank, Recommende },
  mounted() {
    console.log("home挂载了第一次");
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      floorList: (state) => {
        return state.home.floorList;
      },
    }),
  },
};
</script>

<style></style>
