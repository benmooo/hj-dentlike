export interface Product {
  toothPosition?: number[] // Array of selected tooth IDs (e.g., 'U3R', 'L1L')
  itemType?: string // 项目类型: 嵌体
  material?: string // 材料: 玻璃陶瓷
  toothColor?: string // 牙色: 2L1.5
  stain?: string // 染色: 不要染色
  occlusalSpace?: string // 咬合空间: 调备牙 (如果咬合空间不够(习惯))
  crownType?: string // 冠的类型: 咬合关系: 正常
  restorationType?: string // 修复类型: 固定修复
}

export interface CreateOrder {
  // Basic Information (from Stepper Step 0)
  dentistName?: string
  clinicName?: string
  phone?: string
  email?: string
  date?: string // Expected format like 'YYYY-MM-DD' or 'MM月 DD日, YYYY'
  dueDate?: string // Expected format like 'YYYY-MM-DD' or 'MM月 DD日, YYYY'
  patientName?: string
  gender?: 'male' | 'female' | string // '男' | '女'
  patientAge?: number // Can be a string as currently used, or number
  orderId?: string
  impressionMethod?: 'oralScan' | 'plasterModel' // 取模方式: 口扫件
  orderProperty?: 'urgent' | 'rework' | ''; // 订单属性: 加急, 返工

  // Product(s) information (from subsequent steps)
  products?: Product[]

  // Attachment and Special Requirements (from later steps)
  attachments?: string[] // uploaded file ids
  specialRequirements?: string // 特别要求: 做工精美
}
