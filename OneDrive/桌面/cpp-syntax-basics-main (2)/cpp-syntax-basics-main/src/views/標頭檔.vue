<template>
  <div>
    <h1>標頭檔</h1>
        <h3>用法</h3>
        <a-typography-paragraph class="content">#include<標頭檔></a-typography-paragraph>
        <a-typography-paragraph># 開頭屬於預處理命令，行末不用分號，單獨成行，常放在程式開頭</a-typography-paragraph>
        <hr/>
        <h3>標頭檔種類 :</h3>
        <div class="content">
            <a-typography-paragraph>
                演算法 : algorithm、stdlib、numeric<br/>
                不可部分完成的作業 : atomic<br/>
                C 連結庫包裝函式 : cassert、ccomplex 、cctype、cerrno、cfenv、cfloat、cinttypes、ciso646、climits、clocale、cstdalign、csignal、csetjmp、cmath、cstdarg、cstdbool、cstdint、cstdio、cstddef、cstring、cstdlib、ctgmath、cuchar、ctime、cwchar、cwctype<br/>
                概念 : concepts<br/>
                時序容器 : array、deque、forward_list、list、vector<br/>
                已排序的關聯容器 : map、set<br/>
                未排序的關聯容器 : unordered_map、unordered_set<br/>
                容器配接器 : queue、stack<br/>
                容器檢視 : span<br/>
                錯誤和例外狀況處理 : cassert、exception、stdexcept、system_error<br/>
                一般公用程式 : any、bit、cstdlib、bitset、execution、functional、memory、memory_resource、optional、ratio、scoped_allocator、tuple、typeindex、type_traits、utility、variant<br/>
                I/O 和格式設定 : cinttypes、cstdio、filesystem、fstream、iosfwd、iomanip、ios、iostream、istream、sstream、ostream、streambuf、strstream<br/>
                迭代器 : iterator<br/>
                語言支援 : cfloat、climits、codecvt、compare、contract、coroutine、cstddef、cstdint、csignal、cstdarg、csetjmp、typeinfo、version、cstdlib、initializer_list、exception、limits、new<br/>
                當地語系化 : clocale、codecvt、cvt/wbuffer、cvt/wstring、locale<br/>
                數學和數值 : bit、cstdlib、cmath、cfenv、limits、complex、numeric、random、ratio、valarray<br/>
                記憶體管理 : allocators、memory_resource、memory、new、scoped_allocator<br/>
                多執行緒 : atomic、condition_variable、future、mutex、shared_mutex、thread<br/>
                範圍 : ranges<br/>
                規則運算式 : regex<br/>
                字串和字元數據 : charconv、cctype、cstdlib、cstring、cuchar、cwchar、cwctype、regex、string_view、string<br/>
                Time : chrono、ctime<br/>
            </a-typography-paragraph>
        </div>
        <hr/>
        <h3>萬用標頭檔 :</h3>
        <a-typography-paragraph class="content">
            你說上面的太多記不起來，沒關係我們有萬用標頭檔<br/>
            <font color="color: #E60000">bits/stdc++.h</font>
            (需使用gcc編譯器)<br/>
        </a-typography-paragraph>
        <hr/>
  </div>
</template>
<script>

</script>

<style>
.content{
  color: black;
}
</style>
