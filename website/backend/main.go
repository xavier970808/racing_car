package main

import (
	"encoding/json"
	"log"
	"net/http"
)

// 定义文章结构体
type Article struct {
	Index    int    `json:"index"`
	Title    string `json:"title"`
	Author   string `json:"author"`
	Likes    int    `json:"likes"`
	Comments int    `json:"comments"`
	ImageSrc string `json:"imageSrc"`
}

// 定义文章列表
var articles = []Article{
	{Index: 1, Title: "文章1", Author: "作者1", Likes: 83, Comments: 0, ImageSrc: "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp"},
	{Index: 2, Title: "文章2", Author: "作者2", Likes: 45, Comments: 5, ImageSrc: "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp"},
	{Index: 3, Title: "文章3", Author: "作者3", Likes: 67, Comments: 3, ImageSrc: "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp"},
	// 可以继续添加更多文章
}

// 处理 POST 请求的函数
func getArticles(w http.ResponseWriter, r *http.Request) {
	// 设置 CORS 头
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// 如果是预检请求（OPTIONS），直接返回 204 No Content
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusNoContent)
		return
	}

	// 解析请求体
	var request map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// 可以在这里处理请求体数据，例如验证 token
	// token := request["token"].(string)

	// 将文章列表编码为 JSON 并写入响应
	err = json.NewEncoder(w).Encode(articles)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func main() {
	// 设置路由处理函数
	http.HandleFunc("/api/getArticles", getArticles)

	// 启动 HTTP 服务器
	log.Println("Starting server at port 8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
