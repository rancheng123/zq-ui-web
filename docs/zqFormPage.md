## ZqFormPage 按钮

### 基础用法

基础用法。
:::demo 

```html
  <template>
    <ZqFormPage
        :ctaTitleAndDesc="'<div>PetroPolis测试</div>'"
        :imageServerDomain='"http:www.baidu.com"'
        :params="{
          ctaBackground: '',
          form_id: '862',
          gId: '-1',
          gType: 'contenthp',
          isStatistics: '1',
          module: 'cms',
          org_id: 'org7acb9d894109987c28a2314b46eeca29',
          pId: '653',
          pType: 'fcta',
          unique_id: '7d4bf0208c7274724325010ffb084406',
          ppid: undefined,
          downloadUrl: undefined,
          zType: undefined,
          zId: undefined,
        }"
        @message="(data)=>{
          if(data.type === 'cdp'){

          }else if(data.type === 'cdpDownload'){

          }
        }"
    ></ZqFormPage>
</template>

<script>
export default {
  name: 'Home',
};
</script>
<style>
.mt10 {
  margin-top: 10px;
}
</style>

  
```


