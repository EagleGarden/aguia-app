import { neon } from '@neondatabase/serverless'
import 'dotenv/config'

//Cria a conexão SQL usando o DB URI
export const sql = neon(process.env.DATABSE_URI)