package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

// 定义文章结构体
type Article struct {
	Index    int    `json:"index"`
	Title    string `json:"title"`
	Id       string `json:"id"`
	Author   string `json:"author"`
	Likes    int    `json:"likes"`
	ImageSrc string `json:"imageSrc"`
}

// 从文件中读取文章列表
func readArticlesFromFile(filename string) ([]Article, error) {
	data, err := os.ReadFile(filename) // 使用 os.ReadFile 替代 ioutil.ReadFile
	if err != nil {
		return nil, err
	}

	var articles []Article
	err = json.Unmarshal(data, &articles)
	if err != nil {
		return nil, err
	}

	return articles, nil
}

// 处理获取文章列表的请求
func getArticles(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	articles, err := readArticlesFromFile("./articles/articles.json") // 假设文件名为 articles.json
	if err != nil {
		log.Printf("Error reading articles from file: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(articles)
}

func readMarkdownFile(filename string) (string, error) {
	data, err := os.ReadFile(filename) // 使用 os.ReadFile 替代 ioutil.ReadFile
	if err != nil {
		return "", err
	}

	return string(data), nil
}

// 处理获取文章列表的请求
func getArticleContent(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	articlesList, err := readArticlesFromFile("./articles/articles.json") // 假设文件名为 articles.json
	var articleId *string
	for _, article := range articlesList {
		// 假设文章的id为数字
		if article.Id ==  {
			articleId = &article.Id
			break
		}
	}
	if articleId == nil {
		http.Error(w, "Article not found", http.StatusNotFound)
		return
	}
	articleContent, err := readMarkdownFile("./articles/" + articleId + "/.md") // 假设文件名为 articles/

	if err != nil {
		log.Printf("Error reading articles from file: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(articleContent)
}
