<template>
    <h1>變數命名原則</h1>
        <h2>變數宣告</h2>
        <a-typography-paragraph>
            使用變數之前,必須先宣告變數的資料型態以及給予變數一個變數名稱<br/>
        </a-typography-paragraph>
        <img src="../assets/宣告.png" width="600"><br/><br/><br/>
        <a-typography-paragraph>
            若有許多變數皆屬於同一種資料型態,也可以將相同資料態的變數放在一起同時宣告變數,宣告變數時只需要在變數與變數之間加一個逗號(,)區隔即可
        </a-typography-paragraph>
        <img src="../assets/宣告(1).png" width="600"><br/><br/><br/>
        <a-typography-paragraph>
            當我們宣告變數時,也可以同時設定變數之初始值<br/>變數尚未被設定(賦值)之前就對變數進行操作可能會出問題<br/>
       </a-typography-paragraph>
       <img src="../assets/宣告(2).png" width="600"><br/><br/><br/>
       <a-typography-paragraph>
            <h2>命名規則 : </h2><br/>
            1.第一個字不可為數字<br/>
            Ex: int 2024EECS<br/>
            2.變數中間不可有空格 Ex: int EE CS<br/>
            3.不可有特殊字元 Ex: int +, -, *<br/>
            4.不可為關鍵字<br/>
            Ex: int int, float, char<br/>
            5.大小寫不同，視為不同變數<br/>
            Ex: int EE, Ee, eE, ee<br/>
            6.變數取名盡量要有意義<br/>
            Ex: int length, width<br/>
       </a-typography-paragraph><br/>
       <a-typography-paragraph><b>保留字 : </b></a-typography-paragraph><br/>
       <img src="../assets/保留字.png" width="600"><br/><br/><br/>
</template>