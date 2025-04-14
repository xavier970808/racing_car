<template>
  <div>
    <h1>輸入輸出</h1>
        <h2>引入iostream</h2>
        <a-typography-paragraph>
            為甚麼要#include＜iostream＞<br/>
            因為我們想要使用輸出輸入功能<br/>
            iostream標頭檔定義了輸入輸出流對象:cin, cout, cerr, clog分別為標準輸入、輸出、錯誤(無緩衝)、簿記(有緩衝)的流對象。都屬於std 名字空間。
        </a-typography-paragraph>
        <hr/>
        <h2>using namespace std</h2>
        <a-typography-paragraph>
            using是使用，意思是我們要使用std這個命名空間<br/>
            <h5>為甚麼要使用這個命名空間?</h5>
            std是standard的意思，這個命名空間是標準命名空間，我們想使用的名詞幾乎都定義在這個命名空間中。<br/>
        </a-typography-paragraph>
        <hr/>
        <h2>甚麼是cout?</h2>
        <a-typography-paragraph>
            我們藉由箭頭把想輸出資料丟給cout，再讓cout把資料印在螢幕上<br/>
            換行可以用＜＜endl; 或者用\n;<br/>
            空四格用\t<br/>
            警報用\a<br/>
        </a-typography-paragraph>
        <img src="../assets/cout.png" height="200">
        <hr/>
        <h2>甚麼是cin?</h2>
        <a-typography-paragraph>
            我們將cin也就是我們打在螢幕上的資料，藉由箭頭儲存到目標變數中<br/>
        </a-typography-paragraph>
        <img src="../assets/cin.png" height="200">
  </div>
</template>
<script>

</script>

<style>
.content{
  color: black;
}
</style>
