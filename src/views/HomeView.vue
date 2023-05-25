<template>
  <div class="home">
    <Scene :eventList="eventList"></Scene>
    <BigScreen></BigScreen>
  </div>
</template>

<script setup>
// @ is an alias to /src
import Scene from "@/components/Scene.vue";
import BigScreen from "@/components/BigScreen.vue";
import { onMounted, reactive, watch, computed, ref } from "vue";
import { getSmartCityInfo, getSmartCityList } from "@/api/api";
import gsap from "gsap";
// console.log(testVertex)

// 1/获取数据
const dataInfo = reactive({});
// 2/第二个数据用于gsap每隔一定的时间得到修改的值
const dataInfoNum = reactive({
  iot: 0,
  event: 0,
  power: 0,
  test: 0,
});

// 3/将值转换成整数
let iotNum = computed(() => {
  return dataInfoNum.iot.toFixed(0);
});

let eventNum = computed(() => {
  // console.log( dataInfoNum.event)
  return dataInfoNum.event.toFixed(0);
});

let powerNum = computed(() => {
  return dataInfoNum.power.toFixed(2);
});

let testNum = computed(() => {
  return dataInfoNum.test.toFixed(0);
});

onMounted(async () => {});

watch(dataInfo, (newValue, oldValue) => {
  // console.log(newValue,oldValue)
  // console.log("dataInfo数据发生改变")
  gsap.to(dataInfoNum, {
    iot: newValue.iot.number,
    event: newValue.event.number,
    test: newValue.test.number,
    power: newValue.power.number,
    duration: 1,
    repeat: 1,
  });
});

async function changeInfo() {
  let result = await getSmartCityInfo();
  dataInfo.event = result.data.data.event;
  dataInfo.iot = result.data.data.iot;
  dataInfo.power = result.data.data.power;
  dataInfo.test = result.data.data.test;
  // console.log(result.data.data)
}

// 设置事件列表
const eventList = ref([]);

async function getEventList() {
  let result = await getSmartCityList();
  eventList.value = result.data.list;
  console.log(result);
}

watch(eventList, () => {
  console.log("触发事件列表更新");
});
onMounted(() => {});
</script>
