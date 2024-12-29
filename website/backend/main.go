package main

import (
	"log"
	"net/http"
)

// 处理 CORS 的中间件
func handleCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// 设置允许的来源
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// 设置允许的请求方法
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		// 设置允许的请求头
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// 如果是预检请求，直接返回 200
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// 否则，调用下一个处理函数
		next.ServeHTTP(w, r)
	}
}

func main() {
	// 设置路由处理函数
	http.HandleFunc("/api/getArticles", handleCORS(getArticles))
	http.HandleFunc("/api/getArticleContent", handleCORS(getArticleContent))

	// 启动 HTTP 服务器
	log.Println("Starting server at port 8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
