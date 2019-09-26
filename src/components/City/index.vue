
<template>
<div class="city_body">
  <div class="city_list">
      <div class="city_hot">
          <h2>热门城市</h2>
          <ul class="clearfix">
              <li v-for="item in hotList" :key="item.id">{{item.nm}}</li>
          </ul>
      </div>
      <!-- 定义ref属性为获得h2的元素 -->
      <div class="city_sort" ref="city_sort">
          <!-- 遍历所有城市 -->
          <div v-for="item in cityList" :key="item.index">
              <!-- 城市首字母 -->
              <h2>{{item.index}}</h2>
              <ul>
                  <!-- 城市名 -->
                  <li v-for="itemList in item.list" :key="itemList.id">{{itemList.nm}}</li>
              </ul>
          </div>
      </div>
  </div>
  <div class="city_index">
      <ul>
          <!-- 右侧城市首字母排序 -->
          <!-- index代表下标                                     @touchstart触摸事件      -->
          <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{item.index}}</li>
      </ul>
  </div>
</div>
</template>

<script>
export default {
    name:'City',
    //数据响应
    data(){
        return{
            //定义空数组接收返回的数据
            cityList:[],
            hotList:[]
        }
    },
    mounted(){//生命周期函数
        this.axios.get('/api/cityList').then((res)=>{
            var msg=res.data.msg;
            if(msg==='ok'){
                //得到城市数组数据
                var cities=res.data.data.cities;                
                // this.formatCitylist(cities);
                //解析返回的数据
                var {cityList,hotList}=this.formatCitylist(cities);
                //把解析到的数据赋值给data数组
                this.cityList=cityList;
                this.hotList=hotList;
            }
        });
    },
    methods:{
        // 渲染城市模块
        formatCitylist (cities) {
            var cityList=[];   //城市分类
            var hotList=[];    //用来存放热门城市
            for(var i=0;i<cities.length;i++){//循环传过来的数组
                //得到热门城市的首字母大写
                var firstLetter = cities[i].py.substring(0,1).toUpperCase();
                //找到第一个字母之后进行一个个对比
                if(toCom(firstLetter)){//如果数组中的i下标位置还没有值的话(数组空的)
                    cityList.push({
                        //赋值到空数组里面去
                        index:firstLetter,
                        list:[
                            {
                                nm:cities[i].nm,
                                id:cities[i].id
                            }
                        ]
                    });
                }else{//如果i下表位置已经有值存在则累加到后面(城市中首字母相同时)
                    for(var j=0;j<cityList.length;j++){
                        if(cityList[j].index===firstLetter){
                            cityList[j].list.push({nm:cities[i].nm,id:cities[i].id});
                        }
                    }
                }
            }
            //把城市A到Z顺序排序(原生数组排序法)
            cityList.sort((n1,n2)=>{
                //若 a 大于 b，在排序后的数组中 a 应该出现在 b 之后，则返回一个大于 0 的值
                if(n1.index>n2.index){
                    return 1;
                }
                //若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值
                else if(n1.index<n2.index){
                    return -1;
                }
            });
            function toCom(firstLetter) {
                for(var i=0;i<cityList.length;i++){
                    if(cityList[i].index===firstLetter){//如果值相等(已存在)
                        return false;
                    }
                }
                return true;//表示还是空的
            }
            //取热门城市
            for(var i=0;i<cities.length;i++){
                if(cities[i].isHot===1){//1代表是热门城市
                    hotList.push(cities[i]);
                }
            }
            return{
                //把结果返回出去
                cityList,
                hotList
            }
        },
        //智能响应功能
        handleToIndex(index){
            // 取得h2元素
            var h2=this.$refs.city_sort.getElementsByTagName('h2');
            // 找到点击的定位的元素的坐标给其父元素,做定位
            this.$refs.city_sort.parentNode.scrollTop=h2[index].offsetTop;
        }
    }
}
</script>
<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>
