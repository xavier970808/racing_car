<template>
    <h1>運算子</h1>
        <a-typography-paragraph>
        運算式是由運算元(Operand)與
        運算子(Operator)所構成的。運
        算元是提供運算式運算的資料項,
        運算元可以是變數或常數。運算
        子是運算的符號。
        </a-typography-paragraph><br/>
        <a-typography-paragraph>
        運算子的種類大概可以區分為以下幾種類別:
        算術運算子/比較關係運算子/邏輯運算子
        </a-typography-paragraph><br/>
        <h2>比較運算子</h2>
        <a-typography-paragraph>用以比較兩個數值的大小關係</a-typography-paragraph><br/>
        <img src="../assets/比較運算子.png" height="300">
        <hr/>
        <h2>邏輯運算子</h2>
        <img src="../assets/邏輯運算子.png" height="300">
        <hr/>
        <h2>算術運算子</h2>
        <a-typography-paragraph>
            C語言程式由上往下一行一行運行
        </a-typography-paragraph><br/>
        <a-typography-paragraph>"="不是數學的恆等式，應
            該翻譯為"設定為(賦值)
        </a-typography-paragraph><br/>
        <img src="../assets/算術運算子.png" height="150"><br/>
        <br/><br/>
        <b>預設結果類型</b>
        <a-typography-paragraph>
            進行除法操作時，結果的類型取決於操作數的類型和結果變數的類型
        </a-typography-paragraph><br/>
        <a-typography-paragraph>
            同類型資料除法結果也是同類型
        </a-typography-paragraph><br/>
        <a-typography-paragraph>
            int / int 結果為 int<br/>
            float / int 結果為 float<br/>
            double / int 結果為 double<br/>
        </a-typography-paragraph>
        <br/><br/>
        <b>強制類型轉換</b><br/>
        <a-typography-paragraph>語法 :<br/>(目標數據類型)要轉換的變數或表達式<br/></a-typography-paragraph>
        <br/>
        <b>算術運算子的優先順序</b><br/>
        <img src="../assets/算術運算子的優先順序.png" height="300">
</template>