import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xdxfbabltqwsuascdwxd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGZiYWJsdHF3c3Vhc2Nkd3hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMjAyNjIsImV4cCI6MjA1ODY5NjI2Mn0.tVjhR8AprvkG-JDwepmtdf2lWJyWhspKu62S4FpZ4GE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
