<template>
  <div class="container">
    <div class="header">
      <h1>表格文字提取器</h1>
      <p>支持上传多个Excel表格文件，自动提取并显示文字内容</p>
    </div>

    <div class="upload-area">
      <el-upload
        action=""
        :auto-upload="false"
        :show-file-list="true"
        accept=".xlsx,.xls"
        :multiple="true"
        @change="handleFileUpload">
        <template #trigger>
          <el-button type="primary" :loading="loading">选择Excel文件</el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip">支持上传多个Excel格式的表格文件</div>
        </template>
      </el-upload>
    </div>

    <div v-if="tableData.length > 0" class="preview-area">
      <div v-for="(table, index) in tableData" :key="index" class="table-container">
        <h3>文件 {{ index + 1 }} 内容</h3>
        <el-table :data="table" style="width: 100%" border stripe>
          <el-table-column
            v-for="(col, colIndex) in Object.keys(table[0] || {})"
            :key="colIndex"
            :prop="col"
            :label="col"
            :min-width="120">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'

export default {
  name: 'App',
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  methods: {
    async handleFileUpload(event) {
      const files = event.target.files
      this.loading = true
      
      try {
        for (const file of files) {
          const data = await this.readExcelFile(file)
          this.tableData.push(data)
        }
        this.$message.success('文件上传成功！')
      } catch (error) {
        this.$message.error('文件处理失败：' + error.message)
      } finally {
        this.loading = false
      }
    },
    
    readExcelFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target.result)
            const workbook = XLSX.read(data, { type: 'array' })
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
            const jsonData = XLSX.utils.sheet_to_json(firstSheet)
            resolve(jsonData)
          } catch (error) {
            reject(error)
          }
        }
        reader.onerror = reject
        reader.readAsArrayBuffer(file)
      })
    }
  }
}
</script>