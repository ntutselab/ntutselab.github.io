# LabWebsite
SELab & SDTLab 實驗室網頁

## Structure
* Folder 資料夾
  * css - css 相關檔案  
  * data - 關於實驗室的資料，包含教授、成員、計畫等等 (Json 格式)  
  * file - pdf 文件  
  * fonts - 字形相關
  * js - JavaScript 檔案  
    * staticMain.js - 靜態網頁的 js 檔案
    * main.js - 動態網頁的 js 檔案
* File 檔案
  * index.html - 英文版頁面 (靜態網頁版本)
  * index_zh.html - 中文版頁面 (靜態網頁版本)

* 照片目前是放在 學術資源 上(如果連結失效請至 劉老師的學術資源網 更新)
* 照片的 small 縮小方式是使用 `ffmpeg -i imageName.png -vf scale=20:-1 imageName-small.png`
