package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

func showIndex(w http.ResponseWriter, r *http.Request) {
	dat, err := os.ReadFile("index.html")
	fmt.Fprintf(w, string(dat))

	if err != nil {
		return
	}
}

func uploadFile(w http.ResponseWriter, r *http.Request) {

	r.ParseMultipartForm(10 << 20)

	file, handler, err := r.FormFile("sample")
	if err != nil {
		fmt.Println(err)
		return
	}

	defer file.Close()

	tempFile, err := ioutil.TempFile("uploads", string(handler.Filename))
	if err != nil {
		fmt.Println(err)
	}
	defer tempFile.Close()

	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println(err)
	}
	ioutil.WriteFile("uploads/"+handler.Filename, fileBytes, 0644)

	ex, err := os.Executable()
	if err != nil {
		panic(err)
	}
	exPath := filepath.Dir(ex)
	fmt.Println(exPath + "//uploads//" + handler.Filename)

	out, err := exec.Command("olevba", "-j", "--reveal", exPath+"//uploads//"+handler.Filename).Output()
	if err != nil {
		fmt.Fprintf(w, "Failed to Upload File: \n")
	} else {
		fmt.Fprintf(w, string(out))
	}

}

func loadFile(fileName string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			dat, err := os.ReadFile(strings.Replace(r.URL.Path, "/", "", 1))
			fmt.Fprintf(w, strings.ReplaceAll(string(dat), "%", "%%"))
			if err != nil {
				fmt.Println(err)
				fmt.Fprintf(w, "Error 404")
			}
		} else {
			dat, err := os.ReadFile("index.html")
			fmt.Fprintf(w, strings.ReplaceAll(string(dat), "%", "%%"))
			if err != nil {
				fmt.Println(err)
				fmt.Fprintf(w, "Error loading index")
			}
		}

	}
}

func setupRoutes() {
	http.HandleFunc("/", loadFile("saf"))
	http.HandleFunc("/upload", uploadFile)
	http.ListenAndServe(":8080", nil)
}

func main() {
	fmt.Println("OLEVBA Web Interface initialised on port 8080")
	setupRoutes()
}
