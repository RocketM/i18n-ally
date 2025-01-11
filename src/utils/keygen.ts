const START_DIR = 'src'

/**
 * 自动生成合适的key值
 * @param {string} filePath - 完整的文件路径
 * @returns {string} 转换后的key
 */
export function genAutoKey(filePath: string): string {
    const normalizedPath = filePath.replace(/\\/g, '/')
  
    // 找到最后一个 startDir 的位置
    const startIndex = normalizedPath.lastIndexOf(`/${START_DIR}/`)
    if (startIndex === -1) return filePath
  
    // 提取 startDir 之后的路径
    const relevantPath = normalizedPath.slice(startIndex + START_DIR.length + 2)

    // 移除文件扩展名
    const withoutExtension = relevantPath.replace(/\.[^/.]+$/, '')
  
    const dirs = withoutExtension.split('/')

  // 如果在views目录下，按照模块处理
  if (dirs.length > 3 && dirs[0] === 'views') {
    const moduleDirs = dirs.slice(1, 3)
    return `module.${moduleDirs.join('.')}`
}

return `page.${dirs.join('.')}`
}
